import React, { Component } from 'react';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { SafeAreaView } from 'react-native';
import { Root, StyleProvider } from 'native-base';

import { Ionicons } from '@expo/vector-icons';

import getTheme from '@/themes/native-base-theme/components';
import commonColor from '@/themes/native-base-theme/variables/commonColor';

import AppNavigator from '@/navigations/AppNavigator';
import LoadingModal from '@/components/Loading';

import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import configureStore from '@redux';

import DrawerNavigation from '@/services/DrawerNavigation';

// Use native navigation
import { useScreens } from 'react-native-screens';

useScreens();

const { store, persistor } = configureStore();
const theme = getTheme(commonColor);

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ready: false
        };
    }

    async componentWillMount() {
        this.cacheResourcesAsync();
    }

    async cacheResourcesAsync() {
        await Font.loadAsync({
            Roboto: require('native-base/Fonts/Roboto.ttf'),
            Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
            ...Ionicons.font
        });
        this.setState({ ready: true });
    }

    render() {
        const { ready } = this.state;
        if (!ready) {
            return (
                <AppLoading />
            );
        }
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <StyleProvider style={theme}>
                        <Root>
                            <SafeAreaView style={styles.droidSafeArea}>
                                <AppNavigator ref={navigationRef => DrawerNavigation.setDrawerNavigator(navigationRef)} />
                            </SafeAreaView>
                            <LoadingModal />
                        </Root>
                    </StyleProvider>
                </PersistGate>
            </Provider>
        );
    }
}

const styles = {
    droidSafeArea: {
        flex: 1,
    }
};
