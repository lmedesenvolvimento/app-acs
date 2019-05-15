import React, { Component } from 'react';
import { connect } from 'react-redux';

import { FlatList } from 'react-native'

import {
  Text,
  Container,
  Content,
  ListItem,
  Header,
  Body,
  Left,
  Right,
  Title
} from 'native-base';


import PublicAreasActions from '@redux/modules/PublicAreas/actions';

class PublicAreas extends Component {
  static navigationOptions = {
    title: 'PublicAreas',
  };

  _keyExtractor = (item) => item.$id

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    let areas = this.props.getPublicAreas();
    return (
      <Container>  
        <Header>
          <Left />
          <Body>
            <Title>PublicAreas</Title>
          </Body>
          <Right />
        </Header>   
        <Content padder>
          <Content>
            <FlatList
              data={areas}
              keyExtractor={this._keyExtractor}
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
    )
  }
}

export default connect(null, PublicAreasActions)(PublicAreas);
