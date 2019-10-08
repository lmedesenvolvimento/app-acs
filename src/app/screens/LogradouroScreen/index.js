import React, { Component } from 'react';
import { FlatList, Alert, ScrollView } from 'react-native';
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

import SafeView from '@/components/SafeView';
import HeaderLeftButton from '@/components/HeaderLeftButton';
import BottomSheet from '@/components/BottomSheet';

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
        this.bottomSheet = null;
        this.state = {
            query: '',
            queryFocus: false,
            data: [],
            logradouros: [],
            logradouro: null
        };
    }

    componentWillMount() {
        const { navigation } = this.props;
        navigation.addListener('willFocus', this.defineProps);
    }

    render() {
        const { state, props } = this;
        return (
            <SafeView navigation={props.navigation} isModal={true}>
                { this.renderHeader() }
                { this.renderListHeader() }
                <FlatList
                    data={state.data}
                    renderItem={this.renderItem}
                    ListEmptyComponent={this.renderEmptyContent}
                    keyboardShouldPersistTaps="handled"
                />
                <Fab
                    style={[{ backgroundColor: Colors.warnColor }]}
                    onPress={this.onPressNewLogradouro}
                >
                    <Icon name="ios-add" />
                </Fab>
                <BottomSheet
                    ref={ref => this.bottomSheet = ref}
                >
                    <ScrollView>
                        <ListItem icon onPress={this.onPressEditLogradouro}>
                            <Left>
                                <Icon name="mode-edit" type="MaterialIcons" />
                            </Left>
                            <Body>
                                <Text>Editar</Text>
                            </Body>
                        </ListItem>
                        <ListItem icon onPress={this.onPressDestroyLogradouro}>
                            <Left>
                                <Icon active name="md-trash" />
                            </Left>
                            <Body>
                                <Text>Deletar</Text>
                            </Body>
                        </ListItem>
                        <ListItem icon onPress={() => this.bottomSheet.close()} last>
                            <Left>
                                <Icon active name="cancel" type="MaterialIcons" />
                            </Left>
                            <Body>
                                <Text>Cancelar</Text>
                            </Body>
                        </ListItem>
                    </ScrollView>
                </BottomSheet>
            </SafeView>
        );
    }

    renderItem = ({ item }) => {
        return (
            <ListItem
                onPress={() => this.onPressItem(item)}
                onLongPress={() => this.onLongPressItem(item)}
            >
                <Body>
                    <Text>{item.nome}</Text>
                    <Text note>{item.bairro ? item.bairro.nome : ''}</Text>
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
                <Header noShadow>
                    <Left>
                        <HeaderLeftButton icon onPress={this.onPressBack.bind(this)}>
                            <Icon name="ios-arrow-back" />
                        </HeaderLeftButton>
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
            <Header searchBar rounded noShadow>
                <Item>
                    {
                        state.query
                            ? <Icon name="arrow-back" onPress={this.clearSearch} />
                            : <Icon name="ios-search" />
                    }
                    <Input
                        autoCorrect={false}
                        placeholder="Insira o nome do Logradouro"
                        onBlur={this.onSerchBlur}
                        onFocus={this.onSerchFocus}
                        onChangeText={this.handleSearch}
                    >
                        {state.query}
                    </Input>
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

    defineProps = () => {
        const { props } = this;
        const quadra_key = props.navigation.getParam('quadra_key');
        const logradouros = props.getLogradourosByQuadra(quadra_key);
        this.setState({ logradouros, data: logradouros });
    }

    onPressBack() {
        const { navigation } = this.props;
        navigation.goBack();
    }

    onPressItem(logradouro) {
        const { props } = this;
        const logradouro_key = logradouro.key;
        const quadra_key = props.navigation.getParam('quadra_key');
        const quadra_logradouro = props.getQuadraLogradouro(quadra_key, logradouro_key);

        props.navigation.navigate('Domicilios', {
            quadra_logradouro_id: quadra_logradouro.id,
            quadra_logradouro_key: quadra_logradouro.key,
            logradouro_nome: logradouro.nome,
            quadra_key,
            logradouro
        });
    }

    onLongPressItem(logradouro) {
        if (!logradouro.id) {
            this.setState({ logradouro });
        }
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

    onPressNewLogradouro = () => {
        const { state, props } = this;
        const { navigation } = props;

        const payload = {
            model: {
                nome: state.query,
                quadra_key: props.navigation.getParam('quadra_key'),
                bairro: props.navigation.getParam('bairro')
            },
            title: 'Novo Logradouro',
            action: 'new'
        };

        setTimeout(() => {
            navigation.navigate('LogradouroForm', payload);
        }, 200);
    }

    onPressEditLogradouro = () => {
        const { props, state } = this;
        const { navigation } = props;

        const payload = {
            model: {
                key: state.logradouro.key,
                nome: state.logradouro.nome,
                tipo: state.logradouro.tipo,
                bairro: props.navigation.getParam('bairro'),
                quadra_key: props.navigation.getParam('quadra_key'),
            },
            title: 'Editar Logradouro',
            action: 'edit'
        };

        this.bottomSheet.close();

        setTimeout(() => {
            navigation.navigate('LogradouroForm', payload);
        }, 200);
    }

    onPressDestroyLogradouro = () => {
        this.bottomSheet.close();
        Alert.alert(
            'Deletar Logradouro',
            'Você realmente deseja apagar este logradouro? Essa ação é irreversível.',
            [
                { text: 'Não', style: 'cancel' },
                { text: 'Sim', onPress: () => this.destroyLogradouro(), style: 'destructive' },
            ]
        );
    }

    destroyLogradouro = () => {
        const { props, state } = this;
        props.destroyLogradouro(state.logradouro, props.navigation.getParam('quadra_key'));
        this.defineProps();
    }
}

const mapStateToProps = (state) => {
    const { Logradouros } = state;
    return { Logradouros };
};

export default connect(mapStateToProps, LogradouroActions)(LogradouroScreen);
