import React from 'react';
import { Alert, View } from 'react-native';
import Constants from 'expo-constants';
import { connect, useSelector } from 'react-redux';
import { DrawerActions } from 'react-navigation';

import {
    Text,
    Button,
    Content,
    Header,
    Left,
    Right,
    Body,
    Title,
    Icon
} from 'native-base';

import AuthActions from '@redux/modules/Auth/actions';
import APIActions from '@redux/modules/API/actions';

import DrawerNavigation from '@/services/DrawerNavigation';

import SafeView from '@/components/SafeView';
import HeaderLeftButton from 'app/components/HeaderLeftButton';

import styles from './index.styl';

const AboutScreen = ({ navigation, signOutAsync, asynClearData }) => {
    const isConnected = useSelector(({ Network }) => Network.isConnected);
    const { manifest } = Constants;

    const logout = async () => {
        await signOutAsync();
        await asynClearData();
    };

    const onPressLogout = () => {
        Alert.alert('Encerrar Sessão', 'Deseja realmente encerrar a sua sessão?', [
            { text: 'Não', style: 'cancel' },
            { text: 'Sim', onPress: logout },
        ]);
    };

    const onPressMenu = () => {
        DrawerNavigation.getDrawerNavigator().dispatch(DrawerActions.toggleDrawer());
    };

    const LogoutButton = () => (
        <Button danger onPress={onPressLogout}>
            <Text>Finalizar Sessão</Text>
        </Button>
    );

    return (
        <SafeView navigation={navigation}>
            <Header noShadow>
                <Left>
                    <HeaderLeftButton icon onPress={onPressMenu}>
                        <Icon name="menu" />
                    </HeaderLeftButton>
                </Left>
                <Body>
                    <Title>Sobre</Title>
                </Body>
                <Right />
            </Header>
            <Content padder>
                <View style={styles.item}>
                    <Text>{manifest.name}</Text>
                    <Text note>{manifest.version}</Text>
                </View>

                <View style={styles.item}>
                    <Text>Descrição</Text>
                    <Text note>{manifest.description || 'Sem descrição'}</Text>
                </View>

                <View style={styles.lastItem}>
                    <Text>Autor</Text>
                    <Text note>Laboratório de Mídias Educacional</Text>
                </View>
                {isConnected ? LogoutButton() : null}
            </Content>
        </SafeView>
    );
};

AboutScreen.navigationOptions = {
    title: 'Sobre o Aplicativo'
};

const mapActions = (dispatch) => {
    return Object.assign({}, APIActions(dispatch), AuthActions(dispatch));
};

export default connect(null, mapActions)(AboutScreen);
