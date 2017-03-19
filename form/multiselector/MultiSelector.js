import React, { PropTypes } from 'react';

function MultiSelector (props) {
    //console.log("MultiSelects: ", props);
    const labelClass = props.required ? 'label-required' : '',
        collapseOptions = !props.showSelectOptions ? ' hidden' : ' show';

    if(typeof props.errors.data === 'undefined' || !props.errors.data.hasOwnProperty(props.id)) {
        return (
            <div>
                <label htmlFor={props.id} className={labelClass}>{props.label}</label>
                <div
                    tabIndex="0"
                    id={props.id}
                    className="gs-select-group multi-select btn-group"
                    role="listbox"
                    onFocus={props.showOptions.bind(null, true)}
                    aria-haspopup="true"
                    aria-expanded={true}>
                        	{typeof props.value !== 'undefined' && props.value.map( (selectedItem, itemIndex) => {
                                return (<span className="selected-item" key={itemIndex} aria-hidden="true">{selectedItem.label}</span>)
                            }) || <span>{props.placeholder} </span>}
                            <b className="caret" aria-hidden="true"></b>

                        <div
                            className={'select-container dropdown-menu' + collapseOptions}
                            onBlur={props.showOptions.bind(null, false)}>
                            {props.options.map( (thisOption, optionsIndex) => {
                                return (
                                    <div className="" key={optionsIndex} role="option">

                            				<label className="checkbox">
                                                <input
                                                    type="checkbox"
                                                    checked={thisOption.checked}
                                                    disabled={props.disabled}
                                                    onChange={props.onSelectChange.bind(null, thisOption)}
                                                /> {thisOption.label}
                                            </label>

                            		</div>
                                )
                            })}
                        </div>
                </div>
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
                <div className={errorClass}>

                </div>
            </div>
        )
    }
};

MultiSelector.propTypes = {
    className: PropTypes.string,
    showError: PropTypes.bool,
    value: PropTypes.any,
    disabled: PropTypes.string,
    errors: PropTypes.object.isRequired,
    id: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string,
    onSelectChange: PropTypes.func,
    options: PropTypes.array,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    showOptions: PropTypes.func.isRequired,
    showSelectOptions: PropTypes.bool.isRequired,
    toggleErrorDisplay: PropTypes.func.isRequired
};

module.exports = MultiSelector;
