import React from 'react';
import PropTypes from 'prop-types';

import AlertUI from './Alert';

let Alert = React.createClass({
    getInitialState: function() {
        return {
            showAlert: true
        }
    },
    handleDismissClick: function() {
        this.setState({
            showAlert: false
        });
    },
    render: function() {
        return (
            <AlertUI
                dismissible = {this.props.dismissible}
                onDismissClick = {this.handleDismissClick}
                primaryButton = {this.props.primaryButton}
                secondaryButton = {this.props.secondaryButton}
                showAlert = {this.state.showAlert}
                showSupportText = {this.props.showSupportText}
                title = {this.props.title}
                type = {this.props.type}
            >
                {this.props.children}
            </AlertUI>
        )
    }
});

Alert.propTypes = {
    dismissible: PropTypes.bool,
    primaryButton: PropTypes.object,
    secondaryButton: PropTypes.object,
    title: PropTypes.string,
    type: PropTypes.string.isRequired
}

export default Alert
