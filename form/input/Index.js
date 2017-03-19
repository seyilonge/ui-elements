var React = require('react');
var PropTypes = React.PropTypes;

var moment = require('moment');
var Input = require('./Input');

var Index = React.createClass({
    getDefaultProps: function() {
        return {

        }
    },
    getInitialState: function() {
        return {
            showError: true
        }
    },
    /*componentWillReceiveProps: function() {
        console.log("Resetting error display...")
        if(this.props.form.errors.hasErrors) {
            this.toggleErrorDisplay(true)
        }
    },*/
    componentDidMount: function() {
        //var getConstraints = getValidationConstraints();
        if(this.props.validation) {
            let constraint = {
                [this.props.id]: this.props.validation
            }
            //console.log("constraint", constraint);
            this.props.setFormConstraint(this.props.id, this.props.validation);
        }

        /*
        constraints = {
            email: {
              // Email is required
              presence: true,
              // and must be an email (duh)
              email: true
            },
            password: {
              // Password is also required
              presence: true,
              // And must be at least 5 characters long
              length: {
                minimum: 5
              }
            },
            "confirm-password": {
              // You need to confirm your password
              presence: true,
              // and it needs to be equal to the other password
              equality: {
                attribute: "password",
                message: "^The passwords does not match"
              }
            },
            username: {
              // You need to pick a username too
              presence: true,
              // And it must be between 3 and 20 characters long
              length: {
                minimum: 3,
                maximum: 20
              },
              format: {
                // We don't allow anything that a-z and 0-9
                pattern: "[a-z0-9]+",
                // but we don't care if the username is uppercase or lowercase
                flags: "i",
                message: "can only contain a-z and 0-9"
              }
            },
            country: {
              // You also need to input where you live
              presence: true,
              // And we restrict the countries supported to Sweden
              inclusion: {
                within: ["SE"],
                // The ^ prevents the field name from being prepended to the error
                message: "^Sorry, this service is for Sweden only"
              }
            },
            zipCode: {
              // Zip is optional but if specified it must be a 5 digit long number
              format: {
                pattern: "\\d{5}"
              }
            },
            "number-of-children": {
              presence: true,
              // Number of children has to be an integer >= 0
              numericality: {
                onlyInteger: true,
                greaterThanOrEqualTo: 0
              }
            }
        };
        */
    },
    handleInputChange: function(event) {
        var targetValue = event.target.value,
            targetID = event.target.getAttribute('id'),
            targetType = event.target.getAttribute('type');

        if(this.props.form.errors.hasErrors) {
            this.toggleErrorDisplay(false)
        }

        this.props.updateFormData(targetID, targetValue);
        if(typeof this.props.onInputChange !== 'undefined') {
            this.props.onInputChange(event);
        }
        //console.log(targetID, targetType, targetValue);
    },
    toggleErrorDisplay: function(flag) {
        this.setState({
            showError: flag
        });
    },
    render: function() {
        return (
            <Input
                id={this.props.id}
                className = {this.props.className}
                showError = {this.state.showError}
                name = {this.props.name}
                type = {this.props.type}
                defaultValue = {this.props.defaultValue}
                disabled = {this.props.disabled}
                errors = {this.props.form.errors}
                label = {this.props.label}
                onInputChange = {this.handleInputChange}
                placeholder = {this.props.placeholder}
                required = {this.props.required}
                toggleErrorDisplay = {this.toggleErrorDisplay}
            />
        )
    }
});

Index.propTypes = {
    id: PropTypes.string.isRequired,
    onInputChange: PropTypes.func
}

module.exports = Index;
