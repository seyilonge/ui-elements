const React = require('react');
const PropTypes = React.PropTypes;

import Button from '../../Button';

function FormButton (props) {
    //console.log("Buttons: ", props);
    return (
        <span>
            <Button
                {...props}
                action={props.onSubmitClick}
            />
        </span>
    )
};

FormButton.propTypes = {
    onSubmitClick: PropTypes.func.isRequired
}

module.exports = FormButton;
