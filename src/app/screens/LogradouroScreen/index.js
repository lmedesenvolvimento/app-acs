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
    Fab
} from 'native-base';

import { filter } from 'lodash';

import LogradouroActions from '@redux/modules/Logradouros/actions';

import Colors from '@/constants/Colors';

export const contains = ({ nome }, query) => {
    if (nome.toLowerCase().includes(query)) {
        return true;
    }
    return false;
};

class LogradouroScreen extends Component {
    searchInput = null;
    headerView = null;

    constructor(props) {
        super(props);
        this.state = {
            query: '',
            queryFocus: false,
            data: [],
        };
    }

    render() {
        const { state, props } = this;
        const bairro_id = props.navigation.state.params.bairro_id
        const logradouros = props.getLogradourosByBairroID(bairro_id);
        return (
            <Container>
                { this.renderHeader() }
                <FlatList
                    data={state.query ? state.data : logradouros}
                    renderItem={this.renderItem}
                    keyExtractor={this.keyExtractor}
                    ListEmptyComponent={this.renderEmptyContent}
                    ListHeaderComponent={this.renderListHeader}
                />
                { this.renderFab() }
            </Container>
        );
    }

    keyExtractor = item => `logradouro-${item.id}`

    renderItem = ({ item }) => {
        return (
            <ListItem>
                <Body>
                    <Text>{item.nome}</Text>
                    <Text note>{`Bairro ID: ${item.bairro_id}`}</Text>
                </Body>
            </ListItem>
        );
    }

    renderHeader = () => {
        const { state, props } = this;
        const { navigation } = props;
        const isVisible = !state.queryFocus && !state.query;

        if (isVisible) {
            return (
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
            );
        }

        return null;
    }

    renderListHeader = () => {
        const { state } = this;
        return (
            <Header searchBar rounded>
                <Item>
                    {
                        state.query
                            ? <Icon name="arrow-back" onPress={this.clearSearch} />
                            : <Icon name="ios-search" />
                    }
                    <Input
                        ref={ref => { this.searchInput = ref }}
                        value={state.query}
                        placeholder="Insira o nome do Logradouro"
                        onBlur={this.onSerchBlur}
                        onFocus={this.onSerchFocus}
                        onChangeText={this.handleSearch}
                    />
                    <Icon name="md-business" />
                </Item>
                <Button transparent>
                    <Text>Buscar</Text>
                </Button>
            </Header>
        );
    }

    renderEmptyContent = () => {
        return (
            <ListItem icon onPress={this.onPressNewLogradouro}>
                <Left>
                    <Icon name="ios-add-circle" />
                </Left>
                <Body>
                    <Text>Criar novo Logradouro</Text>
                </Body>
            </ListItem>
        );
    }

    renderFab = () => {
        const { state } = this;
        const isVisible = !state.queryFocus && !state.query;
        if (isVisible) {
            return (
                <Fab style={[{ backgroundColor: Colors.amber700 }]} onPress={this.triggerSearchFocus}>
                    <Icon name="ios-add" />
                </Fab>
            );
        }
        return null;
    }

    onPressBack() {
        const { navigation } = this.props;
        navigation.goBack();
    }

    onSerchFocus = () => {
        this.setState({ queryFocus: true });
    }

    onSerchBlur = () => {
        this.setState({ queryFocus: false });
    }

    triggerSearchFocus = () => {
        this.searchInput._root.focus()
    }

    handleSearch = (query) => {
        const { props } = this;
        const bairro_id = props.navigation.state.params.bairro_id
        const logradouros = props.getLogradourosByBairroID(bairro_id);
        const data = filter(logradouros, l => contains(l, query.toLowerCase()));
        this.setState({ query, data });
    }

    clearSearch = () => {
        this.handleSearch('')
    }

    // onPressItem(item) {
    // const { navigation } = this.props;
    // navigation.navigate('PublicAreas', { fieldGroup: item.id });
    // }

    onPressNewLogradouro = () => {
        const { state, props } = this;
        const { navigation } = props;
        const bairro_id = props.navigation.state.params.bairro_id
        console.log('onPressNewLogradouro')
        navigation.navigate('LogradouroForm', { logradouro: { nome: state.query, bairro_id: bairro_id}, title: 'Novo Logradouro' });
    }
}

const mapState = (state) => {
    const { Logradouros } = state;
    return { Logradouros };
};

export default connect(mapState, LogradouroActions)(LogradouroScreen);
