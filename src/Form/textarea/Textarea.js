import React from 'react';
import PropTypes from 'prop-types';
import HelpText  from '../helpText/Index';

function Textarea (props) {
    let hasErrors = props.errors.hasErrors && props.errors.data.hasOwnProperty(props.id),
        labelClass = props.required ? 'label-required' : '',
        requiredField = props.required ? "(Required)" : "";
    labelClass = props.helpText ? labelClass + ' inline' : labelClass;
    const className = hasErrors ? props.className + ' form-control-error' : props.className;
    return (
        <div>
            <label htmlFor={props.id} className={labelClass}>{props.label} <span className="sr-only">{requiredField}</span></label>
            {props.helpText &&
                <HelpText
                    id={props.id}
                    text={props.helpText}
                />
            }
            {props.blockMessage &&
                <p className="help-block">{props.blockMessage}</p>
            }
            <textarea
                id={props.id}
                className ={className}
                cols={props.cols}
                value={props.value}
                disabled={props.disabled}
                onChange={props.onInputChange}
                placeholder={props.placeholder}
                rows={props.rows}
                maxLength={!props.maxLength ? "500" : props.maxLength}
            >
            </textarea>
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

Textarea.propTypes = {
    className: PropTypes.string,
    blockMessage: PropTypes.string,
    cols: PropTypes.string,
    value: PropTypes.any,
    disabled: PropTypes.string,
    errors: PropTypes.object.isRequired,
    id: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string,
    onInputChange: PropTypes.func,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    maxLength: PropTypes.string,
    rows: PropTypes.string
};

module.exports = Textarea;
