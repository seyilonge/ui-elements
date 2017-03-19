import React, { PropTypes } from 'react';

function Headline (props) {
    return (
        <p className="headline">{props.text}</p>
    )
};

Headline.propTypes = {
    text: PropTypes.string
};

module.exports = Headline;
