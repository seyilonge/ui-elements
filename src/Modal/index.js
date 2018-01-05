import React from 'react';
import PropTypes from 'prop-types';
import ModalUI from './Modal';

let Modal = React.createClass({
    render: function() {
        return (
            <ModalUI
                {...this.props}
            >
                {this.props.children}
            </ModalUI>
        )
    }
})

export default Modal;
