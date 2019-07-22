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

class RadioSelectDomicilio extends Component {
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

        forEach(
            props.data,
            (value, key) => selection.push({ value, key })
        );

        this.setState({ selected: props.default, selection });
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
            <ListItem onPress={() => this.onSelectItem(item)}>
                <Left>
                    <Text>{ item.value }</Text>
                </Left>
                <Right>
                    <Radio selected={state.selected === item.key} onPress={() => this.onSelectItem(item)} />
                </Right>
            </ListItem>
        );
    }

    isSelected = (item, newKey) => {
        return item.key === newKey;
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

export default RadioSelectDomicilio;
