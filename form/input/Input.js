var React = require('react');
var PropTypes = React.PropTypes;

function Input (props) {
    //console.log("Inputs: ", props);
    //console.log("Found error", !typeof props.errors.data === 'undefined');
    const labelClass = props.required ? 'label-required' : '';
    if(typeof props.errors.data === 'undefined' || !props.errors.data.hasOwnProperty(props.id)) {
        return (
            <div>
                <label htmlFor={props.id} className={labelClass}>{props.label}</label>
                <input
                    id={props.id}
                    className ={props.className}
                    name={props.name}
                    defaultValue={props.defaultValue}
                    disabled={props.disabled}
                    onChange={props.onInputChange}
                    placeholder={props.placeholder}
                    type={props.type}
                />
            </div>
        )
    } else if (props.errors.validated) {
        const toggleDisplay = props.showError ? ' show' : '',
              errorClass = props.showError ? ' error' : '';
        //console.log("Error block:", toggleDisplay, props.errors)
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
                    <input
                        id={props.id}
                        className ={props.className + errorClass}
                        name={props.name}
                        defaultValue={props.defaultValue}
                        disabled={props.disabled}
                        onChange={props.onInputChange}
                        placeholder={props.placeholder}
                        type={props.type}
                        onFocus={props.toggleErrorDisplay.bind(null, false)}
                    />
                </span>
            </div>
        )
    }
};

Input.propTypes = {
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

module.exports = Input;
