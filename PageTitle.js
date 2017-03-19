import React, { PropTypes } from 'react';
import Logo from './Logo';

function PageTitle (props) {
    var leftContentClass = props.leftContentClass === undefined ? '' : props.leftContentClass,
        rightContentClass = props.rightContentClass === undefined ? '' : props.rightContentClass;
    return (
        <div className="row page-title">
            <div className="col-md-4 left-content">
                <span className={leftContentClass}><Logo /> {props.leftContent}</span>
            </div>
            <div className="col-md-8 right-content">
                <span className={rightContentClass}>{props.rightContent}</span>
            </div>
        </div>
    )
};

PageTitle.propTypes = {
    leftContent: PropTypes.string,
    leftContentClass: PropTypes.string,
    rightContent: PropTypes.string,
    rightContentClass: PropTypes.string
};

module.exports = PageTitle;
