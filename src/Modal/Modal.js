import React from 'react';
import PropTypes from 'prop-types';
import TGModal from 'tg-modal';
import './modal.css';

function Modal (props) {
    let modalClassAddIn = !props.showModal ? ' hidden' : '';
    return (
        <div className="gs-modal">
            <TGModal {...props}>
                {props.children}
            </TGModal>
        </div>
    )
}

Modal.propTypes = {
    onCancel: PropTypes.func,
    isOpen: PropTypes.bool,
    autoWrap: PropTypes.bool,
};

export default Modal;
