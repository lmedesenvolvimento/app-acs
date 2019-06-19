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
    Item,
    Input,
    Icon,
} from 'native-base';

import { filter } from 'lodash';

import LogradouroActions from 'app/store/modules/Logradouros/actions';

export const contains = ({ nome }, query) => {
    if (nome.includes(query)) {
        return true;
    }
    return false;
};

class LogradouroScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            logradouros: [],
            data: []
        };
    }

    componentWillMount() {
        const { getLogradourosByBairroID, navigation } = this.props;
        const logradouros = getLogradourosByBairroID(
            navigation.state.params
                ? navigation.state.params.bairro_id
                : -1
        );

        this.setState({ logradouros, data: logradouros });
    }

    render() {
        const { state, props } = this;
        const { navigation } = props;

        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={this.onPressBack.bind(this)}>
                            <Icon name="ios-arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>{`Logradouros - ${navigation.state.params ? navigation.state.params.quadra_nome : 'Indefinido'}`}</Title>
                    </Body>
                    <Right />
                </Header>
                <FlatList
                    data={state.data}
                    renderItem={this.renderItem.bind(this)}
                    keyExtractor={this.keyExtractor}
                    ListEmptyComponent={this.renderEmptyContent}
                    ListHeaderComponent={this.renderListHeader}
                />
            </Container>
        );
    }

    keyExtractor = item => `logradouro-${item.id}`

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

    renderListHeader = () => {
        const { state } = this;
        return (
            <Header searchBar rounded>
                <Item>
                    <Icon name="ios-search" />
                    <Input
                        value={state.query}
                        placeholder="Search"
                        onChangeText={this.handleSearch}
                    />
                    <Icon name="ios-people" />
                </Item>
                <Button transparent>
                    <Text>Buscar</Text>
                </Button>
            </Header>
        );
    }

    renderEmptyContent() {
        return (
            <ListItem>
                <Body>
                    <Text>Logradouros vazios</Text>
                </Body>
            </ListItem>
        );
    }

    onPressBack() {
        const { navigation } = this.props;
        navigation.goBack();
    }

    filterByQuery(logradouro, query) {
        return logradouro.nome && logradouro.nome.match(query);
    }

    handleSearch = (query) => {
        const { state } = this;
        const data = filter(state.logradouros, l => contains(l, query));
        this.setState({ query, data });
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
