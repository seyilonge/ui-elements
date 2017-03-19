var React = require('react');
var PropTypes = React.PropTypes;

var moment = require('moment');
import filter from 'lodash/filter';
import forOwn from 'lodash/forOwn';
var Select = require('./Select');

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
        
        if (targetType === 'select-multiple') {
            const selectedValues = [...event.target.options].filter( (option) => option.selected).map( (option) => option.value);
            this.props.updateFormData(targetID, selectedValues)
        } else {
            this.props.updateFormData(targetID, targetValue);
        }
        
        if(this.props.form.errors.hasErrors) {
            this.toggleErrorDisplay(false)
        }
        
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
            <Select 
                id={this.props.id}
                className = {this.props.className}
                showError = {this.state.showError} 
                type = {this.props.type}
                defaultValue = {this.props.defaultValue}
                disabled = {this.props.disabled} 
                errors = {this.props.form.errors} 
                items={this.props.items}
                label = {this.props.label}
                onInputChange = {this.handleInputChange}
                required = {this.props.required} 
                size = {this.props.size}
                toggleErrorDisplay = {this.toggleErrorDisplay}
                multiple = {this.props.multiple}
            />
        )
    }
});

Index.propTypes = {
    id: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired, 
    onInputChange: PropTypes.func
}

module.exports = Index;