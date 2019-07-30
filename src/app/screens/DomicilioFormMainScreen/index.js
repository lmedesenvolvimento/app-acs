import React, { Component } from 'react';
import {
    Header,
    Left,
    Right,
    Icon,
    Title,
    Body,
    Text,
    ListItem,
} from 'native-base';

import { FlatList } from 'react-native';

import { findIndex } from 'lodash';

import SafeView from '@/components/SafeView';
import HeaderLeftButton from '@/components/HeaderLeftButton';

import MainNavigation from '@/services/MainNavigation';

class DomicilioFormMainScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            model: {},
            steps: [
                {
                    key: 'Endereco',
                    title: 'Endereços',
                    completed: false
                },
                {
                    key: 'Moradia',
                    title: 'Condição de moradia',
                    completed: false
                },
                {
                    key: 'Animais',
                    title: 'Animais de estimação',
                    completed: false
                },
                {
                    key: 'Familias',
                    title: 'Famílias',
                    completed: false
                },
            ]
        };
    }

    render() {
        const { props, state } = this;
        return (
            <SafeView navigation={props.navigation} isModal={true}>
                <Header noShadow>
                    <Left>
                        <HeaderLeftButton icon onPress={() => this.onPressBack()}>
                            <Icon name="ios-arrow-back" />
                        </HeaderLeftButton>
                    </Left>
                    <Body>
                        <Title>Cadastro Domiciliar</Title>
                    </Body>
                    <Right />
                </Header>
                <FlatList
                    data={state.steps}
                    extraData={state}
                    renderItem={this.renderItem}
                />
            </SafeView>
        );
    }

    renderItem = ({ item }) => {
        return (
            <ListItem icon onPress={() => this.goTo(item)} last>
                <Left>
                    { item.completed ? <Icon name="ios-checkmark" /> : null }
                </Left>
                <Body>
                    <Text>{item.title}</Text>
                </Body>
            </ListItem>
        );
    }

    goTo = ({ key, title }) => {
        const { props, state } = this;
        setTimeout(() => {
            props.navigation.navigate(key, {
                title,
                key,
                model: state.model,
                onSubmit: this.mergeData
            });
        });
    }

    onPressBack = () => {
        MainNavigation.goBack();
    }

    mergeData = (newData, key) => {
        const { model } = this.state;
        const updates = Object.assign({}, model, newData);
        this.completeStep(updates, key);
    }

    completeStep = (model, key) => {
        const { steps } = this.state;
        const index = findIndex(steps, { key });
        steps[index].completed = true;
        this.setState({ model, steps });
    }
}

export default DomicilioFormMainScreen;
