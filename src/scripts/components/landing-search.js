import React from 'react';
import TagsInput from 'react-tagsinput';
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import { splitSearchExpression } from '../services/util';



export default ({ handleSearch, value }) => {
    // const tags = splitSearchExpression(value);
    return (
        <InputGroup className="margin-top-3x">
            <TagsInput
                value={value}
                onChange={newTags => handleSearch(newTags)}
                className="landing-page__tags-input form-control"
                inputProps={{
                    placeholder: 'Filter restaurants by address, name or diet'
                }}
            />;

            <InputGroup.Button className="landing-page__tags-btn">
                <Button bsStyle="primary"><i className="fa fa-search" /></Button>
            </InputGroup.Button>
        </InputGroup>
    );
};

//*<FormControl placeholder="Filter restaurants by address, name or dieatary" onChange={handleSearch} />*/}