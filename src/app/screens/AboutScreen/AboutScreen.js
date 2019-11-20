import React from 'react';
import { View } from 'react-native';
import Constants from 'expo-constants';
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

import DrawerNavigation from '@/services/DrawerNavigation';

import SafeView from '@/components/SafeView';
import HeaderLeftButton from 'app/components/HeaderLeftButton';

import styles from './index.styl';

const AboutScreen = ({ navigation }) => {
    const { manifest } = Constants;

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
            </Content>
        </SafeView>
    );
};

AboutScreen.navigationOptions = {
    title: 'Sobre o Aplicativo'
};

export default AboutScreen;
