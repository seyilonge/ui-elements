import React, { PropTypes } from 'react';

import find from 'lodash/find';
import remove from 'lodash/remove';

import MultiSelector from './MultiSelector';

const Index = React.createClass({
    getInitialState: function() {
        return {
            showError: true,
            showSelectOptions: false
        }
    },
    componentWillMount: function() {

    },
    componentDidMount: function() {
        if(this.props.validation) {
            let constraint = {
                [this.props.id]: this.props.validation
            }
            this.props.setFormConstraint(this.props.id, this.props.validation);
        }
        console.log("Multiselect Props", this)
    },
    handleShowOptions: function(flag) {
        this.setState({
            showSelectOptions: flag
        })
    },
    handleSelectChange: function( selectedOption, event ) {
        const selectedChecked = event.target.checked;
        let selectedOptionsArray = typeof this.props.form.data[this.props.id] !== 'undefined' ? this.props.form.data[this.props.id] : [];
        const selectedOptionExists = find( selectedOptionsArray, selectedOption );

        if (!selectedChecked && typeof selectedOptionExists !== 'undefined' ) {
            // Remove from array options *** Mutation alert *** might not be an issue in the scheme of things.
            remove( selectedOptionsArray, selectedOption );
        } else {
            selectedOption['checked'] = selectedChecked;
            selectedOptionsArray.push( selectedOption );
        }

        // Update form data
        this.props.updateFormData( this.props.id, selectedOptionsArray )

        if( this.props.form.errors.hasErrors ) {
            this.toggleErrorDisplay( false )
        }

        if( typeof this.props.onSelectChange !== 'undefined' ) {
            this.props.onSelectChange( id, selectedValues )
        }
    },
    toggleErrorDisplay: function( flag ) {
        this.setState({
            showError: flag
        });
    },
    render: function() {
        return (
            <MultiSelector
                id={this.props.id}
                className = {this.props.className}
                showError = {this.state.showError}
                name = {this.props.name}
                type = {this.props.type}
                value = {this.props.value}
                disabled = {this.props.disabled}
                errors = {this.props.form.errors}
                options={this.props.options}
                label = {this.props.label}
                onSelectChange = {this.handleSelectChange}
                placeholder = {this.props.placeholder}
                required = {this.props.required}
                    showOptions = {this.handleShowOptions}
                showSelectOptions = {this.state.showSelectOptions}
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
