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

import IndividuosActions from '@redux/modules/Individuos/actions';

import SafeView from '@/components/SafeView';
import LightFooter from '@/components/LightFooter';
import HeaderLeftButton from '@/components/HeaderLeftButton';

import MainNavigation from '@/services/MainNavigation';

import Colors from '@/constants/Colors';

import styles from './index.styl';

const IndividuoMainScreen = ({ navigation, addIndividuo, updateIndividuo }) => {
    const _model = navigation.getParam('model');

    const _steps = [
        {
            key: 'IndividuoIDUsuario',
            title: 'Indentificação do usuário / cidadão',
            completed: false,
        },
        {
            key: 'IndividuoInfoSocio',
            title: 'Informações sociodemográficas',
            completed: false,
        },
        {
            key: 'IndividuoCadastroSaida',
            title: 'Saída do cidadão do cadastro',
            completed: false,
            optional: true,
            optionalRequireFields: ['sc_tipo'],
        },
        {
            key: 'IndividuoCondicaoSaude',
            title: 'Condições / situações de saúde',
            completed: false,
        },
        {
            key: 'IndividuoSituacaoRua',
            title: 'Cidadão em situação de rua',
            completed: false,
            optional: true,
            optionalRequireFields: [
                'sr_esta_situacao_rua',
                'sr_tempo_rua',
                'sr_recebe_beneficio',
                'sr_recebe_beneficio',
                'sr_possui_referencia_familiar',
                'sr_vezes_alimenta_dia',
                'sr_origem_alimentacao',
            ],
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
            return createIndividuo();
        }
        return editIndividuo();
    };

    const createIndividuo = () => {
        const domicilio_key = model.domicilio.key;
        const result = mapSteps(steps);
        const key = shortid.generate();

        if (result) {
            const payload = Object.assign({}, { domicilio_key, key }, omit(result, ['domicilio']));
            addIndividuo(payload);
            onPressBack();
        }
    };

    const editIndividuo = () => {
        const { key } = model;
        const result = mapSteps(steps);

        if (result) {
            const payload = Object.assign({}, omit(result, ['domicilio']));
            updateIndividuo(key, payload);
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
        const idUsuario = find(steps, { key: 'IndividuoIDUsuario', completed: true });
        if (!idUsuario) {
            Alert.alert('Cadastro de Indivíduo', 'Indentificação do usuário / cidadão é obrigatório');
            return false;
        }

        const infoSocio = find(steps, { key: 'IndividuoInfoSocio', completed: true });
        if (!infoSocio) {
            Alert.alert('Cadastro de Indivíduo', 'Informações sociodemográficas é obrigatório');
            return false;
        }

        const condicaoSaude = find(steps, { key: 'IndividuoCondicaoSaude', completed: true });
        if (!condicaoSaude) {
            Alert.alert('Cadastro de Indivíduo', 'Condições / situações de saúde é obrigatório');
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

export default connect(null, IndividuosActions)(IndividuoMainScreen);
