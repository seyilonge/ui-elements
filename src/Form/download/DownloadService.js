import Raven from 'raven-js';
import update from 'react-addons-update';
import serviceConfig from '../../../../services/Config';

export function getFile(index, url, updateFormData, downloadProgress) {

    let config = {
        onDownloadProgress: function(progressEvent) {
          let percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
          updateFormData("downloadProgress", {
              ...downloadProgress,
              [index]: percentCompleted
          });
          if(process.env.NODE_ENV === 'local') {
              console.log("Progress " + index, progressEvent.loaded, progressEvent.total, percentCompleted);
          }
      }
    };

    //serviceConfig.axios.defaults.headers.get['Content-Type'] = 'application/vnd.ms-excel';
    //serviceConfig.axios.defaults.headers.get['Content-Disposition'] = 'attachment;filename=download.pdf';
    //serviceConfig.axios.defaults.headers.get['Accept'] = 'text/html,application/xhtml+xml,application/xml';

    return serviceConfig.axios.get(url, config)
    .then( function( response ) {
        updateFormData("downloadProgress", {
            ...downloadProgress,
            [index]: "Complete"
        });
        const responseObj = {
            data: {
                data: response.data,
                status: "success"
            }
        }
        return responseObj;
    }).catch( function( error ) {
        updateFormData("downloadProgress", {
            ...downloadProgress,
            [index]: "Failed"
        });
        const errorObj = {
            data: {
                data: {},
                status: "failure",
                message: "An error occured during file upload, please try again later."
            }
        }

        updateFormData("downloadProgress", {
            ...downloadProgress,
            [index]: 'Failed'
        });

        if(process.env.NODE_ENV === 'local') {
            console.log("Message: getFile failed during rest service call.");
            console.log(error);
        }

        Raven.captureException(error);
        return errorObj;
    })
}
