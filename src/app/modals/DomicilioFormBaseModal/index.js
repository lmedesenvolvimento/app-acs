import React, { Component } from 'react';
import { View, Alert } from 'react-native';

import {
    pick,
    omit,
    values,
    isObject
} from 'lodash';

import {
    convertToNumber,
    convertToPhone,
    convertToDate,
    convertToYear,
    convertToMoney
} from '@/helpers';

class DomicilioFormBaseModal extends Component {
    fields = [];
    hiddenFields = ['ready'];
    requireds = [];

    convertToDate = convertToDate
    convertToYear = convertToYear
    convertToPhone = convertToPhone
    convertToMoney = convertToMoney
    convertToNumber = convertToNumber

    constructor(props) {
        super(props);
        this.state = {
            ready: false,
            errors: {}
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

        props.navigation.getParam('onSubmit')({ ...omit(payload, ['errors']) }, props.navigation.getParam('key'));
        this.onPressBack();
    }

    jumpFocusTo = (target) => {
        const { inputs } = this;
        inputs[target]._root.focus();
        return true;
    }

    validateRequireFields = () => {
        const { state } = this;
        const errors = {};

        this.requireds.forEach((field) => {
            const key = isObject(field) ? field.name : field;
            errors[key] = {
                error: isObject(field)
                    ? this.validateRequireChildrenFields(field.children)
                    : !state[key]
            };
        });

        this.setState((prevState) => {
            return {
                errors: Object.assign({}, prevState.errors, errors)
            };
        });

        if (values(errors).filter(({ error }) => error).length) {
            return errors;
        }

        return false;
    }

    validateRequireChildrenFields = (fields) => {
        const { state } = this;
        const errors = {};

        fields.forEach((field) => {
            errors[field] = {
                error: !state[field]
            };
        });

        this.setState((prevState) => {
            return {
                errors: Object.assign({}, prevState.errors, errors)
            };
        });

        if (values(errors).filter(({ error }) => error).length) {
            return true;
        }

        return false;
    }

    hasError = (attr) => {
        const { state } = this;
        return state.errors && state.errors[attr] ? state.errors[attr].error : false;
    }
}

export default DomicilioFormBaseModal;
