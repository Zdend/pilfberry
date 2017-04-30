import React from 'react';
import { Link } from 'react-router-dom';
import {ButtonToolbar, ButtonGroup, Button, DropdownButton, MenuItem} from 'react-bootstrap';

export default () => (
    <div className="">
        <div className="hero">
            <h1 className="hero-title">Eat without worries</h1>



            <div className="text-align-center margin-top-5x">
                <ButtonToolbar>
                    <ButtonGroup bsSize="large" className="pull-none">
                        <Button bsStyle="primary">Vegan</Button>
                        <Button bsStyle="primary">Vegetarian</Button>
                        <Button bsStyle="primary">Gluten Free</Button>
                        <Button bsStyle="primary">Pregnant Friendly</Button>
                        <DropdownButton bsSize="large" title={<span><i className="fa fa-ellipsis-h" /> More</span>} id="bg-justified-dropdown" bsStyle="primary">
                            <MenuItem eventKey="1">Dairy Free</MenuItem>
                            <MenuItem eventKey="2">Nut Free</MenuItem>
                        </DropdownButton>
                    </ButtonGroup>
                </ButtonToolbar>

            </div>
        </div>

    </div>
);
