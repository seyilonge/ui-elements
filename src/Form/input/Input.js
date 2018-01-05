import React from 'react';
import PropTypes from 'prop-types';
import HelpText  from '../helpText/Index';
import NumberFormat from 'react-number-format';

function Input (props) {
    let hasErrors = props.errors.hasErrors && props.errors.data.hasOwnProperty(props.id),
        labelClass = props.required ? 'label-required' : '',
        requiredField = props.required ? "(Required)" : "";
    labelClass = props.helpText || props.helpTextAction ? labelClass + ' inline' : labelClass;
    const className = hasErrors ? props.className + ' error' : props.className;
    return (
        <div>
            <div>
                <label htmlFor={props.id} className={labelClass}>{props.label} <span className="sr-only">{requiredField}</span></label>
                {(props.helpText || props.helpTextAction) &&
                    <HelpText
                        id={props.id}
                        text={props.helpText}
                        action={props.helpTextAction}
                    />
                }
            </div>
            {!props.numberFormat &&
                <input
                    id={props.id}
                    className ={className}
                    name={props.id}
                    value={props.value}
                    disabled={props.disabled}
                    onChange={props.onInputChange}
                    onBlur={props.onInputBlur}
                    placeholder={props.placeholder}
                    type={props.type}
                />
            }
            {props.numberFormat &&
                <NumberFormat
                    id={props.id}
                    className ={className}
                    name={props.id}
                    value={props.value}
                    disabled={props.disabled}
                    format={props.format}
                    onChange={props.onInputChange}
                    placeholder={props.placeholder}
                    type={props.type}
                />
            }
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

Input.propTypes = {
    className: PropTypes.string,
    value: PropTypes.any,
    disabled: PropTypes.string,
    errors: PropTypes.object.isRequired,
    id: PropTypes.string,
    label: PropTypes.string,
    numberFormat: PropTypes.bool,
    format: PropTypes.string,
    onInputBlur: PropTypes.func,
    onInputChange: PropTypes.func,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    type: PropTypes.string,
    helpText: PropTypes.string,
    helpTextAction: PropTypes.func
};

module.exports = Input;
