import React from 'react';
import PropTypes from 'prop-types';

import BreadcrumbsUI from './Breadcrumbs';
import Breadcrumb from './breadcrumb/Index';

let Breadcrumbs = React.createClass({
    render: function() {
        return (
            <BreadcrumbsUI>
                {this.props.children}
            </BreadcrumbsUI>
        )
    }
});

Breadcrumbs.Crumb = Breadcrumb;

export default Breadcrumbs;
