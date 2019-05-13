import React, { Component } from 'react';
import { connect } from 'react-redux';

import CounterActions from '@redux/modules/Counter/actions';

import {
  Text,
  Button,
  Container,
  Content
} from 'native-base';

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
    let { data } = this.props.User;
    return (
      <Container>        
        <Content padder>
          <Text>{JSON.stringify(data)}</Text>
        </Content>
        <Button block onPress={this.logout.bind(this)}>
          <Text>Logout</Text>
        </Button>
      </Container>
    );
  }

  logout(){
    this.props.navigation.navigate('Auth')
  }
}

export const CustomMapState = (state) => {
  const { User, Counter } = state
  return { User, Counter }
};

export default connect(CustomMapState, CounterActions)(HomeScreen);
