import React from 'react';
import PropTypes from 'prop-types';
import _isEmpty from 'lodash/isEmpty';

import Form from './Form';
import Input from './input/Index';
import Radio from './radio/Index';
import Checkbox from './checkbox/Index';
import Select from './select/Index';
import MultiSelect from './multiselect/Index';
import Textarea from './textarea/Index';
import Button from './button/Index';
import File from './file/Index';
import Download from './download/Index';

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
Index.Button = connect( mapStateToProps, mapDispatchToProps )(Button);
Index.Textarea = connect( mapStateToProps, mapDispatchToProps )(Textarea);
Index.File = connect( mapStateToProps, mapDispatchToProps )(File);
Index.Download = connect( mapStateToProps, mapDispatchToProps )(Download);

module.exports = Index;
