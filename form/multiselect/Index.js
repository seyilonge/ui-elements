var React = require('react');
var PropTypes = React.PropTypes;

var moment = require('moment');
import filter from 'lodash/filter';
import forOwn from 'lodash/forOwn';
var MultiSelect = require('./MultiSelect');

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
    onValuesChange: function(id, selectedValues) {
        /*
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

        if(typeof this.props.onValuesChange !== 'undefined') {
            this.props.onValuesChange(event);
        }
        */
        this.props.updateFormData(id, selectedValues)
        //console.log("Multiselect values", id, selectedValues);
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
                onValuesChange = {this.onValuesChange}
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
