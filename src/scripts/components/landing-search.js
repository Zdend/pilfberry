import React from 'react';
import TagsInput from 'react-tagsinput';
import { Button, InputGroup } from 'react-bootstrap';

export default ({ handleSearch, value }) => {
    return (
        <InputGroup className="margin-top-3x">
            <TagsInput
                value={value}
                onChange={newTags => handleSearch(newTags)}
                className="landing-page__tags-input form-control"
                inputProps={{
                    placeholder: 'Filter restaurants by address, name or diet'
                }}
            />

            <InputGroup.Button className="landing-page__tags-btn">
                <Button bsStyle="primary"><i className="fa fa-search" /></Button>
            </InputGroup.Button>
        </InputGroup>
    );
};