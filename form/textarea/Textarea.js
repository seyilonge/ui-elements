var React = require('react');
var PropTypes = React.PropTypes;

function Textarea (props) {
    //console.log("Textarea: ", props);
    //console.log("Found error", typeof props.errors.data === 'undefined');
    const labelClass = props.required ? 'label-required' : '';
    if(typeof props.errors.data === 'undefined' || !props.errors.data.hasOwnProperty(props.id)) {
        return (
            <div>
                <label htmlFor={props.id} className={labelClass}>{props.label}</label>
                <textarea
                    id={props.id}
                    className ={props.className}
                    cols={props.cols}
                    defaultValue={props.defaultValue}
                    disabled={props.disabled}
                    onChange={props.onInputChange}
                    rows={props.rows}
                >
                </textarea>
            </div>
        )
    } else {
        const toggleDisplay = props.showError ? ' show' : '',
              errorClass = props.showError ? ' error' : '';
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
                    <textarea
                        id={props.id}
                        className ={props.className}
                        cols={props.cols}
                        defaultValue={props.defaultValue}
                        disabled={props.disabled}
                        onFocus={props.toggleErrorDisplay.bind(null, false)}
                        onChange={props.onInputChange}
                        rows={props.rows}
                    >
                    </textarea>
                </span>
            </div>
        )
    }
};

Textarea.propTypes = {
    className: PropTypes.string,
    cols: PropTypes.string,
    defaultValue: PropTypes.any,
    disabled: PropTypes.string,
    errors: PropTypes.object.isRequired,
    id: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string,
    onInputChange: PropTypes.func,
    required: PropTypes.bool,
    rows: PropTypes.string,
    showError: PropTypes.bool,
    toggleErrorDisplay: PropTypes.func.isRequired
};

module.exports = Textarea;
