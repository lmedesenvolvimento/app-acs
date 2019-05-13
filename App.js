import React, { Component } from 'react';
import { SafeAreaView, Platform, StatusBar } from 'react-native';
import { Root } from 'native-base'

import AppNavigator from '@/navigations/AppNavigator';
import LoadingModal from '@/components/Loading'

import { Provider } from 'react-redux'
import { store } from '@redux'

// Use native navigation
import { useScreens } from 'react-native-screens';

useScreens();

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Root>
          <SafeAreaView style={styles.droidSafeArea}>
            <StatusBar barStyle="dark-content"/>
            <AppNavigator></AppNavigator>
          </SafeAreaView>
          <LoadingModal/>
        </Root>
      </Provider>
    );
  }
}

const styles = {
  droidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  }
}