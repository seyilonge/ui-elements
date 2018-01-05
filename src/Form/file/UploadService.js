import axios from 'axios';
import Raven from 'raven-js';
import update from 'react-addons-update';
import config from '../../../../services/Config';

export function uploadFile(index, url, attachedFile, updateFormData, uploadProgress) {
    if(process.env.NODE_ENV === 'local') {
        console.log("Uploading file...", index, url, attachedFile, updateFormData);
    }
    let payload = new FormData();
    if(attachedFile) {
        payload.append('file', attachedFile, attachedFile.name);
    }

    let config = {
        onUploadProgress: function(progressEvent) {
          let percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
          updateFormData("uploadProgress", {
              ...uploadProgress,
              [index]: percentCompleted
          });
          if(process.env.NODE_ENV === 'local') {
              console.log("Progress " + index, percentCompleted);
          }
        }
    };

    return axios.post(url, payload, config)
    .then( function( response ) {
        if(process.env.NODE_ENV === 'local') {
            console.log("Response", response);
        }
        //console.log("Upload for File " + index + " complete!", uploadProgress[index]);
        updateFormData("uploadProgress", {
            ...uploadProgress,
            [index]: "Complete"
        });
        //console.log("Check for File " + index + " complete!", uploadProgress[index]);
        const responseObj = {
            data: {
                data: response.data,
                status: "success"
            }
        }
        return responseObj;
    }).catch( function( error ) {
        updateFormData("uploadProgress", {
            ...uploadProgress,
            [index]: "Failed"
        });
        const errorObj = {
            data: {
                data: {},
                status: "failure",
                message: "An error occured during file upload, please try again later."
            }
        }

        updateFormData("uploadProgress", {
            ...uploadProgress,
            [index]: 'Failed'
        });

        if(process.env.NODE_ENV === 'local') {
            console.log("Message: uploadFile failed during rest service call.");
            console.log(error);
        }

        Raven.captureException(error);
        return errorObj;
    })
}

export function removeFile(fileID, requestNumber, url) {

    return axios.delete(
        config.baseURL +  config.basePath + '/document/' + requestNumber +'/'+ fileID, {
    }).then( function( response ) {
        const data = response.data;
        const responseObj = {
            data: {
                data: data.data,
                status: data.status
            }
        }
        return responseObj;
    }).catch( function( error ) {
        const errorObj = {
            data: {
                data: {},
                status: "failure",
                message: "An error occured while trying to fulfill your request, please try again later."
            }
        }

        if(process.env.NODE_ENV === 'local') {
            console.log("Message: removeFile failed during rest service call.");
            console.log(error);
        }

        Raven.captureException(error);
        return errorObj;
    })
}
