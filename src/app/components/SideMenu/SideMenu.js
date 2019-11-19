import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';

import { connect, useSelector } from 'react-redux';

import {
    Container,
    Text,
    List,
    ListItem,
    Icon,
    Body
} from 'native-base';

import { NavigationActions } from 'react-navigation';

import Colors from '@/constants/Colors';

import styles from './index.styl';

const SideMenu = ({ navigation }) => {
    const isConnected = useSelector(({ Network }) => Network.isConnected);
    const currentUser = useSelector(({ User }) => User.data);

    const navigateTo = (route) => {
        const navigateAction = NavigationActions.navigate({
            routeName: route
        });

        navigation.dispatch(navigateAction);
    };

    const GroupSync = () => {
        if (isConnected) {
            return (
                <>
                    <ListItem noBorder>
                        <Text note>Dados</Text>
                    </ListItem>
                    <ListItem iconLeft noBorder onPress={() => navigateTo('Reload')}>
                        <Icon name="md-refresh" />
                        <Body>
                            <Text>Recarregar Dados</Text>
                        </Body>
                    </ListItem>
                    <ListItem iconLeft last onPress={() => navigateTo('Sync')}>
                        <Icon name="md-sync" />
                        <Body>
                            <Text>Sincronizar dados</Text>
                        </Body>
                    </ListItem>
                </>
            );
        }

        return null;
    };

    return (
        <Container>
            <Container style={[styles.header, relativeStyles.header]}>
                <Text style={styles.headerText}>{currentUser.email}</Text>
                <Text style={styles.headerNote}>{ isConnected ? 'connectado' : 'sem rede' }</Text>
            </Container>
            <List>
                <ListItem iconLeft noBorder onPress={() => navigateTo('Home')}>
                    <Icon name="md-home" />
                    <Body>
                        <Text>Início</Text>
                    </Body>
                </ListItem>
                <ListItem iconLeft last onPress={() => navigateTo('Profile')}>
                    <Icon name="person" type="MaterialIcons" />
                    <Body>
                        <Text>Perfil</Text>
                    </Body>
                </ListItem>
                <GroupSync />
                <ListItem noBorder>
                    <Text note>Outros</Text>
                </ListItem>
                <ListItem iconLeft noBorder onPress={() => navigateTo('About')}>
                    <Icon name="md-information-circle" />
                    <Body>
                        <Text>Sobre</Text>
                    </Body>
                </ListItem>
            </List>
        </Container>
    );
};


const relativeStyles = StyleSheet.create({
    header: {
        maxHeight: Dimensions.get('screen').height * 0.2,
        backgroundColor: Colors.primaryColor
    }
});

export default connect(null)(SideMenu);
