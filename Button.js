import React from 'react';
const PropTypes = React.PropTypes;

// Stylesheet includes
import '../../stylesheets/base/button.css';

function Button (props) {
    let icon = props.icon,
        buttonClass = 'btn btn-primary btn-sm ' + props.name,
        ariaHidden;

    if ( typeof props.showButton === 'undefined' || props.showButton ) {
        buttonClass = buttonClass;
        ariaHidden = "false";
    } else if ( !props.showButton ) {
        buttonClass = buttonClass + ' hidden';
        ariaHidden = "true";
    }

    if (typeof props.iconPosition !== 'undefined' && props.iconPosition === 'right') {
        return (
            <button className={buttonClass} type="submit" onClick={props.action} aria-hidden={ariaHidden}>
                {props.label} <span className={props.icon}></span>
            </button>
        )
    } else {
        return (
            <button className={buttonClass} type="submit" onClick={props.action} aria-hidden={ariaHidden}>
                <span className={props.icon}></span> {props.label}
            </button>
        )
    }
};

Button.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string.isRequired,
    action: PropTypes.func,
    displayInline: PropTypes.bool,
    icon: PropTypes.string,
    iconPosition: PropTypes.string,
    showButton: PropTypes.bool
}

module.exports = Button;
