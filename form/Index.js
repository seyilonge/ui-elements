var React = require('react');
var PropTypes = React.PropTypes;

var Form = require('./Form');
var Input = require('./input/Index');
var Radio = require('./radio/Index');
var Checkbox = require('./checkbox/Index');
var Select = require('./select/Index');
var MultiSelect = require('./multiselect/Index');
var MultiSelector = require('./multiselector/Index');
var SimpleSelect = require('./simpleselect/Index');
var Textarea = require('./textarea/Index');
var Button = require('./button/Index');

import forOwn from 'lodash/forOwn';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import store from '../../../redux/store';
import * as actions from '../../../redux/actions/Index';

function mapStateToProps( state ) {
    return {
        form: state.form,
        wizard: state.wizard
    }
}

function mapDispatchToProps( dispatch ) {
    return bindActionCreators( actions, dispatch );
}

var Index = React.createClass({
    componentDidMount: function() {
        //console.log("Form mounted.");
        //console.log("Form Object", this);
        //console.log("Store: ", store);
        //console.log("Store objects", store.getState());
        //console.log("Actions", actions);
    },
    componentWillUpdate: function() {
        //console.log("Form updating...");
    },
    componentWillUnmount: function() {
        //console.log("Form unmounting...");
    },
    render: function() {
        return (
            <Form>
                {this.props.children}
            </Form>
        )
    }
});

Index.Input = connect( mapStateToProps, mapDispatchToProps )(Input);
Index.Radio = connect( mapStateToProps, mapDispatchToProps )(Radio);
Index.Checkbox = connect( mapStateToProps, mapDispatchToProps )(Checkbox);
Index.Select = connect( mapStateToProps, mapDispatchToProps )(Select);
Index.MultiSelect = connect( mapStateToProps, mapDispatchToProps )(MultiSelect);
Index.MultiSelector = connect( mapStateToProps, mapDispatchToProps )(MultiSelector);
Index.SimpleSelect = connect( mapStateToProps, mapDispatchToProps )(SimpleSelect);
Index.Button = connect( mapStateToProps, mapDispatchToProps )(Button);
Index.Textarea = connect( mapStateToProps, mapDispatchToProps )(Textarea);

module.exports = Index;
