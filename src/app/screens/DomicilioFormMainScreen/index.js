import React, { Component } from 'react';
import {
    Header,
    Left,
    Right,
    Icon,
    Title,
    Body,
    Text,
    Button,
    ListItem,
    H1,
} from 'native-base';

import { Alert, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { findIndex, find } from 'lodash';

import shortid from 'shortid';

import DomiciliosActions from '@redux/modules/Domicilios/actions';

import SafeView from '@/components/SafeView';
import HeaderLeftButton from '@/components/HeaderLeftButton';

import MainNavigation from '@/services/MainNavigation';

import styles from './index.styl';

class DomicilioFormMainScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            model: {},
            steps: [
                {
                    key: 'Endereco',
                    title: 'Endereços',
                    completed: false,
                    model: {}
                },
                {
                    key: 'Moradia',
                    title: 'Condição de moradia',
                    completed: false,
                    model: {}
                },
                {
                    key: 'Animais',
                    title: 'Animais de estimação',
                    completed: false,
                    model: {}
                },
                {
                    key: 'Familias',
                    title: 'Famílias',
                    completed: false,
                    model: {}
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
                <H1 style={styles.heading}>
                    { props.navigation.getParam('model').logradouro_nome }
                </H1>
                <FlatList
                    data={state.steps}
                    extraData={state}
                    renderItem={this.renderItem}
                />
                <Button block primary onPress={this.onSubmit}>
                    <Text>Salvar</Text>
                </Button>
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

    createDomicilio = () => {
        const { props, state } = this;
        const { quadra_logradouro_key } = props.navigation.getParam('model');

        const model = this.mapSteps(state.steps);
        const key = shortid.generate();

        if (model) {
            const payload = Object.assign({ quadra_logradouro_key, key }, model);
            props.addDomicilios(payload);
            this.onPressBack();
        }
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

    mapSteps = () => {
        const { steps } = this.state;
        let updates = {};

        if (!find(steps, { key: 'Endereco', completed: true }).length) {
            Alert.alert('Cadastro de Domicílio', 'Endereço é obrigatório');
            return null;
        }

        if (!find(steps, { key: 'Moradia', completed: true }).length) {
            Alert.alert('Cadastro de Domicílio', 'Moradia é obrigatório');
            return null;
        }

        if (!find(steps, { key: 'Animais', completed: true }).length) {
            Alert.alert('Cadastro de Domicílio', 'Animais é obrigatório');
            return null;
        }

        steps.forEach((step) => {
            updates = Object.assign(updates, step.model);
        });

        console.log(updates);

        return updates;
    }
}

const mapStateToProps = () => {
    return {};
};

export default connect(mapStateToProps, DomiciliosActions)(DomicilioFormMainScreen);
