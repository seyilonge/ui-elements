import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button'

import './alert.css';

function Alert (props) {
    const showAlertClass = props.showAlert ? '' : 'hidden',
        showButtonContainer = props.primaryButton || props.secondaryButton ? true : false;
    let alertClass = "";
    console.log("Alert Props: ", props);
    switch (props.type) {
        case 'success':
            alertClass = ' alert-success';
            break;
        case 'warning':
            alertClass = ' alert-warning';
            break;
        case 'failure':
            alertClass = ' alert-danger';
            break;
        case 'info':
            alertClass = ' alert-info';
            break;
        default:
            alertClass = ' alert-danger';
            break;
    }
    alertClass = props.dismissible ? alertClass + ' dismissible' : alertClass;
    return (
        <div className={showAlertClass}>
            {props.showAlert &&
                <div className={'gs-alert alert' + alertClass} role="alert">
                    {props.dismissible &&
                        <button type="button" className="alert-dismiss close" onClick={props.onDismissClick} aria-label="Close">
                            <span aria-hidden="true">X</span>
                        </button>
                    }
                    <div className="row content-container">
                        <div className="col-sm-3 alert-title">
                            {props.title &&
                                <h4>{props.title}</h4>
                            }
                        </div>
                        <div className="col-sm-9 alert-content">
                            {props.children}
                            {props.showSupportText &&
                                <p className="support-text">
                                    Should you have any additional questions, please contact the help desk at <a href="mailto:help@grantsolutions.gov">help@grantsolutions.gov</a>.
                                </p>
                            }
                        </div>
                        {showButtonContainer &&
                            <div className="col-xs-12 alert-buttons text-center">
                                {props.primaryButton &&
                                    <Button
                                        {...props.primaryButton}
                                        type={props.type}
                                    />
                                }
                                {props.secondaryButton &&
                                    <Button
                                        {...props.secondaryButton}
                                        type="default"
                                    />
                                }
                            </div>
                        }
                    </div>
                </div>
            }
        </div>
    )
}

Alert.propTypes = {
    dismissible: PropTypes.bool,
    onDismissClick: PropTypes.func,
    primaryButton: PropTypes.object,
    secondaryButton: PropTypes.object,
    showAlert: PropTypes.bool,
    showSupportText: PropTypes.bool,
    title: PropTypes.string,
    type: PropTypes.string.isRequired
};

export default Alert;
