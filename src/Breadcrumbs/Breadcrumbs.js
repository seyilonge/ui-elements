import React from 'react';
import PropTypes from 'prop-types';

// Stylesheet include
import './breadcrumbs.css';

function Breadcrumbs (props) {
    return (
        <ol className="breadcrumb">
            {props.children}
        </ol>
    )
};

export default Breadcrumbs;
