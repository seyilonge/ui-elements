import React from 'react';
import PropTypes from 'prop-types';
import HelpText  from '../helpText/Index';

function Radio (props) {
    let hasErrors = props.errors.hasErrors && props.errors.data.hasOwnProperty(props.groupId),
        labelClass = props.required ? ' label-required' : '',
        radioClass = props.inline ? ' form-radio-block' : ' form-radio-inline',
        requiredField = props.required ? "(Required)" : "";
    labelClass = props.helpText ? labelClass + ' inline' : labelClass;
    const containerClass = hasErrors ? 'form-control-error' : '';
    return (
        <div>
            <div id={props.groupId} className={'gs-legend' + labelClass}>{props.label} <span className="sr-only">{requiredField}</span></div>
            {props.helpText &&
                <HelpText
                    id={props.groupId}
                    text={props.helpText}
                />
            }
            <div className={containerClass}>
                {props.items.map( (thisItem, index) => {
                    let checkedValue = "";
                    {props.defaultValue.map( (selectedValue, valueIndex) => {
                        if(selectedValue.value === thisItem.value) {
                            checkedValue = selectedValue.checked;
                        }
                    })}
                    return (
                        <div className={"gs-input" + radioClass} key={index}>
                            <input
                                id={props.id ? props.id : props.groupId + index}
                                type="radio"
                                name={props.groupId}
                                value={thisItem.value}
                                disabled={props.disabled}
                                checked={checkedValue}
                                onChange={props.onInputChange.bind(null, index, thisItem.label)}
                            />
                            <label
                                className="gs-label-overide"
                                htmlFor={props.id ? props.id : props.groupId + index}
                                aria-labelledby={props.groupId}>{thisItem.label} &nbsp;
                            </label>
                        </div>
                    )
                })}
            </div>
            {hasErrors &&
                <ul className="gs-formfield-error">
                    {props.errors.data[props.groupId].map( function(error, index ) {
                        return (
                            <li key={index}>{error}</li>
                        )
                    })}
                </ul>
            }
        </div>
    )
};

Radio.propTypes = {
    defaultValue: PropTypes.any,
    disabled: PropTypes.string,
    errors: PropTypes.object.isRequired,
    id: PropTypes.string,
    groupId: PropTypes.string,
    inline: PropTypes.bool,
    label: PropTypes.string,
    name: PropTypes.string,
    onInputChange: PropTypes.func,
    required: PropTypes.bool,
    helpText: PropTypes.string
};

module.exports = Radio;
