import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Text,
  Button,
  Container,
  Content
} from 'native-base';

import AuthActions from '@redux/modules/Auth/actions'

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
      </Container>
    );
  }  
}

export const CustomMapState = (state) => {
  const { User } = state;
  return { User };
};

export default connect(CustomMapState, AuthActions)(HomeScreen);
