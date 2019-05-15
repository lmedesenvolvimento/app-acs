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


import MappingsActions from '@redux/modules/Mappings/actions';

class MappingScreen extends Component {
  static navigationOptions = {
    title: 'MappingScreen',
  };

  _keyExtractor = (item) => item.$id

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    let mappings = this.props.getMappings();
    return (
      <Container>  
        <Header>
          <Left/>
          <Body>
            <Title>Mappings</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <Content>
            <FlatList
              data={mappings}
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
      <ListItem onPress={this.onPressItem.bind(this, item)}>
        <Body>
          <Text>{item.field_group.name}</Text>
          <Text note>{item.field_group.neighborhood.name}</Text>
        </Body>
      </ListItem>
    )
  }

  onPressItem(item){
    this.props.navigation.navigate('PublicAreas', { parent: item.$id})
  }
}

export default connect(null, MappingsActions)(MappingScreen);
