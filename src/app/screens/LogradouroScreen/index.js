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
import styles from './index.styl';

export const contains = ({ nome }, query) => {
    if (nome.toString().toLowerCase().includes(query)) {
        return true;
    }
    return false;
};

class LogradouroScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            queryFocus: false,
            data: [],
            logradouros: []
        };
    }

    componentWillMount() {
        const { props } = this;
        const quadra_id = props.navigation.getParam('quadra_id');
        const logradouros = props.getLogradourosByQuadra(quadra_id);
        this.setState({ logradouros, data: logradouros });
    }

    render() {
        return (
            <Container>
                { this.renderHeader() }
                { this.renderListHeader() }
                { this.renderLograFlatList() }
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

    renderLograFlatList = () => {
        const { state } = this;
        return (
            <FlatList
                data={state.data}
                renderItem={this.renderItem}
                ListEmptyComponent={this.renderEmptyContent}
                keyExtractor={this.keyExtractor}
                keyboardShouldPersistTaps="handled"
            />
        );
    }

    renderEmptyContent = () => {
        return (
            <Container style={styles.emptyContainer}>
                <Icon name="mood-bad" type="MaterialIcons" style={styles.emptyContainerIcon} />
                <Text style={[styles.emptyContainerText, { color: Colors.primaryColor }]}>
                    Oh, não! Você não tem nenhum logradouro cadastrado.
                </Text>
                <Text note style={styles.emptyContainerText}>
                    Começe já a adicionar as localizações.
                </Text>
            </Container>
        );
    }

    renderFab = () => {
        return (
            <Fab
                style={[{ backgroundColor: Colors.warnColor }]}
                onPress={this.onPressNewLogradouro}
            >
                <Icon name="ios-add" />
            </Fab>
        );
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
        this.searchInput._root.focus();
    }

    handleSearch = (query) => {
        const { state } = this;
        const data = filter(state.logradouros, l => contains(l, query.toLowerCase()));
        this.setState({ query, data });
    }

    clearSearch = () => {
        this.handleSearch('');
    }

    // onPressItem(item) {
    // const { navigation } = this.props;
    // navigation.navigate('PublicAreas', { fieldGroup: item.id });
    // }

    onPressNewLogradouro = () => {
        const { state, props } = this;
        const { navigation } = props;

        const payload = {
            model: {
                nome: state.query,
                bairro_id: props.navigation.getParam('bairro_id')
            },
            title: 'Novo Logradouro'
        };

        setTimeout(() => navigation.navigate('LogradouroForm', payload), 400);
    }
}

const mapStateToProps = (state) => {
    const { Logradouros } = state;
    return { Logradouros };
};

export default connect(mapStateToProps, LogradouroActions)(LogradouroScreen);
