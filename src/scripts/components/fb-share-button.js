/* global FB */
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

export default class FBShareButton extends Component {
    constructor() {
        super();
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        if (!FB) {
            //TODO Attach to FB init method in templates.js and handle FB load which enables FB share action
            return;
        }
        FB.ui({
            method: 'share',
            display: 'popup',
            mobile_iframe: true,
            href: this.props.url,
        }, function (response) { 
            // TODO Handle successful sharing
        });
    }

    render() {
        return (
            <Button bsStyle="primary" onClick={this.onClick} className={this.props.className}><i className="fa fa-facebook-square margin-right-1x" />Share</Button>
        );
    }


}