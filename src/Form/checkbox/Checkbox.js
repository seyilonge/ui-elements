import React from 'react';
import PropTypes from 'prop-types';
import HelpText  from '../helpText/Index';

function Checkbox (props) {
    let hasErrors = props.errors.hasErrors && props.errors.data.hasOwnProperty(props.id),
        labelClass = props.required ? 'label-required' : '',
        requiredField = props.required ? "(Required)" : "";
    labelClass = props.helpText ? labelClass + ' inline' : labelClass;
    const containerClass = hasErrors ? 'form-control-error' : '';
    return (
        <div>
            <div className={containerClass}>
                {props.items.map( (thisItem, index) => {
                    let checkedValue = "";
                    {props.value.map( (selectedValue, valueIndex) => {
                        if(selectedValue.value === thisItem.value) {
                            checkedValue = selectedValue.checked;
                        }
                    })}
                    return (
                        <div key={index}>
                            <label htmlFor={props.id + index} className={labelClass}>
                                <span>
                                    <input
                                        id={props.id + index}
                                        disabled={props.disabled}
                                        checked={checkedValue}
                                        name={props.id}
                                        onChange={props.onInputChange.bind(null, index, thisItem.label)}
                                        type="checkbox"
                                        value={thisItem.value}
                                    />
                                    <span className="checkbox-label">{thisItem.label} <span className="sr-only">{requiredField}</span></span>
                                </span>
                            </label>
                            {props.helpText &&
                                <HelpText
                                    id={props.id + index}
                                    text={props.helpText}
                                />
                            }
                        </div>
                    )
                })}
            </div>
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

Checkbox.propTypes = {
    className: PropTypes.string,
    disabled: PropTypes.string,
    errors: PropTypes.object.isRequired,
    id: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string,
    onInputChange: PropTypes.func,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    type: PropTypes.string
};

module.exports = Checkbox;
