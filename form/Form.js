import React, { PropTypes } from 'react';
// Stylesheet includes
import '../stylesheets/form.css';

function Form (props) {
    //var formInputs = props.children.getElementsByName("input");
    //console.log('Inputs: ', formInputs);
    //console.log('Form Children: ', props)
    return (
        <form id="gs-form" className="gs-form-container" noValidate>
            {props.children}
        </form>
    )
};

module.exports = Form;
