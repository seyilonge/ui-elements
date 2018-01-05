import React from 'react';
import PropTypes from 'prop-types';

import './pageTitle.css';

function PageTitle (props) {

    return (
       <h2 className="page-title">{props.title}</h2>
    )
};

PageTitle.propTypes = {
    title: PropTypes.string
};

export default PageTitle;
