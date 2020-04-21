import React, { Component } from 'react';
import TagsInput from 'react-tagsinput';
import { Button, InputGroup } from 'react-bootstrap';
import Autosuggest from 'react-autosuggest';
import { arrayUnique, escapeRegexCharacters } from '../services/util';

const TagsComponent = ({ onChange, value, renderTag, renderInput }) => {
    return (
        <InputGroup className="margin-top-3x">
            <div className="landing-page__tags-wrapper">
                <TagsInput
                    value={value}
                    onChange={newTags => onChange(newTags)}
                    className="landing-page__tags-input form-control"
                    inputProps={{
                        placeholder: 'Filter restaurants by address, name or diet'
                    }}
                    renderTag={renderTag}
                    renderInput={renderInput}
                />
            </div>
            <InputGroup.Button className="landing-page__tags-btn">
                <Button bsStyle="primary"><i className="fa fa-search" /></Button>
            </InputGroup.Button>
        </InputGroup>
    );
};


class RestaurantTagsInput extends Component {
    render() {
        const { values, handleSearch, restaurants } = this.props;
        
        const postcodes = restaurants.valueSeq().map(r => '' + r.getIn(['address', 'postcode'])).toJS();
        const suburbs = restaurants.valueSeq().map(r => r.getIn(['address', 'suburb'])).toJS();
        const streets = restaurants.valueSeq().map(r => r.getIn(['address', 'streets'])).toJS();
        const names = restaurants.valueSeq().map(r => r.get('name')).toJS();
        const tags = restaurants.valueSeq().map(r => r.get('tags')).flatten(true).toJS();
        const cuisines = restaurants.valueSeq().map(r => r.get('cuisines')).flatten(true).toJS();

        const definedTags = [
            { title: 'Postcodes', collection: arrayUnique(postcodes) },
            { title: 'Suburbs', collection: arrayUnique(suburbs) },
            { title: 'Streets', collection: arrayUnique(streets) },
            { title: 'Cuisines', collection: arrayUnique(cuisines) },
            { title: 'Tags', collection: arrayUnique(tags) },
            { title: 'Restaurants', collection: arrayUnique(names) }
        ];

        function renderTag(props) {
            let { tag, key, disabled, onRemove, classNameRemove, getTagDisplayValue, ...other } = props;
            return (
                <span key={key} {...other}>
                    {getTagDisplayValue(<span className="text-capitalize">{tag.toLowerCase()}</span>)}
                    {!disabled &&
                        <a className={classNameRemove} onClick={(e) => onRemove(key)} />
                    }
                </span>
            );
        }

        function autocompleteRenderInput({ addTag, ...props }) {
            const handleOnChange = (e, { newValue, method }) => {
                if (method === 'enter') {
                    e.preventDefault();
                } else {
                    props.onChange(e);
                }
            };

            const inputValue = (props.value && props.value.trim().toLowerCase()) || '';

            const renderSectionTitle = (section) => <strong>{section.title}</strong>;

            const getSectionSuggestions = (section) => section.collection;

            function getSuggestions(value) {
                const escapedValue = escapeRegexCharacters(value);

                if (escapedValue === '') {
                    return [];
                }

                const regex = new RegExp(escapedValue, 'i');

                return definedTags
                    .map(section => ({
                        title: section.title,
                        collection: section.collection.filter(tag => regex.test(tag)).slice(0, 5)
                    }))
                    .filter(section => section.collection.length > 0);
            }

            const suggestions = getSuggestions(inputValue);

            return (
                <Autosuggest
                    ref={props.ref}
                    multiSection
                    suggestions={suggestions}
                    shouldRenderSuggestions={(value) => value.trim().length >= 2}
                    getSuggestionValue={(suggestion) => suggestion}
                    renderSuggestion={(suggestion) => <span className="text-capitalize">{suggestion.toLowerCase()}</span>}
                    inputProps={{ ...props, onChange: handleOnChange }}
                    onSuggestionSelected={(e, { suggestion }) => {
                        addTag(suggestion);
                    }}
                    onSuggestionsClearRequested={() => { }}
                    onSuggestionsFetchRequested={() => { }}
                    focusInputOnSuggestionClick={false}
                    renderSectionTitle={renderSectionTitle}
                    getSectionSuggestions={getSectionSuggestions}
                />
            );
        }

        return (<TagsComponent
            onChange={handleSearch}
            renderTag={renderTag}
            value={values.toArray()}
            renderInput={autocompleteRenderInput} />
        );
    }
}

export default RestaurantTagsInput;