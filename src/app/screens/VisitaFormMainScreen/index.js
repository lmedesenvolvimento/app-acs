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
import { findIndex, find, omit } from 'lodash';

import shortid from 'shortid';

import VisitasActions from '@redux/modules/Individuos/actions';

import SafeView from '@/components/SafeView';
import LightFooter from '@/components/LightFooter';
import HeaderLeftButton from '@/components/HeaderLeftButton';

import MainNavigation from '@/services/MainNavigation';

import Colors from '@/constants/Colors';

import styles from './index.styl';

const VisitaMainScreen = ({ navigation, addVisita, updateVisita }) => {
    const _steps = [
        {
            key: 'Ficha',
            title: 'Ficha de visita',
            completed: false,
        },
        {
            key: 'Motivo',
            title: 'Motivo da visita',
            completed: false,
        },
        {
            key: 'Desfecho',
            title: 'Desfecho da visita',
            completed: false,
        }
    ];

    const [model, setModel] = useState(
        navigation.getParam('model') || {}
    );

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
            return createVisita();
        }
        return editVisita();
    };

    const createVisita = () => {
        // const domicilio_key = model.domicilio.key;
        // const result = mapSteps(steps);
        // const key = shortid.generate();

        // if (result) {
        //     const payload = Object.assign({}, { domicilio_key, key }, omit(result, ['domicilio']));
        //     addVisita(payload);
        //     onPressBack();
        // }
        return false;
    };

    const editVisita = () => {
        // const { key } = model;
        // const result = mapSteps(steps);

        // if (result) {
        //     const payload = Object.assign({}, omit(result, ['domicilio']));
        //     updateVisita(key, payload);
        //     navigation.getParam('onSubmit')(model);
        //     onPressBack();
        // }
        return true;
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
        const ficha = find(steps, { key: 'Ficha', completed: true });
        if (!ficha) {
            Alert.alert('Cadastro de Visita', 'Ficha de visita é obrigatório');
            return false;
        }

        const motivo = find(steps, { key: 'Motivo', completed: true });
        if (!motivo) {
            Alert.alert('Cadastro de Visita', 'Motivo da visita é obrigatório');
            return false;
        }

        const desfecho = find(steps, { key: 'Desfecho', completed: true });
        if (!desfecho) {
            Alert.alert('Cadastro de Visita', 'Desfecho da visita é obrigatório');
            return false;
        }

        return true;
    };

    function completeSteps(step) {
        const _step = step;
        if (_step.optional) {
            Object.keys(model).some((key) => {
                return _step.optionalRequireFields.includes(key);
            });
        } else {
            _step.completed = true;
        }
        return step;
    }

    return (
        <SafeView navigation={navigation} isModal={true}>
            <Header noShadow>
                <Left>
                    <HeaderLeftButton icon onPress={onPressBack}>
                        <Icon name="ios-arrow-back" />
                    </HeaderLeftButton>
                </Left>
                <Body>
                    <Title>Visita</Title>
                </Body>
                <Right />
            </Header>
            <H1 style={styles.heading}>
                { model && model.individuo ? model.individuo.iden_nome : 'Indefinido' }
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

export default connect(null, VisitasActions)(VisitaMainScreen);
