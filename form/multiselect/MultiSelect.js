var React = require('react');
var PropTypes = React.PropTypes;

const Select = require('react-selectize').MultiSelect;
import 'react-selectize/themes/index.css';

function MultiSelect (props) {
    //console.log("MultiSelects: ", props);
    const labelClass = props.required ? 'label-required' : '';

    if(typeof props.errors.data === 'undefined' || !props.errors.data.hasOwnProperty(props.id)) {
        return (
            <div>
                <label htmlFor={props.id} className={labelClass}>{props.label}</label>
                <Select
                    {...props}
                    onValuesChange={props.onSelectChange.bind(null, props.id)}
                />
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
                    <Select
                        {...props}
                        onValuesChange={props.onSelectChange.bind(null, props.id)}
                    />
                </div>
            </div>
        )
    }
};

MultiSelect.propTypes = {
    className: PropTypes.string,
    showError: PropTypes.bool,
    value: PropTypes.any,
    disabled: PropTypes.string,
    errors: PropTypes.object.isRequired,
    id: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string,
    onSelectChange: PropTypes.func,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    size: PropTypes.string,
    tab: PropTypes.string,
    toggleErrorDisplay: PropTypes.func.isRequired
};

module.exports = MultiSelect;
