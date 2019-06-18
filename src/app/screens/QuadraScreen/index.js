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


import QuadraActions from 'app/store/modules/Quadras/actions';

class QuadraScreen extends Component {
    static navigationOptions = {
        title: 'Quadras Screen',
    };

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const { getQuadras } = this.props;
        const quadras = getQuadras();
        return (
            <Container>
                <Content padder>
                    <Content>
                        <FlatList
                            data={quadras}
                            keyExtractor={(item) => `quadra-${item.id}`}
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
                    <Text note>{`MicroArea ID: ${item.micro_area_id}`}</Text>
                </Body>
            </ListItem>
        );
    }

    onPressItem(item) {
        const { navigation } = this.props;
        navigation.navigate('Logradouros');
    }
}

const mapState = (state) => {
    const { Quadras } = state;
    return { Quadras };
};

export default connect(mapState, QuadraActions)(QuadraScreen);
