import React, { Component } from 'react';

import {
  Text,
  Button,
  Container
} from 'native-base'

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'HomeScreen',
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Container>
        <Text> HomeScreenComponent </Text>
        <Button onPress={this.logout.bind(this)}>
          <Text>Logout</Text>
        </Button>
      </Container>
    );
  }

  logout(){
    this.props.navigation.navigate('Auth')
  }
}

export default HomeScreen;
