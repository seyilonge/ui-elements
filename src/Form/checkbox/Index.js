import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from './Checkbox';
import _omit from 'lodash/omit';

let Index = React.createClass({
    componentDidMount: function() {
        if(this.props.validation) {
            let constraint = {
                [this.props.groupId]: this.props.validation
            }
            this.props.setFormConstraint(this.props.groupId, this.props.validation);
        }
    },
    handleInputChange: function(index, label, event) {
        var targetValue = event.target.value,
            targetID = event.target.getAttribute('name'),
            targetChecked = event.target.checked;

        if(this.props.form.errors.hasErrors) {
            this.props.clearFormErrorData(targetID);
        }

        let checkboxItems = [{checked: targetChecked, label: label, value: targetValue}];
        this.props.updateFormData(targetID, checkboxItems);

        if(typeof this.props.onInputChange !== 'undefined') {
            this.props.onInputChange(event);
        }
    },
    render: function() {
        return (
            <Checkbox
                id={this.props.groupId}
                disabled = {this.props.disabled}
                errors = {this.props.form.errors}
                items = {this.props.items}
                value = {this.props.form.data[this.props.groupId] ? this.props.form.data[this.props.groupId] : []}
                label = {this.props.groupLabel}
                onInputChange = {this.handleInputChange}
                required = {this.props.required}
                helpText = {this.props.helpText}
            />
        )
    }
});

Index.propTypes = {
    groupId: PropTypes.string.isRequired,
    groupLabel: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
    onInputChange: PropTypes.func
}

module.exports = Index;
