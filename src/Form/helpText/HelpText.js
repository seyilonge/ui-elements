import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

function HelpText (props) {
    if (props.action) {
        return (<span className="help-text"><a className="fa fa-info-circle fa-fw" onClick={props.action}></a></span>)
    } else {
        return (
            <span className="help-text">
                <a
                    className={props.text !== undefined && props.text !== '' ? 'fa fa-info-circle fa-fw':'hidden'  }
                    data-tip
                    data-for={props.id + '-tooltip'}
                />
                <ReactTooltip
                    id={props.id + '-tooltip'}
                    type='info'>
                  <span>{props.text}</span>
                </ReactTooltip>
            </span>
        )
    }
};

HelpText.propTypes = {
    action: PropTypes.func,
    id: PropTypes.string,
    text: PropTypes.string
};

module.exports = HelpText;
