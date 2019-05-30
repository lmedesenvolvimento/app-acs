import React, { Component } from 'react';
import { connect } from 'react-redux';

import { FlatList } from 'react-native';

import {
    Text,
    Container,
    Content,
    ListItem,
    Body,
} from 'native-base';


import { MappingsMapState } from '@redux/modules/Mappings/mappers';
import MappingsActions from '@redux/modules/Mappings/actions';

class MappingScreen extends Component {
    static navigationOptions = {
        title: 'MappingScreen',
    };

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentWillMount() {
        const { fetchAsyncMappings } = this.props;
        fetchAsyncMappings();
    }

    render() {
        const { getMappings } = this.props;
        return (
            <Container>
                <Content padder>
                    <Content>
                        <FlatList
                            data={getMappings()}
                            renderItem={this.renderItem.bind(this)}
                        />
                    </Content>
                </Content>
            </Container>
        );
    }

    renderItem({ item }) {
        return (
            <ListItem onPress={this.onPressItem.bind(this, item)}>
                <Body>
                    <Text>{item.field_group.name}</Text>
                    <Text note>{item.field_group.neighborhood.name}</Text>
                </Body>
            </ListItem>
        );
    }

    onPressItem(item) {
        const { navigation } = this.props;
        navigation.navigate('PublicAreas', { fieldGroup: item.id });
    }
}

export default connect(MappingsMapState, MappingsActions)(MappingScreen);
