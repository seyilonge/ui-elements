var React = require('react');
var PropTypes = React.PropTypes;

function Radio (props) {
    //console.log("Radios: ", props);
    const labelClass = props.required ? ' label-required' : '';
    if(typeof props.errors.data === 'undefined' || !props.errors.data.hasOwnProperty(props.id)) {
        return (
            <div>
                <div id={props.id} className={'gs-legend' + labelClass}>{props.label}</div>
                {props.items.map( (thisItem, index) => {
                    return (
                        <span className="gs-input" key={index}>
                            <input
                                id={props.id + index}
                                type="radio"
                                name={props.id}
                                value={thisItem.value}
                                disabled={props.disabled}
                                defaultChecked={props.defaultValue === thisItem.value ? true : false}
                                onChange={props.onInputChange}
                            />
                            <label
                                className="gs-label-overide"
                                htmlFor={props.id + index}
                                aria-labelledby={props.id}>{thisItem.label} &nbsp;
                            </label>
                        </span>
                    )
                })}
            </div>
        )
    } else if (props.errors.validated) {
        const toggleDisplay = props.showError ? ' show' : '',
              errorClass = props.showError ? 'form-control-error' : '';
        return (
            <div className="gs-input">
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
                <div>
                    <div className={'gs-legend' + labelClass} role="legend">{props.label}</div>
                </div>
                <span className={errorClass}>
                    {props.items.map( (thisItem, index) => {
                        return (
                            <span className="gs-input" key={index}>
                                <input
                                    id={props.id + index}
                                    type="radio"
                                    name={props.id}
                                    value={thisItem.value}
                                    disabled={props.disabled}
                                    defaultChecked={props.defaultValue === thisItem.value ? true : false}
                                    onChange={props.onInputChange}
                                />
                                <label className="gs-label-overide" htmlFor={props.id} className={labelClass}>{thisItem.label} &nbsp;</label>
                            </span>
                        )
                    })}
                </span>
            </div>
        )
    }
};

Radio.propTypes = {
    defaultValue: PropTypes.any,
    disabled: PropTypes.string,
    errors: PropTypes.object.isRequired,
    id: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string,
    onInputChange: PropTypes.func,
    required: PropTypes.bool,
    showError: PropTypes.bool,
    toggleErrorDisplay: PropTypes.func.isRequired
};

module.exports = Radio;
