import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

export default (inputChangeAction) => class extends Component {
    constructor(props) {
        super(props);
        this.state = { value: props.value };
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.state.value) {
            this.setState({ value: nextProps.value });
        }
    }
    handleChange(e) {
        this.setState({
            model: this.state.value = e.target.value
        });
    }
    render() {
        const { field, value, label, selectValues, ...props } = this.props; //eslint-disable-line no-unused-vars
        const isSelect = selectValues && selectValues.length;
        const customisedProps = { ...props, componentClass: isSelect ? 'select' : 'input' };
        return (
            <FormGroup>
                <ControlLabel>{label}</ControlLabel>
                <FormControl onBlur={e => inputChangeAction(field, e)}
                    onChange={this.handleChange}
                    value={this.state.value}
                    className="form-control"
                    {...customisedProps}
                >
                    {selectValues && selectValues.map(item => <option key={item} value={item}>{item}</option>)}
                </FormControl>
            </FormGroup>
        );
    }
};

// propTypes = {
//         field: PropTypes.string,
//         value: PropTypes.string
//     }