import React from 'react';
import PropTypes from 'prop-types';

import FormButton from './Button';

const Index = React.createClass({
    handleSubmitClick: function(event) {
        event.preventDefault();
        this.props.validateFormData();

        // Run caller function once validation has passed
        setTimeout(() => {
            if(this.props.form.errors.validated && !this.props.form.errors.hasErrors) {
                //
                if(process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'local') {
                    console.log("Running sub function...");
                }
                if(typeof this.props.action !== 'undefined') {
                    this.props.action(event);
                }
            } else {
                if(process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'local') {
                    console.log("You can't proceed. Your form contains some validation errors.");
                    console.log(this.props.form.errors.data);
                }
            }
       }, 300);

    },
    render: function() {
        return (
            <FormButton
                {...this.props}
                onSubmitClick = {this.handleSubmitClick}
                helpText = {this.props.helpText}
            />
        )
    }
});

Index.propTypes = {
    action: PropTypes.func.isRequired
}

module.exports = Index;
