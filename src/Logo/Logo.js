import React from 'react';
import './logo.css';
import logo from '../../assets/images/gs_logo.svg'

function Logo () {
    return (
        <div className="gs-logo" aria-hidden="true">
            <img src={logo} alt="Grant Solutions" />
        </div>
    )
};

export default Logo;
