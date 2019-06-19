import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';

import {
    Text,
    Title,
    Container,
    ListItem,
    Header,
    Left,
    Right,
    Body,
    Button,
    Icon,
} from 'native-base';

import QuadraActions from 'app/store/modules/Quadras/actions';

class QuadraScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const { getQuadrasByMicroareaID, navigation } = this.props;

        const quadras = getQuadrasByMicroareaID(
            navigation.state.params
                ? navigation.state.params.micro_area_id
                : -1
        );

        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={this.onPressBack.bind(this)}>
                            <Icon name="ios-arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>{`Quadras - ${navigation.state.params ? navigation.state.params.micro_area_nome : 'Indefinido'}`}</Title>
                    </Body>
                    <Right />
                </Header>
                <FlatList
                    data={quadras}
                    ListEmptyComponent={this.renderEmptyContent}
                    keyExtractor={item => `quadra-${item.id}`}
                    renderItem={this.renderItem.bind(this)}
                />
            </Container>
        );
    }

    renderItem({ item }) {
        return (
            <ListItem onPress={this.onPressItem.bind(this, item)}>
                <Body>
                    <Text>{item.nome}</Text>
                    <Text note>{`MicroArea ID: ${item.micro_area_id}`}</Text>
                </Body>
            </ListItem>
        );
    }

    renderEmptyContent() {
        return (
            <ListItem>
                <Body>
                    <Text>Quadras vazias</Text>
                </Body>
            </ListItem>
        );
    }

    onPressItem(item) {
        const { navigation } = this.props;
        setTimeout(() => {
            navigation.navigate('Logradouros', {
                bairro_id: item.bairro_id,
                quadra_nome: item.nome
            });
        }, 400);
    }

    onPressBack() {
        const { navigation } = this.props;
        navigation.goBack();
    }
}

const mapState = (state) => {
    const { Quadras } = state;
    return { Quadras };
};

export default connect(mapState, QuadraActions)(QuadraScreen);
