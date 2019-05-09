import React, { Component } from 'react';
import { View, Text } from 'react-native';

import styles from './index.styl'

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text> HomeScreenComponent </Text>
      </View>
    );
  }
}

export default HomeScreen;
