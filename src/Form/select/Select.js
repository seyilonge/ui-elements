import React from 'react';
import PropTypes from 'prop-types';
import HelpText  from '../helpText/Index';

function Select (props) {
    let hasErrors = props.errors.hasErrors && props.errors.data.hasOwnProperty(props.id),
        labelClass = props.required ? 'label-required' : '',
        requiredField = props.required ? "(Required)" : "";
    labelClass = props.helpText || props.helpTextAction ? labelClass + ' inline' : labelClass;
    const className = hasErrors ? props.className + ' form-control-error' : props.className;
    return (
        <div>
            <label htmlFor={props.id} className={labelClass}>{props.label} <span className="sr-only">{requiredField}</span></label>
            {(props.helpText || props.helpTextAction) &&
                <HelpText
                    id={props.id}
                    text={props.helpText}
                    action={props.helpTextAction}
                />
            }
            <select
                id={props.id}
                className={className}
                value={props.defaultValue}
                disabled={props.disabled}
                size={props.size}
                name={props.id}
                onChange={props.onInputChange}>
                    {props.options.map( (thisOption, index) => {
                        return (
                            <option key={index} value={thisOption.value}>{thisOption.label}</option>
                        )
                    })}
            </select>
            {hasErrors &&
                <ul className="gs-formfield-error">
                    {props.errors.data[props.id].map( function(error, index ) {
                        return (
                            <li key={index}>{error}</li>
                        )
                    })}
                </ul>
            }
        </div>
    )
};

Select.propTypes = {
    className: PropTypes.string,
    defaultValue: PropTypes.any,
    disabled: PropTypes.string,
    errors: PropTypes.object.isRequired,
    id: PropTypes.string,
    label: PropTypes.string,
    onInputChange: PropTypes.func,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    size: PropTypes.string,
    helpTextAction: PropTypes.func
};

module.exports = Select;
