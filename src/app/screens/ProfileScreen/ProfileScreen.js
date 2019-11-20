import React from 'react';
import { Alert } from 'react-native';

import { connect, useSelector } from 'react-redux';
import { DrawerActions } from 'react-navigation';

import {
    Text,
    Container,
    Header,
    Left,
    Right,
    Body,
    Title,
    Icon,
    H2,
    Thumbnail,
    Button
} from 'native-base';

import AuthActions from '@redux/modules/Auth/actions';
import APIActions from '@redux/modules/API/actions';

import DrawerNavigation from '@/services/DrawerNavigation';

import SafeView from '@/components/SafeView';
import HeaderLeftButton from 'app/components/HeaderLeftButton';

import styles from './index.styl';


const ProfileScreen = ({ navigation, signOutAsync, asynClearData }) => {
    const currentUser = useSelector(({ User }) => User.data);
    const isConnected = useSelector(({ Network }) => Network.isConnected);

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

    const onPressReload = () => {
        navigation.navigate('Reload');
    };

    const onPressMenu = () => {
        DrawerNavigation.getDrawerNavigator().dispatch(DrawerActions.toggleDrawer());
    };

    const GroupActions = () => {
        if (isConnected) {
            return (
                <>
                    <Button
                        style={styles.btn}
                        iconLeft
                        block
                        light
                        onPress={onPressReload}
                    >
                        <Icon name="md-refresh" />
                        <Text uppercase>Recarregar Dados</Text>
                    </Button>

                    <Button
                        style={styles.btn}
                        block
                        onPress={onPressLogout}
                    >
                        <Text uppercase>Sair</Text>
                    </Button>
                </>
            );
        }

        return null;
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
            <Container style={styles.container}>
                <Container style={[styles.section, { alignItems: 'center' }]}>
                    <Thumbnail style={styles.thumbnail} large source={require('@assets/profile-placeholder.jpg')} />
                    <H2>{ currentUser ? currentUser.name : '' }</H2>
                </Container>
                <Container style={[styles.section, { justifyContent: 'center' }]}>
                    <Text style={styles.title}>
                        E-mail:
                        <Text style={styles.note} note>
                            {currentUser ? currentUser.email : '' }
                        </Text>
                    </Text>
                    <Text style={styles.title}>
                        CBO:
                        <Text style={styles.note} note>
                            { currentUser ? currentUser.cbo : '' }
                        </Text>
                    </Text>
                    <Text style={styles.title}>
                        CNES:
                        <Text style={styles.note} note>
                            {currentUser ? currentUser.cnes : '' }
                        </Text>
                    </Text>
                    <Text style={styles.title}>
                        INE:
                        <Text style={styles.note} note>
                            { currentUser ? currentUser.ine : ''}
                        </Text>
                    </Text>
                </Container>
                <Container style={[styles.section, { justifyContent: 'center' }]}>
                    <GroupActions />
                </Container>
            </Container>
        </SafeView>
    );
};

ProfileScreen.navigationOptions = {
    title: 'Perfil'
};

const mapDispatchToProps = (dispatch) => {
    return Object.assign({}, APIActions(dispatch), AuthActions(dispatch));
};

export default connect(null, mapDispatchToProps)(ProfileScreen);
