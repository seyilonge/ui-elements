import React from 'react';
import PropTypes from 'prop-types';

import _omit from 'lodash/omit';
import Select from './Select';

const Index = React.createClass({
    componentDidMount: function() {
        if(this.props.validation) {
            let constraint = {
                [this.props.id]: this.props.validation
            }
            this.props.setFormConstraint(this.props.id, this.props.validation);
        }
    },
    handleInputChange: function(event) {
        if(this.props.onInputChangePreHandler) {
            this.props.onInputChangePreHandler(event);
        }

        const targetValue = event.target.value,
            targetID = event.target.getAttribute('id'),
            selectedIndex = event.target.options[event.target.options.selectedIndex];
        const selectedItem = {"label": selectedIndex.label, "value": selectedIndex.value};

        if(targetValue.length <= 0) {
            this.props.updateFormData(targetID, "");;
        } else {
            this.props.updateFormData(targetID, selectedItem);
        }

        if(this.props.form.errors.hasErrors) {
            this.props.clearFormErrorData(this.props.id);
        }

        if(this.props.onInputChange) {
            this.props.onInputChange(event);
        }
    },
    render: function() {
        return (
            <Select
                id={this.props.id}
                className = {this.props.className}
                defaultValue = {this.props.value ? this.props.value.value : this.props.value}
                disabled = {this.props.disabled}
                errors = {this.props.form.errors}
                options={this.props.options}
                label = {this.props.label}
                onInputChange = {this.handleInputChange}
                required = {this.props.required}
                size = {this.props.size}
                helpText = {this.props.helpText}
                helpTextAction = {this.props.helpTextAction}
            />
        )
    }
});

Index.propTypes = {
    id: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    onInputChange: PropTypes.func,
    onInputChangePreHandler: PropTypes.func
}

module.exports = Index;
