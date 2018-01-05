import React from 'react';
import PropTypes from 'prop-types';
import BreadcrumbUI from './Breadcrumb';

let Breadcrumb = React.createClass({
    render: function() {
        return (
            <BreadcrumbUI
                active = {this.props.active}
                link = {this.props.link}
                content = {this.props.children}
                external = {this.props.external}
            />
        )
    }
});

Breadcrumb.propTypes = {
    active: PropTypes.bool,
    link: PropTypes.string,
    external: PropTypes.bool
}

export default Breadcrumb;
