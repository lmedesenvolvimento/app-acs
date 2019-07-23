import React, { Component } from 'react';
import { FlatList } from 'react-native';

import {
    Text,
    ListItem,
    Body,
    CheckBox
} from 'native-base';

import { cloneDeep } from 'lodash';

import Colors from '@/constants/Colors';

import styles from './index.styl';

class RadioSelectDomicilio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        };
    }

    componentDidMount() {
        const { props } = this;
        this.setState({ items: cloneDeep(props.data) });
    }

    render() {
        const { state } = this;
        return (
            <FlatList
                style={styles.container}
                data={state.items}
                extraData={state}
                renderItem={this.renderButton}
            />
        );
    }

    renderButton = ({ item, index }) => {
        return (
            <ListItem onPress={() => this.onSelectItem(item, index)} last noBorder>
                <CheckBox
                    checked={item.checked}
                    onPress={() => this.onSelectItem(item, index)}
                    color={Colors.primaryColor}
                />
                <Body>
                    <Text>{item.text}</Text>
                </Body>
            </ListItem>
        );
    }

    isSelected = (item, newKey) => {
        return item.key === newKey;
    }

    onSelectItem = (item, index) => {
        const { props, state } = this;
        const { items } = state;
        items[index].checked = !items[index].checked;

        this.setState({ items });

        if (props.onChangeValue) props.onChangeValue(items);
    }

    mappingEnum = (value, key) => {
        const { state } = this;
        state.selection.push({ key, value });
    }
}

export default RadioSelectDomicilio;
