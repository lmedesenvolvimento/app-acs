import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { FlatList } from 'react-native';

import {
    Text,
    ListItem,
    Left,
    Right,
    Radio
} from 'native-base';

import { forEach } from 'lodash';

import styles from './index.styl';

class RadioSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: null,
            selection: []
        };
    }

    componentDidMount() {
        const { props } = this;
        const selection = [];

        let selected = null;

        if (props.isBoolean) {
            if (typeof props.default === 'boolean') {
                selected = props.default ? 'yes' : 'no';
            } else {
                selected = null;
            }
        } else {
            selected = props.default ? props.default : null;
        }

        forEach(
            props.data,
            (value, key) => selection.push({ value, key })
        );

        this.setState({ selected, selection });
    }

    render() {
        const { state } = this;
        return (
            <FlatList
                style={styles.container}
                data={state.selection}
                extraData={state}
                renderItem={this.renderButton}
            />
        );
    }

    renderButton = ({ item }) => {
        const { state } = this;
        return (
            <ListItem onPress={() => this.onSelectItem(item)} last noBorder>
                <Left>
                    <Text>{ item.value }</Text>
                </Left>
                <Right>
                    <Radio
                        selected={state.selected === item.key}
                        onPress={() => this.onSelectItem(item)}
                    />
                </Right>
            </ListItem>
        );
    }

    onSelectItem = (item) => {
        const { props } = this;
        this.setState({ selected: item.key }); // force update flatlist
        if (props.onChangeValue) props.onChangeValue(item.key);
    }

    mappingEnum = (value, key) => {
        const { state } = this;
        state.selection.push({ key, value });
    }
}

RadioSelect.propTypes = {
    data: PropTypes.object,
    default: PropTypes.object,
    onChangeValue: PropTypes.func,
    isBoolean: PropTypes.bool,
};

export default RadioSelect;
