import React, { Component } from 'react';
import { Root } from 'native-base'
import AppNavigator from '@/navigations/AppNavigator';

export default class App extends Component {
  render() {
    return (
      <Root>
        <AppNavigator></AppNavigator>
      </Root>
    );
  }
}