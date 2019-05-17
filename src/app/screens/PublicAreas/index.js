import React, { Component } from 'react';
import { connect } from 'react-redux';

import { FlatList } from 'react-native'

import {
  Text,
  Container,
  Content,
  ListItem,
  Body,
} from 'native-base';


import PublicAreasActions from '@redux/modules/PublicAreas/actions';

class PublicAreas extends Component {
  static navigationOptions = {
    title: 'PublicAreas',
  };

  constructor(props) {
    super(props);
    this.state = {
      fieldGroupId: null
    };
  }

  componentDidMount(){
    let fieldGroupId = this.props.navigation.state.params.fieldGroup;
    this.setState({ fieldGroupId });
  }

  render() {
    let areas = this.props.getPublicAreas(this.state.fieldGroupId);
    return (
      <Container>  
        <Content padder>
          <Content>
            <FlatList
              data={areas}
              renderItem={this.renderItem.bind(this)}
            >
            </FlatList>            
          </Content>          
        </Content>        
      </Container>
    );
  }

  renderItem({item}){
    return (
      <ListItem>
        <Body>
          <Text>{item.address}</Text>
        </Body>
      </ListItem>
    );
  }
}

export default connect(null, PublicAreasActions)(PublicAreas);
