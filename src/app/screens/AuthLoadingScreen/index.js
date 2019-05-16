import React, { Component } from 'react';
import { Font, AppLoading } from 'expo';
import { SafeAreaView } from 'react-navigation';

import { Ionicons } from '@expo/vector-icons';

import UserAction from '@redux/modules/User/actions';
import { UserMapState } from '@redux/modules/User/mappers';

import { connect } from 'react-redux';

import localStorage from '@/services/LocalStorage'

class AuthLoadingScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    async componentWillMount(){
        await this._cacheResourcesAsync()
        await this._authAsync()
    }

    render() {
        return (
            <SafeAreaView>
                <AppLoading />
            </SafeAreaView>
        );
    }

    async _cacheResourcesAsync() {
        await Font.loadAsync({
            'Roboto': require('native-base/Fonts/Roboto.ttf'),
            'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
            ...Ionicons.font,
        });
    }

    async _authAsync() {
        let db = await localStorage.read();
        let user = db.get('user').value();
        console.log(user)
        if (user) {
            this.props.setUser(user);
            this.props.navigation.navigate('App');
        } else {
            this.props.navigation.navigate('Auth');
        }
    }
}

export default connect(UserMapState, UserAction)(AuthLoadingScreen);