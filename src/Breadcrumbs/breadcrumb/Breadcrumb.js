import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';

function Breadcrumb (props) {
    if (!props.active) {
        return (
            <li>
                {!props.external &&
                    <Link to={props.link}>{props.content}</Link> ||
                    <a href={props.link}>{props.content}</a>
                }
            </li>
        )
    } else {
        return <li className="active">{props.content}</li>
    }
};

Breadcrumb.propTypes = {
    active: PropTypes.bool,
    content: PropTypes.any,
    link: PropTypes.string,
    external: PropTypes.bool
}

export default Breadcrumb;
