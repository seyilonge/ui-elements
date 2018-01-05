import React from 'react';
import './loader.css';

function Loader () {
    return (
        <div className="gs-loader">
            <div><i className="fa fa-spinner fa-spin"></i></div>
            <div className="text-tag">Loading</div>
        </div>
    )
};

export default Loader;
