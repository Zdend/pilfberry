import React, { Component } from 'react';
import {
    ButtonToolbar, ButtonGroup, Button, DropdownButton,
    MenuItem
} from 'react-bootstrap';
import { TAG } from '../../../shared/constants';

const ToggleButtonHOC = (onClick) => ({ tag, className }) =>
    <Button bsStyle="primary" onClick={() => onClick(tag)} className={`text-capitalize landing-page__filter-button ${className || ''}`}>{tag.toLowerCase()}</Button>;

const ToggleMenuItemHOC = (onClick) => ({ tag, className }) =>
    <MenuItem onClick={() => onClick(tag)} className={`text-capitalize landing-page__filter-button ${className || ''}`}>{tag.toLowerCase()}</MenuItem>;


export default class TagFilter extends Component {
    render() {
        const { searchExpressions, handleSearch } = this.props;
        const handleChange = value => {
            const result = searchExpressions.contains(value)
                ? searchExpressions.filter(item => item !== value)
                : searchExpressions.add(value);
            handleSearch(result);
        };
        const ToggleButton = ToggleButtonHOC(handleChange);
        const ToggleMenuItem = ToggleMenuItemHOC(handleChange);
        return (

            <ButtonToolbar>
                <ButtonGroup className="pull-none">
                    <ToggleButton tag={TAG.VEGETARIAN} />
                    <ToggleButton tag={TAG.VEGAN} />
                    <ToggleButton tag={TAG.GLUTEN_FREE} />
                    <ToggleButton tag={TAG.DAIRY_FREE} className="hidden-xs" />
                    <DropdownButton title={<span><i className="fa fa-ellipsis-h" /> More</span>}
                        id="bg-justified-dropdown" bsStyle="primary" pullRight className="landing-page__filter-button">
                        <ToggleMenuItem tag={TAG.DAIRY_FREE} className="visible-xs" />
                        <ToggleMenuItem tag={TAG.NUT_FREE} />
                        <ToggleMenuItem tag={TAG.PREGNANT_FRIENDLY} />
                        <ToggleMenuItem tag={TAG.RAW_VEGAN} />
                    </DropdownButton>
                </ButtonGroup>
            </ButtonToolbar>

        );
    }
}