const React = require('react');
const PropTypes = React.PropTypes;

import FormButton from './Button';

const Index = React.createClass({
    componentDidMount: function() {

    },
    handleSubmitClick: function(event) {
        event.preventDefault();
        // validate form
        //console.log("Validating form data...");
        this.props.validateFormData();

        // Run caller function once validation has passed
        setTimeout(() => {
            if(this.props.form.errors.validated && !this.props.form.errors.hasErrors) {
                //
                console.log("Running sub function...");
                if(typeof this.props.action !== 'undefined') {
                    this.props.action(event);
                }
            } else {
                console.log("You can't proceed. Your form contains some validation errors.");
                console.log(this.props.form.errors.data);
            }
       }, 300);

    },
    render: function() {
        return (
            <FormButton
                {...this.props}
                onSubmitClick = {this.handleSubmitClick}
            />
        )
    }
});

Index.propTypes = {
    action: PropTypes.func.isRequired
}

module.exports = Index;
