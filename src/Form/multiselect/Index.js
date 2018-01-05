import React from 'react';
import PropTypes from 'prop-types';

import _find from 'lodash/find';
import _omit from 'lodash/omit';
import _remove from 'lodash/remove';

import MultiSelect from './MultiSelect';
import onClickOutside from 'react-onclickoutside';

const Index = onClickOutside(React.createClass({
    getInitialState: function() {
        return {
            nextOptionIndex: 0,
            showSelectOptions: false
        }
    },
    componentDidMount: function() {
        if(this.props.validation && this.props.required) {
            let constraint = {
                [this.props.id]: this.props.validation
            }
            this.props.setFormConstraint(this.props.id, this.props.validation);
        }
    },
    handleNavigateOptions: function(index, options, event) {
        let nextOptionIndex = this.state.nextOptionIndex;
        /*
        if (typeof event.key === 'undefined') {
            const nestedChildren = event.target.children,
                optionContainer = nestedChildren[2].children[nextOptionIndex];
            this.setState({
                nextOptionIndex: index + 1
            });
            console.log("Children", nestedChildren);
            console.log("Next Option", optionContainer);
            optionContainer.focus();
        } else {
            const keyStroke = event.keyCode == 32 ? 'SpaceBar' : event.key;
            console.log("Event Object", keyStroke, event, event.target);

            console.log("Alternative", this);
            //console.log("Parent", event.target.parentElement());
            console.log("Event Key", keyStroke, event.keyCode, keyStroke.length);

            switch (keyStroke) {
                case 'ArrowUp':

                case 'ArrowDown':
                    optionContainer.focus();
                case 'SpaceBar':

            }
        }
        */

        /*
        switch (keyStroke) {
            case 'ArrowUp':

            case 'ArrowDown':
                optionContainer.focus();
        }
        */


        //event.target.children[2].children[0].focus();
    },
    toggleSelectOptions: function(flag, event) {
        const targetClass = event.target.getAttribute('class');
        if( targetClass === 'option-label' || targetClass === 'option-checkbox' ) {
            this.setState({
                showSelectOptions: true
            });
        } else {
            this.setState({
                showSelectOptions: flag
            });
        }
    },
    handleSelectOptionsClose: function(flag, event) {
        const targetClass = event.target.getAttribute('class');
        if( targetClass === 'option-label' || targetClass === 'option-checkbox' ) {
            this.setState({
                showSelectOptions: true
            });
        } else {
            this.setState({
                showSelectOptions: false
            });
        }
    },
    handleCheckboxClick: function(event) {
        this.setState({
            showSelectOptions: true
        });
    },
    handleClickOutside: function(event) {
        this.setState({
            showSelectOptions: false
        });
    },
    handleInputChange: function( selectedOption, event ) {
        if( this.props.onInputChangePreHandler ) {
            this.props.onInputChangePreHandler(selectedOption, event );
        }
        const selectedChecked = event.target.checked;
        let selectedOptionsArray = typeof this.props.form.data[this.props.id] !== 'undefined' ? this.props.form.data[this.props.id] : [];
        const selectedOptionExists = _find( selectedOptionsArray, selectedOption );

        if (!selectedChecked && typeof selectedOptionExists !== 'undefined' ) {
            // Remove from array options *** Mutation alert *** might not be an issue in the scheme of things.
            _remove( selectedOptionsArray, selectedOption );
        } else {
            selectedOption['checked'] = selectedChecked;
            selectedOptionsArray.push( selectedOption );
        }

        // Update form data
        this.props.updateFormData( this.props.id, selectedOptionsArray );

        if(this.props.form.errors.hasErrors) {
            this.props.clearFormErrorData(this.props.id);
        }

        if( this.props.onInputChange ) {
            this.props.onInputChange(selectedOption, event );
        }
    },
    render: function() {
        return (
            <MultiSelect
                id={this.props.id}
                className = {this.props.className}
                onCheckboxClick = {this.handleCheckboxClick}
                name = {this.props.name}
                type = {this.props.type}
                value = {this.props.value ? this.props.value : this.props.form.data[this.props.id]}
                disabled = {this.props.disabled}
                errors = {this.props.form.errors}
                options={this.props.options}
                label = {this.props.label}
                onInputChange = {this.handleInputChange}
                onNavigateOptions = {this.handleNavigateOptions}
                onSelectOptionsClose = {this.handleSelectOptionsClose}
                placeholder = {this.props.placeholder}
                required = {this.props.required}
                showSelectOptions = {this.state.showSelectOptions}
                toggleSelectOptions = {this.toggleSelectOptions}
                helpText = {this.props.helpText}
                helpTextAction = {this.props.helpTextAction}
            />
        )
    }
}));

Index.propTypes = {
    id: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    onInputChange: PropTypes.func,
    onInputChangePreHandler: PropTypes.func
}

module.exports = Index;
