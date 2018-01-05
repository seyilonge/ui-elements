import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../Button';
import HelpText  from '../helpText/Index';

function FormButton (props) {
    return (
        <span>
            <Button
                {...props}
                action={props.onSubmitClick}
            />
            {props.helpText &&
                <HelpText
                    id={props.id}
                    text={props.helpText}
                />
            }
        </span>
    )
};

FormButton.propTypes = {
    onSubmitClick: PropTypes.func.isRequired
}

module.exports = FormButton;
