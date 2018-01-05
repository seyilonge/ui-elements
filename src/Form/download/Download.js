import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../Button';

function Download (props) {
    if(props.displayType === "link") {
        return (
            <span className="download" onClick={props.onDownloadClick}>
                {props.fileName}
                <a id={'downloader' + props.index} className="hidden" onClick={()=>{return true;}}></a>
            </span>
        )
    } else if (props.displayType === "button") {
        return (
            <Button
                name={'downloader-' + props.index}
                action={props.onDownloadClick}
                label={props.fileName}
            />
        )
    }
}

Download.propTypes = {
    fileName: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    onDownloadClick: PropTypes.func.isRequired
};

module.exports = Download;
