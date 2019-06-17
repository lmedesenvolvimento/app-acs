/* eslint-disable max-len */
import React, { Component } from 'react';
import { FlatList, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';

import {
    Text,
    Container,
    Content,
    ListItem,
    Body,
} from 'native-base';


import MicroAreaSelector from 'app/store/modules/MicroAreas/mappers';
import MicroAreaActions from 'app/store/modules/MicroAreas/actions';

class MicroAreaScreen extends Component {
    static navigationOptions = {
        title: 'Micro Areas Screen',
    };

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const { getMicroAreas } = this.props;
        const areas = getMicroAreas();
        return (
            <SafeAreaView>
                <Container>
                    <Content padder>
                        <Content>
                            <FlatList
                                data={areas}
                                renderItem={this.renderItem.bind(this)}
                            />
                        </Content>
                    </Content>
                </Container>
            </SafeAreaView>
        );
    }

    renderItem({ item }) {
        return (
            <ListItem>
                <Body>
                    <Text>{item.nome}</Text>
                    <Text note>{`Posto ID: ${item.posto_id}`}</Text>
                </Body>
            </ListItem>
        );
    }

    // onPressItem(item) {
    //     const { navigation } = this.props;
    //     navigation.navigate('PublicAreas', { fieldGroup: item.id });
    // }
}

export default connect(MicroAreaSelector.MappingsMicroAreasState, MicroAreaActions)(MicroAreaScreen);
