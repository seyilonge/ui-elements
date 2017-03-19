var React = require('react');

function Loader () {
    return (
        <div className="gs-loader">
            <div><img src="../../images/gs-loader1.gif" /></div>
            <div className="text-tag">Loading...</div>
        </div>
    )
};

module.exports = Loader;