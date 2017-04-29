import React, {Component} from 'react';
import {FormControl} from 'react-bootstrap';

export default (inputChangeAction) => class extends Component {
    constructor (props) {
        super(props);
        this.state = {value: props.value};
        this.handleChange = this.handleChange.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.state.value) {
            this.setState({value: nextProps.value});
        }
    }
    handleChange (e) {
        this.setState({
            model: this.state.value = e.target.value
        });
    }
    render () {
        const { field, value, ...props } = this.props; //eslint-disable-line no-unused-vars
        return <FormControl onBlur={e => inputChangeAction(field, e)}
                            onChange={this.handleChange}
                            value={this.state.value}
                            className="form-control"
                            {...props}
        />;
    }
};