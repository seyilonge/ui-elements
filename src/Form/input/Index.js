import React from 'react';
import PropTypes from 'prop-types';
import Input from './Input';
import _omit from 'lodash/omit';
import _cloneDeep from 'lodash/cloneDeep';

let error = "";
let Index = React.createClass({
    componentDidMount: function() {
        if(this.props.validation) {
            let constraint = {
                [this.props.id]: this.props.validation
            }
            this.props.setFormConstraint(this.props.id, this.props.validation);
        }
    },
    handleInputBlur: function() {
        if (this.props.form.data[this.props.id]) {
            this.props.updateFormData(this.props.id, this.props.form.data[this.props.id].trim())
        }
    },
    handleInputChange: function(event) {
        const targetValue = event.target.value,
            targetID = event.target.getAttribute('id'),
            targetType = event.target.getAttribute('type');

        if(this.props.form.errors.hasErrors) {
            this.props.clearFormErrorData(this.props.id);
        }

        this.props.updateFormData(targetID, targetValue);

        if(typeof this.props.onInputChange !== 'undefined') {
            this.props.onInputChange(event);
        }
    },
    render: function() {
        return (
            <Input
                id={this.props.id}
                className = {this.props.className}
                type = {this.props.type}
                value = {this.props.value ? this.props.value : this.props.form.data[this.props.id]}
                disabled = {this.props.disabled}
                errors = {this.props.form.errors}
                label = {this.props.label}
                numberFormat={this.props.numberFormat}
                format={this.props.format}
                onInputBlur = {this.handleInputBlur}
                onInputChange = {this.handleInputChange}
                placeholder = {this.props.placeholder}
                required = {this.props.required}
                helpText = {this.props.helpText}
                helpTextAction = {this.props.helpTextAction}
            />
        )
    }
});

Index.propTypes = {
    id: PropTypes.string.isRequired,
    onInputChange: PropTypes.func
}

module.exports = Index;
