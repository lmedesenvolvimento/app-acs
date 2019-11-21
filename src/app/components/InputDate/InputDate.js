import React from 'react';
import PropTypes from 'prop-types';

import {
    Item,
    Input,
    Label
} from 'native-base';

import moment from '@/services/Timestamp';
import { parseToDate } from '@/helpers';

/**
 * @prop {boolean} error
 */

class InputDate extends React.Component {
    static maxLength = 10;
    static types = {
        default: 'default',
        monthYear: 'month-year'
    }

    parseToDate = parseToDate;

    constructor(props) {
        super(props);
        this.state = {
            value: '',
        };
    }

    componentDidMount() {
        const { props } = this;
        let value = '';

        if (props.default && moment(props.default).isValid()) {
            value = this.formatDate(props.default);
        }

        this.setState({ value });
    }

    render() {
        const { props, state } = this;
        return (
            <Item
                style={props.styles}
                error={props.error}
                stackedLabel
            >
                <Label>{props.label}</Label>
                <Input
                    keyboardType="numeric"
                    onChangeText={this.onChangeText}
                    placeholder={props.placeholder}
                    maxLength={props.maxLength || InputDate.maxLength}
                >
                    {state.value}
                </Input>
            </Item>
        );
    }

    formatDate = (inputValue) => {
        const { props } = this;
        switch (props.types) {
        case InputDate.types.monthYear:
            return moment(inputValue).format('MM/YYYY');
        default:
            return moment(inputValue).format('DD/MM/YYYY');
        }
    }

    onChangeText = (inputValue) => {
        const { props } = this;
        const maxLength = props.maxLength || InputDate.maxLength;

        let value = null;
        let valueDate = null;

        switch (props.type) {
        case InputDate.types.monthYear:
            value = this.parseToDate(inputValue, '00/0000');
            break;
        default:
            value = this.parseToDate(inputValue);
            break;
        }

        if (value.length !== maxLength) {
            this.setState({
                value
            });

            props.onChangeValue(null);

            return;
        }

        switch (props.types) {
        case InputDate.types.monthYear:
            valueDate = moment(value, 'MM/YYYY');
            break;
        default:
            valueDate = moment(value, 'DD/MM/YYYY');
            break;
        }

        const updates = { value };

        if (valueDate.isValid()) {
            props.onChangeValue(valueDate);
        }

        this.setState(updates);
    }
}

InputDate.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    error: PropTypes.bool,
    maxLength: PropTypes.number,
    default: PropTypes.any,
    style: PropTypes.any,
    onChangeValue: PropTypes.func,
};

export default InputDate;
