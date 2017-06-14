import React, { Component } from 'react';
import TagsInput from 'react-tagsinput';
import { Button, InputGroup } from 'react-bootstrap';
import Autosuggest from 'react-autosuggest';
import { TAGS, CUISINES } from '../../../shared/constants';

const TagsComponent = ({ onChange, value, renderTag, renderInput }) => {
    return (
        <InputGroup className="margin-top-3x">
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

            <InputGroup.Button className="landing-page__tags-btn">
                <Button bsStyle="primary"><i className="fa fa-search" /></Button>
            </InputGroup.Button>
        </InputGroup>
    );
};


class RestaurantTagsInput extends Component {
    render() {
        let { tags, handleSearch, definedTags } = this.props;


        definedTags = definedTags || TAGS.concat(CUISINES);
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
            const inputLength = inputValue.length;

            const suggestions = definedTags.filter((tag) => {
                return tag.toLowerCase().slice(0, inputLength) === inputValue
                    && tags.indexOf(tag) === -1;
            });

            return (
                <Autosuggest
                    ref={props.ref}
                    suggestions={suggestions}
                    shouldRenderSuggestions={() => true}
                    getSuggestionValue={(suggestion) => suggestion}
                    renderSuggestion={(suggestion) => <span className="text-capitalize">{suggestion.toLowerCase()}</span>}
                    inputProps={{ ...props, onChange: handleOnChange }}
                    onSuggestionSelected={(e, { suggestion }) => {
                        addTag(suggestion);
                    }}
                    onSuggestionsClearRequested={() => { }}
                    onSuggestionsFetchRequested={() => { }}
                    focusInputOnSuggestionClick={false}
                />
            );
        }

        return (<TagsComponent
            onChange={handleSearch}
            renderTag={renderTag}
            value={tags}
            renderInput={autocompleteRenderInput} />
        );
    }
}

export default RestaurantTagsInput;