import React, { Component } from 'react';
import { TAGS, TAG } from '../../../shared/constants';
import {
    ButtonToolbar, ButtonGroup, Button, DropdownButton,
    MenuItem
} from 'react-bootstrap';

const ToggleButtonHOC = (toggle, onClick) => ({ tag, className }) =>
    <Button bsStyle="primary" onClick={() => onClick(tag)} active={toggle.get(tag)} className={`text-capitalize ${className}`}>{tag.toLowerCase()}</Button>;

const ToggleMenuItemHOC = (toggle, onClick) => ({ tag, className }) =>
    <MenuItem onClick={() => onClick(tag)} active={toggle.get(tag)} className={`text-capitalize ${className}`}>{tag.toLowerCase()}</MenuItem>;


export default class TagFilter extends Component {
    render() {
        const { tagToggle, onChange } = this.props;
        const ToggleButton = ToggleButtonHOC(tagToggle, onChange);
        const ToggleMenuItem = ToggleMenuItemHOC(tagToggle, onChange);
        const isMoreActive = [TAG.DAIRY_FREE, TAG.NUT_FREE, TAG.PREGNANT_FRIENDLY, TAG.RAW_VEGAN]
            .some(item => tagToggle.get(item));
        return (

            <ButtonToolbar>
                <ButtonGroup className="pull-none">
                    <ToggleButton tag={TAG.VEGETARIAN} />
                    <ToggleButton tag={TAG.VEGAN} />
                    <ToggleButton tag={TAG.GLUTEN_FREE} />
                    <ToggleButton tag={TAG.DAIRY_FREE} className="hidden-xs" />
                    <DropdownButton title={<span><i className="fa fa-ellipsis-h" /> More</span>}
                        id="bg-justified-dropdown" bsStyle="primary" pullRight active={isMoreActive}>
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