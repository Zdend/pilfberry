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
            value: e.target.value
        });
    }
    render() {
        const { field, label, value, selectValues, type, ...props } = this.props; //eslint-disable-line no-unused-vars
        const customisedProps = { ...props, componentClass: type };
        return (
            <FormGroup>
                <ControlLabel>{label}</ControlLabel>
                <FormControl onBlur={e => inputChangeAction(field, e)}
                    onChange={this.handleChange}
                    value={this.state.value || ''}
                    type={type || 'text'}
                    {...customisedProps}
                >
                    {selectValues && selectValues.map(item => {
                        if (typeof item === 'string') {
                            return <option key={item} value={item}>{item}</option>;
                        }

                        return <option key={item.key} value={item.value}>{item.key}</option>;
                    })}
                </FormControl>
            </FormGroup>
        );
    }
};

// propTypes = {
//         field: PropTypes.string,
//         value: PropTypes.string
//     }