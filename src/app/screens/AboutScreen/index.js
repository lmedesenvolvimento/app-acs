import React from 'react';
import { connect } from 'react-redux';
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

const AboutScreen = (props) => {
    const { navigation } = props;

    const logout = async () => {
        await props.signOutAsync();
        await props.asynClearData();

        const logoutAction = SwitchActions.jumpTo({
            routeName: 'Auth'
        });

        navigation.dispatch(logoutAction);
    };

    const onPressMenu = () => {
        DrawerNavigation.getDrawerNavigator().dispatch(DrawerActions.toggleDrawer());
    };

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
            <Button block onPress={logout}>
                <Text>Logout</Text>
            </Button>
        </SafeView>
    );
};

const mapActions = (dispatch) => {
    return Object.assign({}, APIActions(dispatch), AuthActions(dispatch));
};

export default connect(null, mapActions)(AboutScreen);
