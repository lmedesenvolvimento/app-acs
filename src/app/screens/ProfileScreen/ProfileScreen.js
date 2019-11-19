import React from 'react';
// import Constants from 'expo-constants';
// import { connect, useSelector } from 'react-redux';
import { DrawerActions } from 'react-navigation';

import {
    Text,
    Content,
    Header,
    Left,
    Right,
    Body,
    Title,
    Icon
} from 'native-base';

// import AuthActions from '@redux/modules/Auth/actions';
// import APIActions from '@redux/modules/API/actions';

import DrawerNavigation from '@/services/DrawerNavigation';

import SafeView from '@/components/SafeView';
import HeaderLeftButton from 'app/components/HeaderLeftButton';

// import styles from './index.styl';


const ProfileScreen = ({ navigation }) => {
    // const currentUser = useSelector(({ User }) => User.data);
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
                    <Title>Perfil</Title>
                </Body>
                <Right />
            </Header>
            <Content padder>
                <Text>ProfileScreen</Text>
            </Content>
        </SafeView>
    );
};

ProfileScreen.navigationOptions = {
    title: 'Perfil'
};

export default ProfileScreen;
