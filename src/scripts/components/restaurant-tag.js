import React from 'react';
import { Label } from 'react-bootstrap';

export default ({ tag }) => (
    <Label bsStyle="success" className="margin-right-05x">
        {tag.toLowerCase()}
    </Label>
);