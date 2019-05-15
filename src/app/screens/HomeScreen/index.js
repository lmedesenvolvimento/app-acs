import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Text,
  Container,
  Content
} from 'native-base';

import AuthActions from '@redux/modules/Auth/actions';
import MappingsActions from '@redux/modules/Mappings/actions';
import PublicAreasActions from '@redux/modules/PublicAreas/actions';

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

  render() {
    let { data } = this.props.User;
    let mappings = this.props.getMappings();
    let publicAreas = this.props.getPublicAreas();
    return (
      <Container>        
        <Content padder>
          <Text>Current User</Text>
          <Text style={styles.mb}>{JSON.stringify(data)}</Text>    

          <Text>Mappings</Text>
          <Text style={styles.mb}>{JSON.stringify(mappings)}</Text>
          
          <Text>PublicAreas</Text>
          <Text style={styles.mb}>{JSON.stringify(publicAreas)}</Text>
        </Content>        
      </Container>
    );
  }  
}

export const CustomMapState = (state) => {
  const { User } = state;
  return { User };
};

export default connect(CustomMapState, (dispatch) => { 
  return Object.assign({}, AuthActions(dispatch), MappingsActions(dispatch), PublicAreasActions(dispatch));
})(HomeScreen);
