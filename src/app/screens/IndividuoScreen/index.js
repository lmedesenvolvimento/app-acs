import React, { useState } from 'react';
import { Alert } from 'react-native';
import { connect } from 'react-redux';

import DomiciliosActions from '@redux/modules/Domicilios/actions';

import {
    Title,
    Header,
    Left,
    Icon,
    Body,
    Fab,
    Button,
    Right
} from 'native-base';


import Colors from '@/constants/Colors';

import SafeView from '@/components/SafeView';
import HeaderLeftButton from '@/components/HeaderLeftButton';

const ButtonEditDomicilio = (props) => {
    const { navigation } = props;
    const { domicilio, onEditSubmit } = props;

    const logradouro = navigation.getParam('logradouro');

    const onPressEditDomicilio = () => {
        const payload = {
            model: {
                logradouro_nome: logradouro ? logradouro.nome : '',
                ...domicilio
            },
            title: 'Cadastro Domiciliar',
            action: 'edit',
            onSubmit: onEditSubmit
        };

        navigation.navigate('DomiciliosForm', payload);
    };

    if (!navigation.getParam('id')) {
        return (
            <Button icon transparent onPress={onPressEditDomicilio}>
                <Icon name="mode-edit" type="MaterialIcons" />
            </Button>
        );
    }

    return null;
};

const ButtonRemoveDomicilio = (props) => {
    const {
        navigation,
        destroyDomicilios,
        domicilio
    } = props;

    const onPressRemoveDomicilio = () => {
        Alert.alert(
            'Remover Domicílio',
            'Você realmente deseja apagar este domicílio? Esta ação é irreversível.',
            [
                { text: 'Não', style: 'cancel' },
                { text: 'Sim', onPress: onConfirmRemoveDomicilio, style: 'destructive' },
            ]
        );
    };

    const onConfirmRemoveDomicilio = () => {
        destroyDomicilios(domicilio.key);
        navigation.goBack();
    };

    if (!navigation.getParam('id')) {
        return (
            <Button icon transparent onPress={onPressRemoveDomicilio}>
                <Icon name="trash" />
            </Button>
        );
    }

    return null;
};

const IndividuoScreen = (props) => {
    const { navigation } = props;

    const [domicilio, setDomicilio] = useState(navigation.getParam('domicilio'));

    const onPressNewIndividuo = () => {
        const payload = {
            model: { domicilio },
            title: 'Cadastro Individuo',
            action: 'new'
        };

        setTimeout(() => {
            navigation.navigate('IndividuosForm', payload);
        }, 200);
    };

    const onPressBack = () => {
        navigation.goBack();
    };

    const onEditSubmit = (payload) => {
        setDomicilio(payload);
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
                    <Title>{`Domicílio - ${domicilio.end_numero}`}</Title>
                </Body>
                <Right>
                    <ButtonEditDomicilio
                        domicilio={domicilio}
                        onEditSubmit={onEditSubmit}
                        {...props}
                    />

                    <ButtonRemoveDomicilio
                        domicilio={domicilio}
                        {...props}
                    />
                </Right>
            </Header>
            <Fab
                style={[{ backgroundColor: Colors.warnColor }]}
                onPress={onPressNewIndividuo}
            >
                <Icon name="ios-add" />
            </Fab>
        </SafeView>
    );
};

export default connect(null, DomiciliosActions)(IndividuoScreen);
