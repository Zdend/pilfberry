import React from 'react';
import { Label } from 'react-bootstrap';

export default ({ tag, type = 'success' }) => (
    <Label bsStyle={type} className="label-wrap">
        {tag.toLowerCase()}
    </Label>
);