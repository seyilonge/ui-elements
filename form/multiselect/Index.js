import React, { PropTypes } from 'react';

import moment from 'moment';
import filter from 'lodash/filter';
import forOwn from 'lodash/forOwn';
import MultiSelect from './MultiSelect';

const Index = React.createClass({
    getInitialState: function() {
        return {
            showError: true
        }
    },
    componentDidMount: function() {
        if(this.props.validation) {
            let constraint = {
                [this.props.id]: this.props.validation
            }
            this.props.setFormConstraint(this.props.id, this.props.validation);
        }
        //console.log("Multiselect Props", this)
    },
    handleSelectChange: function(id, selectedValues) {
        this.props.updateFormData(id, selectedValues)
        //console.log("Multiselect values", id, selectedValues);

        if(this.props.form.errors.hasErrors) {
            this.toggleErrorDisplay(false)
        }

        if(typeof this.props.onSelectChange !== 'undefined') {
            this.props.onSelectChange(id, selectedValues)
        }
    },
    toggleErrorDisplay: function(flag) {
        this.setState({
            showError: flag
        });
    },
    render: function() {
        return (
            <MultiSelect
                {...this.props}
                showError = {this.state.showError}
                errors = {this.props.form.errors}
                onSelectChange = {this.handleSelectChange}
                toggleErrorDisplay = {this.toggleErrorDisplay}
            />
        )
    }
});

Index.propTypes = {
    id: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired
}

module.exports = Index;
