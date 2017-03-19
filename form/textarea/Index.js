var React = require('react');
var PropTypes = React.PropTypes;

var moment = require('moment');
import forOwn from 'lodash/forOwn';
var Textarea = require('./Textarea');

var Index = React.createClass({
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
    },
    toggleErrorDisplay: function(flag) {
        this.setState({
            showError: flag
        });
    },
    render: function() {
        return (
            <Textarea 
                id={this.props.id}
                className = {this.props.className}
                cols = {this.props.cols} 
                showError = {this.state.showError} 
                type = {this.props.type}
                defaultValue = {this.props.defaultValue}
                disabled = {this.props.disabled} 
                errors = {this.props.form.errors} 
                label = {this.props.label}
                onInputChange = {this.handleInputChange}
                required = {this.props.required} 
                rows = {this.props.row} 
                toggleErrorDisplay = {this.toggleErrorDisplay}
            />
        )
    }
});

Index.propTypes = {
    id: PropTypes.string.isRequired
}

module.exports = Index;