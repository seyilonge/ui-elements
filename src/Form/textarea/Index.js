import React from 'react';
import PropTypes from 'prop-types';

import Textarea from './Textarea';
import _omit from 'lodash/omit';

let Index = React.createClass({
    componentDidMount: function() {
        if(this.props.validation) {
            let constraint = {
                [this.props.id]: this.props.validation
            }
            this.props.setFormConstraint(this.props.id, this.props.validation);
        }
    },
    handleInputChange: function(event) {
        var targetValue = event.target.value,
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
            <Textarea
                id={this.props.id}
                className = {this.props.className}
                blockMessage = {this.props.blockMessage}
                cols = {this.props.cols}
                type = {this.props.type}
                value = {this.props.value ? this.props.value : this.props.form.data[this.props.id]}
                disabled = {this.props.disabled}
                errors = {this.props.form.errors}
                label = {this.props.label}
                onInputChange = {this.handleInputChange}
                placeholder = {this.props.placeholder}
                required = {this.props.required}
                rows = {this.props.row}
                helpText = {this.props.helpText}
                maxLength = {this.props.maxLength}
            />
        )
    }
});

Index.propTypes = {
    id: PropTypes.string.isRequired
}

module.exports = Index;
