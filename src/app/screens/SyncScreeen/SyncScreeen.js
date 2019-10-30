import React from 'react';
import { View } from 'react-native';
import { View as AnimatableView } from 'react-native-animatable';
import { connect } from 'react-redux';
import { DrawerActions } from 'react-navigation';

import {
    Text,
    Content,
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

// import AuthActions from '@redux/modules/Auth/actions';
// import APIActions from '@redux/modules/API/actions';

import DrawerNavigation from '@/services/DrawerNavigation';

import SafeView from '@/components/SafeView';
import HeaderLeftButton from 'app/components/HeaderLeftButton';

import styles from './index.styl';

const AwaitStatus = () => (
    <Container>
        <View style={styles.container}>
            <View style={styles.statusContainer}>
                <H3 style={styles.heading}>Deseja sincronizar suas informações?</H3>
                <Text style={styles.textCenter} note>Este processo pode levar alguns minutos</Text>
                <Grid style={[{ maxHeight: 200 }, styles.block]}>
                    <Col>
                        <Button block style={styles.actionButton} onPress={null}>
                            <Text>Sincronizar Agora</Text>
                        </Button>
                        <Button light block style={styles.actionButton}>
                            <Text>Voltar</Text>
                        </Button>
                    </Col>
                </Grid>
            </View>
        </View>
    </Container>
);

const FailStatus = () => (
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
                <Button light full style={styles.block}>
                    <Text>Tentar novamente</Text>
                </Button>
            </View>
        </View>
    </Container>
);

const OfflineStatus = () => (
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
                <Button light full style={styles.block}>
                    <Text>Tentar novamente</Text>
                </Button>
            </View>
        </View>
    </Container>
);

const SynchronizingStatus = () => {
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

    return (
        <Container>
            <View style={styles.container}>
                <View style={styles.statusContainer}>
                    <H1 style={styles.textCenter}>Sincronizando</H1>
                </View>
                <AnimatableView animation={fadeInOut} iterationCount="infinite" duration={3000} easing="ease-in-out">
                    <Icon
                        android="md-sync"
                        ios="ios-sync"
                        style={styles.syncIcon}
                    />
                </AnimatableView>
                <View style={styles.statusContainer}>
                    <Text style={styles.textCenter} note>Por favor aguarde alguns minutos</Text>
                </View>
            </View>
        </Container>
    );
}


const SyncScreeen = ({ navigation }) => {
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
                    <Title>Sincronizar</Title>
                </Body>
                <Right />
            </Header>
            <Content padder>
                <AwaitStatus />
                <FailStatus />
                <OfflineStatus />
                <SynchronizingStatus />
            </Content>
        </SafeView>
    );
};

SyncScreeen.navigationOptions = {
    title: 'Sincronizar'
};

// const mapActions = (dispatch) => {
//     return Object.assign({}, APIActions(dispatch), AuthActions(dispatch));
// };

export default connect(null)(SyncScreeen);
