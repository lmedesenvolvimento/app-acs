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


import LogradouroActions from 'app/store/modules/Logradouros/actions';

class LogradouroScreen extends Component {
    static navigationOptions = {
        title: 'Logradouros Screen',
    };

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const { getLogradouros } = this.props;
        const logradouros = getLogradouros();
        return (
            <Container>
                <Content padder>
                    <Content>
                        <FlatList
                            data={logradouros}
                            keyExtractor={(item) => `logradouro-${item.id}`}
                            renderItem={this.renderItem.bind(this)}
                        />
                    </Content>
                </Content>
            </Container>
        );
    }

    renderItem({ item }) {
        return (
            <ListItem>
                <Body>
                    <Text>{item.nome}</Text>
                    <Text note>{`Bairro ID: ${item.bairro_id}`}</Text>
                </Body>
            </ListItem>
        );
    }

    // onPressItem(item) {
    //     const { navigation } = this.props;
    //     navigation.navigate('PublicAreas', { fieldGroup: item.id });
    // }
}

const mapState = (state) => {
    const { Logradouros } = state;
    return { Logradouros };
};

export default connect(mapState, LogradouroActions)(LogradouroScreen);
