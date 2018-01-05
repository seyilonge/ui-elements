import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../Button';
import HelpText  from '../helpText/Index';
function File (props) {
    const labelClass = props.required ? ' label-required' : '',
        requiredField = props.required ? "(Required)" : "",
        errorClass = props.error.hasError & props.error.type === 'warning' ? ' alert-warning' : ' alert-error';
    return (
        <div className="gs-file-upload">
            <div className={labelClass}>
                <span>{props.label} </span>
                <HelpText
                    id={props.id}
                    text={props.helpText}
                />
            </div>
            <label htmlFor={props.id} tabIndex="0">
                <span>{props.buttonText || 'Browse'} <span className="sr-only">{requiredField}</span></span>
                <input
                    id={props.id}
                    className ={props.className}
                    disabled={props.disabled}
                    name={props.id}
                    onChange={props.onInputChange}
                    type="file"
                    tabIndex="0"
                    aria-label="Press enter to attach a file"
                    //accept={props.allowedFiles}
                />
            </label>
            {props.error.hasError &&
                <div className={'alert' + errorClass} tabIndex="0">{props.error.message}</div>
            }
            {props.value && props.value.length > 0 &&
                <div>
                    <ul>
                        {props.value.map( (thisFile, fileIndex) => {
                                return (
                                    <li
                                        key={fileIndex}
                                        tabIndex="0"
                                        aria-label={'Attachment: '+ thisFile.name +'.'}>
                                            <span>{thisFile.name}</span>
                                            <span>{'(' + thisFile.size + ')'}</span>
                                            <span className="file-upload-progress">
                                                {props.uploadProgress[fileIndex] && props.uploadProgress[fileIndex] !== "Complete" &&
                                                    <span
                                                        className="progressbar"
                                                        style={props.uploadProgress[fileIndex] === "Failed" ? {"backgroundColor":"#045aac", "width": "inherit"} : {"backgroundColor":"#045aac", "width": props.uploadProgress[fileIndex] +"%"} }>
                                                            <span>{typeof props.uploadProgress[fileIndex] === "number" ? props.uploadProgress[fileIndex] + '%' : props.uploadProgress[fileIndex]}</span>
                                                    </span>
                                                    || props.uploadProgress[fileIndex] && props.uploadProgress[fileIndex] === "Complete" &&
                                                    <span
                                                        className="progressbar"
                                                        style={ {"backgroundColor":"#045aac", "width": "100%"} }>
                                                            <span>{props.uploadProgress[fileIndex]}</span>
                                                    </span>
                                                }
                                            </span>
                                            <span
                                                onClick={props.onRemoveFile.bind(null, fileIndex)}
                                                onKeyPress={props.onRemoveFile.bind(null, fileIndex)}
                                                tabIndex="0"
                                                aria-label={'Press enter to remove attachment: '+ thisFile.name +'.'}
                                                role="button">&nbsp;
                                            </span>
                                    </li>
                                )
                            }
                        )}
                    </ul>
                </div>
            }
        </div>
    )
};

File.propTypes = {
    className: PropTypes.string,
    disabled: PropTypes.string,
    error: PropTypes.object,
    id: PropTypes.string,
    label: PropTypes.string,
    onInputChange: PropTypes.func,
    onRemoveFile: PropTypes.func,
    required: PropTypes.bool,
    uploadProgress: PropTypes.object,
    value: PropTypes.array
};

module.exports = File;
