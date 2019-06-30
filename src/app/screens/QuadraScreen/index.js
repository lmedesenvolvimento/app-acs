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
            quadras: []
        };
    }

    componentDidMount() {
        const { getQuadrasByMicroareaID, navigation } = this.props;

        this.setState({
            quadras: getQuadrasByMicroareaID(navigation.getParam('microarea_id'))
        });
    }

    render() {
        const { state, props } = this;
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={this.onPressBack.bind(this)}>
                            <Icon name="ios-arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>{`Quadras - ${props.navigation.getParam('microarea_nome')}`}</Title>
                    </Body>
                    <Right />
                </Header>
                <FlatList
                    data={state.quadras}
                    ListEmptyComponent={this.renderEmptyContent}
                    keyExtractor={item => `quadra-${item.id}`}
                    renderItem={this.renderItem.bind(this)}
                />
            </Container>
        );
    }

    renderItem({ item }) {
        const { navigation } = this.props;
        return (
            <ListItem onPress={this.onPressItem.bind(this, item)}>
                <Body>
                    <Text>{item.nome}</Text>
                    <Text note>{navigation.getParam('microarea_nome')}</Text>
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
                quadra_id: item.key,
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
