import React, { PropTypes } from 'react';

function Checkbox (props) {
    //console.log("Checkboxes: ", props);
    const labelClass = props.required ? 'label-required' : '';
    if(typeof props.errors.data === 'undefined' || !props.errors.data.hasOwnProperty(props.id)) {
        return (
            <div>
                <label htmlFor={props.id} className={labelClass}>
                    {props.items.map( (thisItem, index) => {
                        return (
                            <span key={index}>
                                <input
                                    id={props.id}
                                    disabled={props.disabled}
                                    defaultChecked={props.defaultValue}
                                    name={props.id}
                                    onChange={props.onInputChange}
                                    type={props.type}
                                    value={thisItem.value}
                                />
                                <span className="">{thisItem.label} &nbsp;</span>
                            </span>
                        )
                    })}
                </label>
            </div>

        )
    } else {
        const toggleDisplay = props.showError ? ' show' : '',
              errorClass = props.showError ? 'form-control-error' : '';
        return (
            <div>
                <div className={'popover top' + toggleDisplay} role="tooltip">
                    <div className="arrow"></div>
                    <div className="popover-content">
                        {props.errors.data[props.id].map( function(error, index ) {
                            return (
                                <div key={index}>{error}</div>
                            )
                        })}
                    </div>
                </div>
                <span className={errorClass}>
                    <label htmlFor={props.id} className={labelClass}>
                        {props.items.map( (thisItem, index) => {
                            return (
                                <span key={index}>
                                    <input
                                        id={props.id}
                                        disabled={props.disabled}
                                        defaultCheckedchecked={props.defaultValue}
                                        name={props.id}
                                        onChange={props.onInputChange}
                                        type={props.type}
                                        value={thisItem.value}
                                    />
                                    <span className="">{thisItem.label} &nbsp;</span>
                                </span>
                            )
                        })}
                    </label>
                </span>
            </div>
        )
    }
};

Checkbox.propTypes = {
    className: PropTypes.string,
    showError: PropTypes.bool,
    defaultValue: PropTypes.any,
    disabled: PropTypes.string,
    errors: PropTypes.object.isRequired,
    id: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string,
    onInputChange: PropTypes.func,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    toggleErrorDisplay: PropTypes.func.isRequired,
    type: PropTypes.string
};

module.exports = Checkbox;
