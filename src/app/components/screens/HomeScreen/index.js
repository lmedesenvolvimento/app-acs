import React, { Component } from 'react';

import { connect } from 'react-redux';

import CounterActions from '@redux/modules/Counter/actions';

import {
  Text,
  Button,
  Container,
  Content
} from 'native-base';

import styles from './index.styl';

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'HomeScreen',
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount(){
    setInterval(() => {
      this.props.increment();
    }, 1000);
  }

  render() {
    let { counter } = this.props.Counter;
    let { data } = this.props.User;
    return (
      <Container style={styles.container}>
        <Container style={styles.container}>
          <Text style={styles.counterText}>{counter}</Text>          
        </Container>
        
        <Container style={styles.container}>
          <Content padder>
            <Text>{JSON.stringify(data)}</Text>
            <Button onPress={this.logout.bind(this)}>
              <Text>Logout</Text>
            </Button>
          </Content>
        </Container>          
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
