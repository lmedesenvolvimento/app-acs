import React, { Component } from 'react';
import { AppLoading } from 'expo';

import localStorage from '@/services/LocalStorage'

class AuthLoadingScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount(){
        this._cacheResourcesAsync()
    }

    render() {
        return <AppLoading />;
    }

    async _cacheResourcesAsync() {
        let db = await localStorage.read();
        let user = db.get('user').value();
        this.props.navigation.navigate( user ? 'App' : 'Auth' );
    }
}

export default AuthLoadingScreen;
