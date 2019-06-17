import React, { Component } from 'react';
import { Alert } from 'react-native';
import { Font, AppLoading } from 'expo';
import { SafeAreaView } from 'react-navigation';

import { Ionicons } from '@expo/vector-icons';

import APIAction from '@redux/modules/API/actions';

import { UserMapState } from '@redux/modules/User/mappers';
import { APIMapState } from '@redux/modules/API/mappers';

import { connect } from 'react-redux';

import { defineAccessToken } from '@/services/Http';

class AuthLoadingScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    async componentWillMount() {
        await this.cacheResourcesAsync();
        await this.authAsync();
    }

    render() {
        return (
            <SafeAreaView>
                <AppLoading />
            </SafeAreaView>
        );
    }

    async cacheResourcesAsync() {
        await Font.loadAsync({
            Roboto: require('native-base/Fonts/Roboto.ttf'),
            Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
            ...Ionicons.font
        });
    }

    authAsync() {
        const {
            navigation,
            User,
            API,
            AsyncFetchData
        } = this.props;
        if (User.data) {
            defineAccessToken(User.data);
            if (!API.downloaded) {
                AsyncFetchData(
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
        Alert.alert('Falha ao tentar recuperar os dados');
    }
}


const mapState = (state) => {
    return Object.assign({}, UserMapState(state), APIMapState(state));
};

export default connect(mapState, APIAction)(AuthLoadingScreen);
