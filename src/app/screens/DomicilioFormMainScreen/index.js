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

import SafeView from '@/components/SafeView';
import HeaderLeftButton from '@/components/HeaderLeftButton';

import MainNavigation from '@/services/MainNavigation';

class DomicilioFormMainScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            model: {
                end: {},
                cm: {},
                am: {},
                mapeamento_id: 1,
                quadra_logradouro_id: 1,
                tel_referencia: '',
                tel_residencial: '',
            },
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
                    renderItem={this.renderItem}
                />
            </SafeView>
        );
    }
    renderItem = ({ item }) => {
        return (
            <ListItem onPress={() => this.goTo(item)} last>
                <Body>
                    <Text>{item.title}</Text>
                </Body>
            </ListItem>
        );
    }
    goTo = ({ key, title }) => {
        const { props } = this;
        setTimeout(() => {
            props.navigation.navigate(key, { title });
        });
    }
    onPressBack = () => {
        MainNavigation.goBack();
    }
}

export default DomicilioFormMainScreen;
