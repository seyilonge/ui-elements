var React = require('react');
var PropTypes = React.PropTypes;

function Form (props) {
    //var formInputs = props.children.getElementsByName("input");
    //console.log('Inputs: ', formInputs);
    //console.log('Form Children: ', props)
    return (
        <form id="gs-form" className="gs-form-container" noValidate>
            {props.children}
        </form>
    )
};

module.exports = Form;
