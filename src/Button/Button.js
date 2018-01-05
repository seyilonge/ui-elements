import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './button.css'

function Button (props) {
    let icon = props.icon,
        namedClass = props.name ? props.name : "",
        buttonClass,// = props.type === "secondary" ? 'btn btn-secondary btn-sm ' + namedClass : 'btn btn-primary btn-sm ' + namedClass,
        ariaHidden
    console.log("Button Props: ", props);
    switch (props.type) {
        case 'primary':
            buttonClass = classNames('btn', 'btn-primary')
            break
        case 'secondary':
            buttonClass = classNames('btn', 'btn-secondary')
            break
        case 'info':
            buttonClass = classNames('btn', 'btn-info')
            break
        case 'success':
            buttonClass = classNames('btn', 'btn-success')
            break
        case 'warning':
            buttonClass = classNames('btn', 'btn-warning')
            break
        case 'failure':
            buttonClass = classNames('btn', 'btn-failure')
            break
        case 'default':
            buttonClass = classNames('btn', 'btn-default')
            break
        default:
            buttonClass = classNames('btn', 'btn-primary')
            break
    }

    switch (props.size) {
        case 'small':
            buttonClass = classNames(buttonClass, 'btn-sm')
            break
        case 'large':
            buttonClass = classNames(buttonClass, 'btn-lg')
            break
        case 'extra small':
            buttonClass = classNames(buttonClass, 'btn-xs')
            break
        default:
            buttonClass = classNames(buttonClass, 'btn-sm')
            break
    }
    buttonClass = classNames(buttonClass, namedClass)

    if (props.displayAsLink) {
        buttonClass = classNames(buttonClass, 'btn-link')
    }

    if (typeof props.showButton !== "undefined" && !props.showButton) {
        buttonClass = classNames(buttonClass, 'hidden')
        ariaHidden = "true"
    } else {
        buttonClass = buttonClass
        ariaHidden = "false"
    }

    //buttonClass = classNames(buttonClass, className)

    if (typeof props.iconPosition !== 'undefined' && props.iconPosition === 'right') {
        return (
            <button name={props.name} className={buttonClass} type="submit" onClick={props.action} disabled={props.disabled} aria-hidden={ariaHidden}>
                {props.label} {props.icon && <span className={props.icon} aria-hidden="true"></span>}
            </button>
        )
    } else {
        return (
            <button name={props.name} className={buttonClass} type="submit" onClick={props.action} disabled={props.disabled} aria-hidden={ariaHidden}>
                {props.icon && <span className={props.icon} aria-hidden="true"></span>} {props.label}
            </button>
        )
    }
}

Button.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string.isRequired,
    action: PropTypes.func,
    disabled: PropTypes.bool,
    displayAsLink: PropTypes.bool,
    displayInline: PropTypes.bool,
    icon: PropTypes.string,
    iconPosition: PropTypes.string,
    showButton: PropTypes.bool,
    size: PropTypes.string,
    type: PropTypes.string
}

export default Button
