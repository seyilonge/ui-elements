import React, { PropTypes } from 'react';

//import Select from 'react-select';
//import 'react-select/dist/react-select.css';

function Select (props) {
    //console.log("Selects: ", props);
    //console.log("Found error", typeof props.errors.data === 'undefined');
    const labelClass = props.required ? 'label-required' : '',
          tabIndex = typeof props.tabIndex !== 'undefined' ? props.tabIndex : 0,
          multiSelect = props.type === 'select-multiple' ? true : false;
    if(typeof props.errors.data === 'undefined' || !props.errors.data.hasOwnProperty(props.id)) {
        return (
            <div>
                <label htmlFor={props.id} className={labelClass}>{props.label}</label>
                <select
                    id={props.id}
                    type={props.type}
                    className={props.className}
                    defaultValue={props.defaultValue}
                    disabled={props.disabled}
                    size={props.size}
                    onChange={props.onInputChange}
                    multiple={multiSelect}>
                        {props.items.map( (thisItem, index) => {
                            return (
                                <option key={index} value={thisItem.value}>{thisItem.label}</option>
                            )
                        })}
                </select>
            </div>
        )
    } else {
        const toggleDisplay = props.showError ? ' show' : '',
              errorClass = props.showError ? ' form-control-error' : '';
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
                <span>
                    <label htmlFor={props.id} className={labelClass}>{props.label}</label>
                </span>
                <span>
                    <select
                        id={props.id}
                        type={props.type}
                        className={props.className + errorClass}
                        defaultValue={props.defaultValue}
                        disabled={props.disabled}
                        label={props.label}
                        size={props.size}
                        onChange={props.onInputChange}
                        multiple={multiSelect}>
                            {props.items.map( (thisItem, index) => {
                                return (
                                    <option key={index} value={thisItem.value}>{thisItem.label}</option>
                                )
                            })}
                        onFocus={props.toggleErrorDisplay.bind(null, false)}
                    </select>
                </span>
            </div>
        )
    }
};

Select.propTypes = {
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
    size: PropTypes.string,
    tab: PropTypes.string,
    toggleErrorDisplay: PropTypes.func.isRequired,
    type: PropTypes.string
};

module.exports = Select;
