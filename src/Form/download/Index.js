import React from 'react';
import PropTypes from 'prop-types';

import Download from './Download';

import { getFile } from './DownloadService';

let Index = React.createClass({
    getDefaultProps: function() {
        return {
            index: 0
        }
    },
    handleDownloadClick: function(e) {
        e.preventDefault();
        let targetLink = e.target.children[0];

        if(typeof this.props.form.data.downloadProgress === "undefined") {
            const downloadStatus = { [this.props.index]: "Downloading..." };
            this.props.updateFormData("downloadProgress", downloadStatus);
        } else {
            this.props.updateFormData("downloadProgress", {
                ...this.props.form.data.downloadProgress,
                [this.props.index]: 'Downloading...'
            });
        };

        getFile(this.props.index, this.props.url, this.props.updateFormData, this.props.form.data.downloadProgress)
        .then( (response) => {
            const dataFile = JSON.stringify(response.data),
                fileBlob = new Blob([dataFile], {type: 'application/octet-stream'});

            if (typeof window.navigator.msSaveBlob !== 'undefined') {
               window.navigator.msSaveBlob(fileBlob, this.props.fileName);
           } else {
               const fileURL = window.URL.createObjectURL(fileBlob),
                    ghostLink = document.createElement('a');

               ghostLink.href = fileURL;
               ghostLink.download = this.props.fileName;
               ghostLink.target = "_blank";
               document.body.appendChild(ghostLink);
               ghostLink.click();
               document.body.removeChild(ghostLink);
               window.URL.revokeObjectURL(fileURL);
            }
            if(process.env.NODE_ENV === 'local') {
                console.log("Downloaded File", fileBlob.type, fileBlob.size, fileBlob);
            }

        });


    },
    render: function() {
        return (
            <Download
                displayType = {this.props.displayType ? this.props.displayType : "link"}
                fileName = {this.props.fileName}
                index = {this.props.index}
                onDownloadClick = {this.handleDownloadClick}
            />
        )
    }
});

Index.propTypes = {
    displayType: PropTypes.string,
    fileName: PropTypes.string.isRequired,
    index: PropTypes.number,
    url: PropTypes.string.isRequired,
};

module.exports = Index;
