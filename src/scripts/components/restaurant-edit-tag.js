import React from 'react';
import TagsInput from 'react-tagsinput';
import Autosuggest from 'react-autosuggest';
import { List } from 'immutable';

class RestaurantTagsInput extends React.Component {
    render() {
        const { tags, handleChange, definedTags } = this.props;

        function renderTag(props) {
            let { tag, key, disabled, onRemove, classNameRemove, getTagDisplayValue, ...other } = props
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

        return <TagsInput
            renderInput={autocompleteRenderInput}
            value={tags}
            onChange={newTags => handleChange(List(newTags))}
            renderTag={renderTag}
        />;
    }
}

export default RestaurantTagsInput;