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
import LightFooter from '@/components/LightFooter';
import HeaderLeftButton from '@/components/HeaderLeftButton';

import MainNavigation from '@/services/MainNavigation';

import Colors from '@/constants/Colors';

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

    componentDidMount() {
        const { props, state } = this;
        const { navigation } = props;
        const { steps } = state;
        const model = navigation.getParam('model');

        if (navigation.getParam('action') !== 'edit') {
            return true;
        }

        steps.forEach(step => step.completed = true);

        return this.setState({ model, steps });
    }

    render() {
        const { props, state } = this;
        const model = props.navigation.getParam('model');
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
                    { model ? model.logradouro_nome : 'Indefinido' }
                </H1>
                <FlatList
                    data={state.steps}
                    extraData={state}
                    renderItem={this.renderItem}
                />
                <LightFooter>
                    <Left>
                        <Button transparent block small onPress={this.onPressBack}>
                            <Text style={{ color: Colors.textColor }}>Voltar</Text>
                        </Button>
                    </Left>
                    <Body />
                    <Right>
                        <Button transparent block small onPress={() => this.onSubmit()}>
                            <Text style={{ color: Colors.textColor }}>Salvar</Text>
                        </Button>
                    </Right>
                </LightFooter>
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

    onSubmit = () => {
        const { navigation } = this.props;
        if (navigation.getParam('action') !== 'edit') {
            return this.createDomicilio();
        }
        return this.editDomicilio();
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

    editDomicilio = () => {
        const { props, state } = this;
        const { navigation, updateDomicilios } = props;
        const { key } = navigation.getParam('model');

        const model = this.mapSteps(state.steps);

        if (model) {
            const payload = Object.assign({}, model);
            updateDomicilios(key, payload);
            navigation.getParam('onSubmit')(model);
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
        const { model } = this.state;
        const isValid = this.isStepsValid();

        if (!isValid) return null;

        return Object.assign({}, model);
    }

    isStepsValid = () => {
        const { steps } = this.state;

        const endereco = find(steps, { key: 'Endereco', completed: true });
        if (!endereco) {
            Alert.alert('Cadastro de Domicílio', 'Endereço é obrigatório');
            return false;
        }

        const moradia = find(steps, { key: 'Moradia', completed: true });
        if (!moradia) {
            Alert.alert('Cadastro de Domicílio', 'Moradia é obrigatório');
            return false;
        }

        // Opcional
        // const animais = find(steps, { key: 'Animais', completed: true });
        // if (!animais) {
        //     Alert.alert('Cadastro de Domicílio', 'Animais é obrigatório');
        //     return false;
        // }

        const familias = find(steps, { key: 'Familias', completed: true });
        if (!familias) {
            Alert.alert('Cadastro de Domicílio', 'Familias é obrigatório');
            return false;
        }

        return true;
    }
}

const mapStateToProps = ({ Domicilios }) => {
    return {
        Domicilios
    };
};


export default connect(mapStateToProps, DomiciliosActions)(DomicilioFormMainScreen);
