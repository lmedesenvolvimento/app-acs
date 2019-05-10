import React, { Component } from 'react';

import { connect } from 'react-redux';

import CounterActions from '@redux/modules/Counter/actions';
import { SelectCounter } from '@redux/modules/Counter/selectors';

import {
  Text,
  Button,
  Container
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
    return (
      <Container style={styles.container}>
        <Container style={styles.container}>
          <Text>{counter}</Text>
        </Container>
        
        <Container style={styles.container}>
          <Button onPress={this.logout.bind(this)}>
            <Text>Logout</Text>
          </Button>
        </Container>          
      </Container>
    );
  }

  logout(){
    this.props.navigation.navigate('Auth')
  }
}

export default connect(SelectCounter, CounterActions)(HomeScreen);
