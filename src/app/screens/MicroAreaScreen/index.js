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
            <Container>
                <Content padder>
                    <Content>
                        <FlatList
                            data={areas}
                            keyExtractor={(item) => `micro-area-${item.id}`}
                            renderItem={this.renderItem.bind(this)}
                        />
                    </Content>
                </Content>
            </Container>
        );
    }
    
    renderItem({ item }) {
        return (
            <ListItem onPress={this.onPressItem.bind(this)}>
                <Body>
                    <Text>{item.nome}</Text>
                    <Text note>{`Posto ID: ${item.posto_id}`}</Text>
                </Body>
            </ListItem>
        );
    }

    onPressItem(item) {
        const { navigation } = this.props;
        navigation.navigate('Quadras');
    }
}

const mapState = (state) => {
    const { MicroAreas } = state;
    return { MicroAreas };
};

export default connect(mapState, MicroAreaActions)(MicroAreaScreen);
