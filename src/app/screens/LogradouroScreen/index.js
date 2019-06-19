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
                <Header>
                    <Left>
                        <Button transparent onPress={this.onPressBack.bind(this)}>
                            <Icon name="ios-arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Logradouros</Title>
                    </Body>
                    <Right />
                </Header>
                <Content padder>
                    <Content>
                        <FlatList
                            data={logradouros}
                            keyExtractor={item => `logradouro-${item.id}`}
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

    onPressBack() {
        const { navigation } = this.props;
        navigation.goBack();
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
