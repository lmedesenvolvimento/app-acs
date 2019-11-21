import React from 'react';
import PropTypes from 'prop-types';

import {
    Item,
    Input,
    Label
} from 'native-base';

import moment from '@/services/Timestamp';
import { parseToDate } from '@/helpers';

class InputDate extends React.Component {
    static propTypes = {
        default: PropTypes.any,
        onChangeValue: PropTypes.func,
        label: PropTypes.string,
        error: PropTypes.bool,
        placeholder: PropTypes.string,
        style: PropTypes.any
    }

    static maxLength = 10;

    parseToDate = parseToDate;

    constructor(props) {
        super(props);
        this.state = {
            value: '',
        };
    }

    componentDidMount() {
        const { props } = this;
        const value = props.default ? moment(props.default).format('DD/MM/YYYY') : '';
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
                    maxLength={InputDate.maxLength}
                >
                    {state.value}
                </Input>
            </Item>
        );
    }

    onChangeText = (inputValue) => {
        const { props } = this;
        const value = this.parseToDate(inputValue);

        if (value.length !== InputDate.maxLength) {
            this.setState({
                value
            });

            props.onChangeValue(null);

            return;
        }

        const valueDate = moment(value, 'DD/MM/YYYY');
        const updates = { value };

        if (valueDate.isValid()) {
            props.onChangeValue(valueDate);
        }

        this.setState(updates);
    }
}

export default InputDate;
