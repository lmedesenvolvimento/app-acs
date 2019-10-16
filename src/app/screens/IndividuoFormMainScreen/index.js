import React, { useState } from 'react';
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

const IndividuoMainScreen = (props) => {
    const { navigation } = props;
    const _model = navigation.getParam('model');
    const _steps = [
        {
            key: 'IndividuoIDUsuario',
            title: 'Indentificação do usuário / cidadão',
            completed: false,
            model: {}
        },
        {
            key: 'IndividuoInfoSocio',
            title: 'Informações sociodemográficas',
            completed: false,
            model: {}
        },
        {
            key: 'IndividuoSaidaCadastro',
            title: 'Saída do cidadão do cadastro',
            completed: false,
            model: {}
        },
        {
            key: 'CondicaoSaude',
            title: 'Condições / situações de saúde',
            completed: false,
            model: {}
        },
        {
            key: 'SituacaoRua',
            title: 'Cidadão em situação de rua',
            completed: false,
            model: {}
        },
    ];

    const [model, setModel] = useState(_model);
    const [steps, setSteps] = useState(
        navigation.getParam('action') !== 'edit'
            ? _steps
            : _steps.map(completeSteps)
    );

    const renderItem = ({ item }) => {
        return (
            <ListItem icon onPress={() => goTo(item)} last>
                <Left>
                    {item.completed ? <Icon name="ios-checkmark" /> : null}
                </Left>
                <Body>
                    <Text>{item.title}</Text>
                </Body>
            </ListItem>
        );
    };

    const goTo = ({ key, title }) => {
        setTimeout(() => {
            navigation.navigate(key, {
                title,
                key,
                model,
                onSubmit: mergeData
            });
        });
    };

    const onPressBack = () => {
        MainNavigation.goBack();
    };

    const onSubmit = () => {
        if (navigation.getParam('action') !== 'edit') {
            return createDomicilio();
        }
        return editDomicilio();
    };

    const createDomicilio = () => {
        const { quadra_logradouro_key } = navigation.getParam('model');

        const result = mapSteps(steps);
        const key = shortid.generate();

        if (_model) {
            const payload = Object.assign({ quadra_logradouro_key, key }, result);
            props.addDomicilios(payload);
            onPressBack();
        }
    };

    const editDomicilio = () => {
        const { key } = navigation.getParam('model');
        const result = mapSteps(steps);

        if (model) {
            const payload = Object.assign({}, result);
            props.updateDomicilios(key, payload);
            navigation.getParam('onSubmit')(model);
            onPressBack();
        }
    };

    const mergeData = (newData, key) => {
        const updates = Object.assign({}, model, newData);
        completeStep(updates, key);
    };

    const completeStep = (data, key) => {
        const index = findIndex(steps, { key });
        steps[index].completed = true;
        setSteps(steps);
        setModel(data);
    };

    const mapSteps = () => {
        const isValid = isStepsValid();
        if (!isValid) return null;
        return Object.assign({}, model);
    };

    const isStepsValid = () => {
        const endereco = find(steps, { key: 'IndividuoIDUsuario', completed: true });
        if (!endereco) {
            Alert.alert('Cadastro de Indivíduo', 'Indentificação do usuário / cidadão é obrigatório');
            return false;
        }

        const moradia = find(steps, { key: 'IndividuoInfoSocio', completed: true });
        if (!moradia) {
            Alert.alert('Cadastro de Indivíduo', 'Informações sociodemográficas é obrigatório');
            return false;
        }

        const animais = find(steps, { key: 'IndividuoSaidaCadastro', completed: true });
        if (!animais) {
            Alert.alert('Cadastro de Indivíduo', 'Saída do cidadão do cadastro é obrigatório');
            return false;
        }

        const familias = find(steps, { key: 'CondicaoSaude', completed: true });
        if (!familias) {
            Alert.alert('Cadastro de Indivíduo', 'Condições / situações de saúde é obrigatório');
            return false;
        }

        return true;
    };

    const completeSteps = (step) => {
        const _step = step;
        _step.completed = true;
        return step;
    };

    return (
        <SafeView navigation={navigation} isModal={true}>
            <Header noShadow>
                <Left>
                    <HeaderLeftButton icon onPress={onPressBack}>
                        <Icon name="ios-arrow-back" />
                    </HeaderLeftButton>
                </Left>
                <Body>
                    <Title>Cadastro Indivíduo</Title>
                </Body>
                <Right />
            </Header>
            <H1 style={styles.heading}>
                {model && model.domicilio ? `Nº ${model.domicilio.end_numero}` : 'Indefinido' }
            </H1>
            <FlatList
                data={steps}
                extraData={model}
                renderItem={renderItem}
            />
            <LightFooter>
                <Left>
                    <Button transparent block small onPress={onPressBack}>
                        <Text style={{ color: Colors.textColor }}>Voltar</Text>
                    </Button>
                </Left>
                <Body />
                <Right>
                    <Button transparent block small onPress={onSubmit}>
                        <Text style={{ color: Colors.textColor }}>Salvar</Text>
                    </Button>
                </Right>
            </LightFooter>
        </SafeView>
    );
};

export default connect(null, DomiciliosActions)(IndividuoMainScreen);
