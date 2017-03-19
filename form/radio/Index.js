var React = require('react');
var PropTypes = React.PropTypes;
var moment = require('moment');
var Radio = require('./Radio');

var Index = React.createClass({
    getInitialState: function() {
        return {
            updated: false,
            showError: true
        }
    },
    componentDidMount: function() {
        //var getConstraints = getValidationConstraints();
        if(this.props.validation) {
            let constraint = {
                [this.props.groupId]: this.props.validation
            }
            this.props.setFormConstraint(this.props.groupId, this.props.validation);
        }
    },
    handleInputChange: function(event) {
        var targetValue = event.target.value,
            targetID = event.target.getAttribute('name'),
            targetType = event.target.getAttribute('type');

        if(this.props.form.errors.hasErrors) {
            this.toggleErrorDisplay(false)
        }

        this.props.updateFormData(targetID, targetValue);
        if(typeof this.props.onInputChange !== 'undefined') {
            this.props.onInputChange(event);
        }
    },
    toggleErrorDisplay: function(flag) {
        this.setState({
            showError: flag
        });
    },
    render: function() {
        return (
            <Radio
                id={this.props.groupId}
                showError = {this.state.showError}
                defaultValue = {this.props.form.data[this.props.groupId]}
                disabled = {this.props.disabled}
                errors = {this.props.form.errors}
                items = {this.props.items}
                label = {this.props.groupLabel}
                onInputChange = {this.handleInputChange}
                required = {this.props.required}
                toggleErrorDisplay = {this.toggleErrorDisplay}
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
