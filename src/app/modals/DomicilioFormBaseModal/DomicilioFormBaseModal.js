import React, { Component } from 'react';
import { View, Alert } from 'react-native';

import {
    pick,
    omit,
    values,
    isObject,
    isBoolean
} from 'lodash';

import {
    convertToNumber,
    convertToPhone,
    convertToDate,
    convertToYear,
    convertToMonthYear,
    convertToTimestamp,
    convertToMoney,
    convertToHeight,
    convertToWeight,
    convertToCPF
} from '@/helpers';

class DomicilioFormBaseModal extends Component {
    fields = [];
    hiddenFields = ['ready'];
    requireds = [];

    convertToDate = convertToDate
    convertToYear = convertToYear
    convertToMonthYear = convertToMonthYear
    convertToTimestamp = convertToTimestamp
    convertToPhone = convertToPhone
    convertToMoney = convertToMoney
    convertToNumber = convertToNumber
    convertToHeight = convertToHeight
    convertToWeight = convertToWeight
    convertToCPF = convertToCPF

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
                    : this.isInvalidField(state, key)
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
                error: this.isInvalidField(state, field)
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

    isInvalidField = (state, field) => {
        const value = state[field];

        // eslint-disable-next-line no-extra-boolean-cast
        if (isBoolean(value)) {
            return false;
        }

        return !state[field];
    }
}

export default DomicilioFormBaseModal;
