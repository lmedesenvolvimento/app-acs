import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import { pick, omit, values } from 'lodash';

import { convertToNumber, convertToPhone } from '@/helpers';

class DomicilioFormBaseModal extends Component {
    fields = [];
    hiddenFields = ['ready'];
    requireds = [];

    convertToNumber = convertToNumber
    convertToPhone = convertToPhone

    constructor(props) {
        super(props);
        this.state = {
            ready: false
        };
    }

    componentWillMount() {
        const { props } = this;
        const model = props.navigation.getParam('model');
        this.setState({ ...pick(model, this.fields) });
    }

    componentDidMount() {
        const { props } = this;
        props.navigation.addListener('didFocus', () => {
            this.setState({ ready: true });
        });
    }

    render() {
        return (
            <View />
        );
    }

    onPressBack = () => {
        const { props } = this;
        props.navigation.goBack();
    }

    submitForm = () => {
        const { props, state } = this;
        const payload = omit({ ...state }, this.hiddenFields);

        const errors = this.validateRequireFields();

        if (errors) {
            Alert.alert('Falha Validação', 'Algum campo obrigatório foi preenchido');
            return;
        }

        props.navigation.getParam('onSubmit')({ ...payload }, props.navigation.getParam('key'));
        props.navigation.goBack();
    }

    jumpFocusTo = (target) => {
        const { inputs } = this;
        inputs[target]._root.focus();
        return true;
    }

    validateRequireFields = () => {
        const { state } = this;
        const errors = {};

        this.requireds.forEach((key) => {
            errors[key] = { error: !state[key] };
        });

        this.setState({ errors });

        return values(errors).filter(({ error }) => error).length ? errors : false;
    }

    hasError = (attr) => {
        const { state } = this;
        return state.errors ? state.errors[attr].error : false;
    }
}

export default DomicilioFormBaseModal;
