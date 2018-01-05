import React from 'react';
import PropTypes from 'prop-types';
import HelpText from './HelpText';

let Index = React.createClass({
    render: function() {
        return (
            <HelpText
                action = {this.props.action}
                id = {this.props.id}
                text = {this.props.text}
            />
        )
    }
});

Index.propTypes = {
    action: PropTypes.func,
    id: PropTypes.string,
    text: PropTypes.string
}

module.exports = Index;
