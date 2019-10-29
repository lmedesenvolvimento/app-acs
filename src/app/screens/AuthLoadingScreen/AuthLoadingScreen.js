import React, { Component } from 'react';
import { Alert, StatusBar } from 'react-native';
import { Container, Spinner } from 'native-base';

import APIAction from '@redux/modules/API/actions';

import { UserMapState } from '@redux/modules/User/mappers';
import { APIMapState } from '@redux/modules/API/mappers';

import { connect } from 'react-redux';

import { defineAccessToken } from '@/services/Http';

import Colors from '@/constants/Colors';

import styles from './index.styl';

class AuthLoadingScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    async componentWillMount() {
        await this.authAsync();
    }

    render() {
        return (
            <Container style={styles.spin_container}>
                <StatusBar barStyle="dark-content" />
                <Spinner size={64} color={Colors.darkColor} />
            </Container>
        );
    }

    authAsync() {
        const {
            navigation,
            User,
            API,
            asyncFetchData
        } = this.props;
        if (User.data) {
            defineAccessToken(User.data);
            if (!API.downloaded) {
                asyncFetchData(
                    this.onAsyncFetchDataSuccess.bind(this),
                    this.onAsyncFetchDataFail.bind(this)
                );
            } else {
                navigation.navigate('App');
            }
        } else {
            navigation.navigate('Auth');
        }
    }
    onAsyncFetchDataSuccess() {
        const { navigation } = this.props;
        navigation.navigate('App');
    }
    onAsyncFetchDataFail() {
        const { navigation } = this.props;
        navigation.navigate('Auth');
        Alert.alert('Falha na Autorização', 'Falha ao tentar recuperar os dados');
    }
}


const mapState = (state) => {
    return Object.assign({}, UserMapState(state), APIMapState(state));
};

export default connect(mapState, APIAction)(AuthLoadingScreen);
