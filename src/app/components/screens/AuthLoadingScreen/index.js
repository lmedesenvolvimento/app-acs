import React, { Component } from 'react';
import { Font, AppLoading } from 'expo';

import { Ionicons } from '@expo/vector-icons';

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
        return <AppLoading />;
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
        this.props.navigation.navigate( user ? 'App' : 'Auth' );
    }
}

export default AuthLoadingScreen;
