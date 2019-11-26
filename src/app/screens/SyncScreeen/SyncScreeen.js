import React, { useState } from 'react';
import { View, ToastAndroid } from 'react-native';
import { View as AnimateView } from 'react-native-animatable';
import { connect, useSelector } from 'react-redux';
import { DrawerActions } from 'react-navigation';

import {
    Text,
    Container,
    Header,
    Left,
    Right,
    Body,
    Button,
    Title,
    Icon,
    H1,
    H3
} from 'native-base';

import { Grid, Col } from 'react-native-easy-grid';

import APIActions from '@redux/modules/API/actions';

import DrawerNavigation from '@/services/DrawerNavigation';

import SafeView from '@/components/SafeView';
import HeaderLeftButton from 'app/components/HeaderLeftButton';

import styles from './index.styl';

const Status = {
    await: 1,
    syncroninzing: 2,
    fail: 3,
    done: 4
};

const AwaitStatus = ({
    navigation,
    currentStatus,
    updateStatus,
    onStartSync
}) => {
    const startSync = () => {
        updateStatus(Status.syncroninzing);
        onStartSync(onSuccess, onFail);
    };

    const onSuccess = () => updateStatus(Status.done);

    const onFail = (error) => {
        updateStatus(Status.fail);
        ToastAndroid.show(error.message, ToastAndroid.LONG);
    };

    if (Status.await === currentStatus) {
        return (
            <Container>
                <View style={styles.container}>
                    <View style={styles.statusContainer}>
                        <H3 style={styles.heading}>Deseja sincronizar suas informações?</H3>
                        <Text style={styles.textCenter} note>
                            Este processo pode levar alguns minutos
                        </Text>
                        <Grid style={[{ maxHeight: 200 }, styles.block]}>
                            <Col>
                                <Button
                                    block
                                    style={styles.actionButton}
                                    onPress={startSync}
                                >
                                    <Text>Sincronizar Agora</Text>
                                </Button>
                                <Button
                                    light
                                    block
                                    style={styles.actionButton}
                                    onPress={() => navigation.goBack()}
                                >
                                    <Text>Voltar</Text>
                                </Button>
                            </Col>
                        </Grid>
                    </View>
                </View>
            </Container>
        );
    }

    return null;
};

const FailStatus = ({ currentStatus, updateStatus }) => {
    if (Status.fail === currentStatus) {
        return (
            <Container>
                <View style={styles.container}>
                    <View style={styles.statusContainer}>
                        <H1 style={styles.textCenter}>Falha Sincronização</H1>
                    </View>
                    <View>
                        <Icon name="cloud-off" type="MaterialIcons" style={styles.syncIcon} />
                    </View>
                    <View style={styles.statusContainer}>
                        <Text style={styles.textCenter} note>
                            Não foi possível terminar sua sincronização por favor tente novamente.
                        </Text>
                        <Button
                            light
                            full
                            style={styles.block}
                            onPress={() => updateStatus(Status.await)}
                        >
                            <Text>Tentar novamente</Text>
                        </Button>
                    </View>
                </View>
            </Container>
        );
    }

    return null;
};

const DoneStatus = ({ navigation, currentStatus }) => {
    if (Status.done === currentStatus) {
        return (
            <Container>
                <View style={[styles.container, styles.centered]}>
                    <View style={styles.statusContainer}>
                        <H1 style={styles.textCenter}>Sucesso</H1>
                    </View>
                    <View>
                        <Icon name="done-all" style={styles.syncIcon} color="#00ff00" type="MaterialIcons" />
                    </View>
                    <View style={styles.statusContainer}>
                        <Text style={styles.textCenter} note>
                            Seus dados foram sincronizados com sucesso
                            e o seu aplicativo foi atualizado.
                        </Text>
                    </View>
                </View>
                <View style={styles.container}>
                    <Button light full style={styles.block} onPress={() => navigation.goBack()}>
                        <Text>Cancelar</Text>
                    </Button>
                </View>
            </Container>
        );
    }

    return null;
};

const OfflineStatus = ({ navigation }) => (
    <Container>
        <View style={styles.container}>
            <View style={styles.statusContainer}>
                <H1 style={styles.textCenter}>Sem Rede</H1>
            </View>
            <View>
                <Icon name="signal-wifi-off" type="MaterialIcons" style={styles.syncIcon} />
            </View>
            <View style={styles.statusContainer}>
                <Text style={styles.textCenter} note>
                    Não foi possível estabelecer uma conexão de rede.
                    Por favor conecte seu dispotivo a internet e tente novamente
                </Text>
                <Button
                    light
                    full
                    style={styles.block}
                    onPress={() => navigation.goBack()}
                >
                    <Text>Tentar novamente</Text>
                </Button>
            </View>
        </View>
    </Container>
);

const SynchronizingStatus = ({ currentStatus }) => {
    const fadeInOut = {
        0: {
            opacity: 1,
            rotate: '0deg',
        },
        0.5: {
            opacity: 0,
            rotate: '-180deg'
        },
        1: {
            opacity: 1,
            rotate: '-360deg',
        },
    };

    if (Status.syncroninzing === currentStatus) {
        return (
            <Container>
                <View style={styles.container}>
                    <View style={styles.statusContainer}>
                        <H1 style={styles.textCenter}>Sincronizando</H1>
                    </View>
                    <AnimateView
                        animation={fadeInOut}
                        iterationCount="infinite"
                        duration={3000}
                        easing="ease-in-out"
                    >
                        <Icon
                            android="md-sync"
                            ios="ios-sync"
                            style={styles.syncIcon}
                        />
                    </AnimateView>
                    <View style={styles.statusContainer}>
                        <Text style={styles.textCenter} note>Por favor aguarde alguns minutos</Text>
                    </View>
                </View>
            </Container>
        );
    }

    return null;
};


const SyncScreeen = ({ navigation, emitData }) => {
    const [status, setStatus] = useState(Status.await);
    const isConnected = useSelector(({ Network }) => Network.isConnected);

    const onPressMenu = () => {
        DrawerNavigation.getDrawerNavigator().dispatch(DrawerActions.toggleDrawer());
    };

    navigation.addListener('willBlur', () => {
        setStatus(Status.await);
    });

    if (isConnected) {
        return (
            <SafeView navigation={navigation} light={true}>
                <AwaitStatus
                    currentStatus={status}
                    updateStatus={setStatus}
                    navigation={navigation}
                    onStartSync={emitData}
                />
                <SynchronizingStatus
                    currentStatus={status}
                    updateStatus={setStatus}
                />
                <FailStatus
                    currentStatus={status}
                    updateStatus={setStatus}
                />
                <DoneStatus
                    currentStatus={status}
                    navigation={navigation}
                />
            </SafeView>
        );
    }

    return (
        <SafeView navigation={navigation}>
            <Header noShadow>
                <Left>
                    <HeaderLeftButton icon onPress={onPressMenu}>
                        <Icon name="menu" />
                    </HeaderLeftButton>
                </Left>
                <Body>
                    <Title>Sincronizar</Title>
                </Body>
                <Right />
            </Header>
            <OfflineStatus navigation={navigation} />
        </SafeView>
    );
};

SyncScreeen.navigationOptions = {
    title: 'Sincronizar'
};

const mapActions = (dispatch) => {
    return Object.assign({}, APIActions(dispatch));
};

export default connect(null, mapActions)(SyncScreeen);
