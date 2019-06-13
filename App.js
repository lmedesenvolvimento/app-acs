import React, { Component } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { Root, StyleProvider } from 'native-base';

import getTheme from '@/themes/native-base-theme/components';
import commonColor from '@/themes/native-base-theme/variables/commonColor';

import AppNavigator from '@/navigations/AppNavigator';
import LoadingModal from '@/components/Loading';

import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import configureStore from '@redux';

// Use native navigation
import { useScreens } from 'react-native-screens';

useScreens();

const { store, persistor } = configureStore();
const theme = getTheme(commonColor)

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <StyleProvider style={theme}>
                        <Root>
                            <SafeAreaView style={styles.droidSafeArea}>
                                <StatusBar barStyle="dark-content" />
                                <AppNavigator />
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
