import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';

import {
    Text,
    Title,
    Container,
    Content,
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
                <Header>
                    <Left>
                        <Button transparent onPress={this.onPressBack.bind(this)}>
                            <Icon name="ios-arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Quadras</Title>
                    </Body>
                    <Right />
                </Header>
                <Content padder>
                    <Content>
                        <FlatList
                            data={quadras}
                            keyExtractor={item => `quadra-${item.id}`}
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

    onPressItem() {
        const { navigation } = this.props;
        setTimeout(navigation.navigate.bind(this, 'Logradouros'), 400);
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
