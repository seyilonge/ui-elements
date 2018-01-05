import React from 'react';
import PropTypes from 'prop-types';
import HelpText  from '../helpText/Index';

function MultiSelect (props) {
    let hasErrors = props.errors.hasErrors && props.errors.data.hasOwnProperty(props.id),
        labelClass = props.required ? 'label-required' : '',
        collapseOptions = !props.showSelectOptions ? ' hidden' : ' show',
        caretClass = props.showSelectOptions ? 'fa-caret-up' : 'fa-caret-down',
        requiredField = props.required ? "(Required)" : "";
    labelClass = props.helpText || props.helpTextAction ? labelClass + ' inline' : labelClass;
    const containerClass = hasErrors ? ' form-control-error' : '';
    return (
        <div>
            <div className={labelClass} role="presentation">{props.label} <span className="sr-only">{requiredField}</span></div>
            {(props.helpText || props.helpTextAction) &&
                <HelpText
                    id={props.id}
                    text={props.helpText}
                    action={props.helpTextAction}
                />
            }
            <div className={containerClass}>
                <div
                    tabIndex="0"
                    id={props.id}
                    className="gs-select-group multi-select btn-group"
                    role="listbox"
                    onClick={props.showSelectOptions ? props.toggleSelectOptions.bind(null, false) : props.toggleSelectOptions.bind(null, true)}
                    aria-label={props.label}
                    aria-haspopup="true"
                    aria-expanded={props.showSelectOptions}>
                        <div>
                        	{props.value && props.value.length > 0 && props.value.map( (selectedItem, itemIndex) => {
                                return (
                                    <span className="selected-item" key={itemIndex} aria-hidden="true">
                                        {selectedItem.label} <i className="fa fa-times" aria-hidden="true" onClick={props.onInputChange.bind(null, selectedItem)}></i>
                                    </span>
                                )
                            }) || <span>{props.placeholder} </span>}
                        </div>
                        <i className={'fa ' + caretClass + ' fa-fw'} aria-hidden="true"></i>
                        <ul
                            className={'select-container dropdown-menu' + collapseOptions}>
                            {props.options.map( (thisOption, optionsIndex) => {
                                let checkedValue = "";
                                {props.value && props.value.map( (selectedValue, valueIndex) => {
                                    if(selectedValue.value === thisOption.value) {
                                        checkedValue = selectedValue.checked;
                                    }
                                })}
                                return (
                                    <li
                                        className={'gs-select-options-' + props.id + '-' + optionsIndex}
                                        key={optionsIndex}
                                        //onKeyDown={props.onNavigateOptions.bind(null, optionsIndex, thisOption)}
                                        role="option">
                                            <label className="checkbox" htmlFor={'gs-select-options-' + props.id + '-' + optionsIndex}>
                                                <input
                                                    tabIndex="0"
                                                    id={'gs-select-options-' + props.id + '-' + optionsIndex}
                                                    className="option-checkbox"
                                                    type="checkbox"
                                                    checked={checkedValue}
                                                    disabled={props.disabled}
                                                    onChange={props.onInputChange.bind(null, thisOption)}
                                                /> <span className="option-label">{thisOption.label}</span>
                                            </label>
                                    </li>
                                )
                            })}
                        </ul>
                </div>
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

MultiSelect.propTypes = {
    className: PropTypes.string,
    onCheckboxClick: PropTypes.func,
    value: PropTypes.any,
    disabled: PropTypes.string,
    errors: PropTypes.object.isRequired,
    id: PropTypes.string,
    label: PropTypes.string,
    onNavigateOptions: PropTypes.func.isRequired,
    onSelectOptionsClose: PropTypes.func,
    onInputChange: PropTypes.func,
    options: PropTypes.array,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    showSelectOptions: PropTypes.bool.isRequired,
    helpTextAction: PropTypes.func
};

module.exports = MultiSelect;
