import React from 'react';
import { Alert } from 'react-native';
import { connect, useSelector } from 'react-redux';
import { DrawerActions, SwitchActions } from 'react-navigation';

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

const AboutScreen = ({ navigation, signOutAsync, asynClearData }) => {
    const isConnected = useSelector(({ Network }) => Network.isConnected);

    const logout = async () => {
        await signOutAsync();
        await asynClearData();

        const logoutAction = SwitchActions.jumpTo({
            routeName: 'Auth'
        });

        navigation.dispatch(logoutAction);
    };

    const onPressLogout = () => {
        Alert.alert('Sair do Aplicativo', 'Deseja realmente sair do Aplicativo', [
            { text: 'Não', style: 'cancel' },
            { text: 'Sim', onPress: logout },
        ]);
    };

    const onPressMenu = () => {
        DrawerNavigation.getDrawerNavigator().dispatch(DrawerActions.toggleDrawer());
    };

    const LogoutButton = () => (
        <Button block onPress={onPressLogout}>
            <Text>Logout</Text>
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
            <Content padder />
            {isConnected ? LogoutButton() : null}
        </SafeView>
    );
};

const mapActions = (dispatch) => {
    return Object.assign({}, APIActions(dispatch), AuthActions(dispatch));
};

export default connect(null, mapActions)(AboutScreen);
