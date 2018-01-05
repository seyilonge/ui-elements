import React from 'react';
import PropTypes from 'prop-types';
// Stylesheet includes
import '../stylesheets/form.css';

function Form (props) {
    return (
        <form id="gs-form" className="gs-form-container" noValidate>
            {props.children}
        </form>
    )
};

module.exports = Form;
