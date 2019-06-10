import React, { Component } from 'react';
import { Font, AppLoading } from 'expo';
import { SafeAreaView } from 'react-navigation';

import { Ionicons } from '@expo/vector-icons';

import UserAction from '@redux/modules/User/actions';
import { UserMapState } from '@redux/modules/User/mappers';

import { connect } from 'react-redux';

import localStorage from '@/services/LocalStorage';

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

    async authAsync() {
        const { setUser, navigation } = this.props;
        const db = await localStorage.read();
        const user = db.get('user').value();
        if (user) {
            setUser(user);
            navigation.navigate('App');
        } else {
            navigation.navigate('Auth');
        }
    }
}

export default connect(UserMapState, UserAction)(AuthLoadingScreen);