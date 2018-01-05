import React from 'react';
import PropTypes from 'prop-types';
import File from './File';
import filter from 'lodash/filter';
import update from 'react-addons-update';
import { uploadFile, removeFile } from './UploadService';

let Index = React.createClass({
    getDefaultProps: function() {
        return {
            allowedFiles: 'doc, docx, gif, jpg, jpeg, txt, pdf, png, ppt, xls, xlsx, zip',
            maxByteSize: 10000000,
            maxFileCount: 5
        }
    },
    getInitialState: function() {
        return {
            error: {
                hasError: false,
                message: "",
                type: ""
            }
        }
    },
    formatFileSize: function(bytes) {
        if (typeof bytes !== 'number') {
            return '';
        }

        if (bytes >= 1000000000) {
            return (bytes / 1000000000).toFixed(2) + ' GB';
        }

        if (bytes >= 1000000) {
            return (bytes / 1000000).toFixed(2) + ' MB';
        }

        return (bytes / 1000).toFixed(2) + ' KB';
    },
    handleInputChange: function(event) {
        var targetValue = event.target.value,
            targetID = event.target.getAttribute('id'),
            targetType = event.target.getAttribute('type');

        this.setState({
            error: update(this.state.error, {hasError: {$set: false}})
        });

        const selectedFile = event.target.files[0];

        if(process.env.NODE_ENV === 'local') {
            if(this.props.form.data[this.props.id]) {
                console.log("::::::::::::::::::::::: File Upload Stats :::::::::::::::::::::::::::");
                console.log("Uploaded File Count", this.props.form.data[this.props.id].length);
                console.log("Exceeded Allowed Upload Count", this.props.form.data[this.props.id].length >= Number(this.props.maxFileCount));
                console.log("Exceeded Allowed File Size", selectedFile.size > this.props.maxByteSize);
                console.log("Acceptable File Type", selectedFile.name.indexOf('.' + this.props.allowedFiles) >= 0);
                console.log("File Type", selectedFile);
                console.log(":::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::");
            }
        }

        // Attempt file upload
        const payload = selectedFile;
        const exceededMaxSize = selectedFile.size > this.props.maxByteSize,
            acceptableFileType = selectedFile.name.indexOf('.' + this.props.allowedFiles) >= 0,
            exceededMaxCount = this.props.form.data[this.props.id] ? this.props.form.data[this.props.id].length >= Number(this.props.maxFileCount) : false,
            fileIndex = this.props.form.data[this.props.id] ? Number(this.props.form.data[this.props.id].length) : 0;

        if(this.props.url && !exceededMaxSize && !exceededMaxCount && acceptableFileType) {
            // ::: Start Added block :::
            const previousFileData = this.props.form.data[this.props.id];
            let fileData = [];

            if (typeof previousFileData === 'undefined') {
                fileData.push({
                    file : selectedFile,
                    name : selectedFile.name,
                    size : this.formatFileSize(selectedFile.size),
                    uploadProgress : "Pending..."
                });
            } else {
                fileData = [
                    ...this.props.form.data[this.props.id],
                    {
                        file : selectedFile,
                        name : selectedFile.name,
                        size : this.formatFileSize(selectedFile.size),
                        uploadProgress : "Pending..."
                    }
                ];
            }

            this.props.updateFormData(targetID, fileData);
            // ::: End Added block :::

            this.props.updateFormData("uploadProgress", {
                ...this.props.form.data.uploadProgress,
                [fileIndex]: 'Pending...'
            });
            uploadFile(fileIndex, this.props.url, payload, this.props.updateFormData, this.props.form.data.uploadProgress)
                .then(function(response) {
                    const responseObj = response.data;
                    if (responseObj.status === 'success') {
                        this.props.form.data[this.props.id][fileIndex].fileID = responseObj.data;
                        this.props.form.data[this.props.id][fileIndex].uploadProgress = "Complete";
                    } else {
                        delete this.props.form.data[this.props.id];
                        this.props.form.data[this.props.id][fileIndex].uploadProgress = "Failed";
                    }
                }.bind(this));
        } else if (exceededMaxCount) {
            const error = this.state.error;
            error.hasError = true;
            error.type = "warning";
            error.message = "You have reached the maximum number of file uploads. You are allowed a maximum of " + this.props.maxFileCount + " file(s).";

            this.setState({
                error: error
            });

        } else if (exceededMaxSize) {
            const error = this.state.error;
            error.hasError = true;
            error.type = "warning";
            error.message = "Your file exceeds the maximum allowed size of " + this.formatFileSize(this.props.maxByteSize) + ".";

            this.setState({
                error: error
            });
        } else if (!acceptableFileType) {
            const error = this.state.error;
            error.hasError = true;
            error.type = "warning";
            error.message = "You selected a file type that is not allowed. You can only upload  " + this.props.allowedFiles + ".";

            this.setState({
                error: error
            });
        }

        if(!exceededMaxSize && !exceededMaxCount && acceptableFileType) {
            if(this.props.onInputChange) {
                this.props.onInputChange(event);
            }
        }
    },
    handleRemoveFile: function(index) {
        let selectedFiles = this.props.form.data[this.props.id];
        const fileID = selectedFiles[index].fileID;
        if(typeof fileID !== 'undefined') {
            // Make call to service to delete file
            removeFile(fileID, this.props.form.data.requestNumber, this.props.url)
                .then(function(response) {
                    const responseObj = response.data;
                    if (responseObj.status === 'success') {

                    } else {

                    }
                }.bind(this));
        }
        selectedFiles = filter( selectedFiles, (selectedFile) => {
            return selectedFile !== this.props.form.data[this.props.id][index]
        })
        this.props.updateFormData(this.props.id, selectedFiles);
    },
    render: function() {
        return (
            <File
                id={this.props.id}
                className = {this.props.className}
                allowedFiles = {this.props.allowedFiles}
                buttonText = {this.props.buttonText}
                error = {this.state.error}
                maxByteSize = {this.props.maxByteSize}
                maxFileCount = {this.props.maxFileCount}
                disabled = {this.props.disabled}
                label = {this.props.label}
                value = {this.props.value ? this.props.value : this.props.form.data[this.props.id]}
                onInputChange = {this.handleInputChange}
                onRemoveFile = {this.handleRemoveFile}
                required = {this.props.required}
                uploadProgress = {this.props.form.data.uploadProgress}
                value = {this.props.form.data[this.props.id]}
                helpText = {this.props.helpText}
            />
        )
    }
});

Index.propTypes = {
    id: PropTypes.string.isRequired,
    allowedFiles: PropTypes.string,
    buttonText: PropTypes.string,
    className: PropTypes.string,
    maxByteSize: PropTypes.number,
    maxFileCount: PropTypes.number,
    onInputChange: PropTypes.func,
    required: PropTypes.bool,
    url: PropTypes.string,
    value: PropTypes.array
}

module.exports = Index;
