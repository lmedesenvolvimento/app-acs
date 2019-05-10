import React, { Component } from 'react';
import { Root } from 'native-base'
import AppNavigator from '@/navigations/AppNavigator';

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
          <AppNavigator></AppNavigator>
        </Root>
      </Provider>
    );
  }
}