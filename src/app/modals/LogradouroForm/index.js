import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    Container,
    Button,
    Left,
    Icon,
    Form,
    Item,
    Input,
    ListItem,
    Label,
    Picker,
    Text,
    Body,
    Right,
    Card,
} from 'native-base';

import { View, FlatList, Alert } from 'react-native';

import LightHeader from '@/components/LightHeader';
import LightFooter from '@/components/LightFooter';
import SafeView from '@/components/SafeView';
import HeaderLeftButton from '@/components/HeaderLeftButton';

import actions from '@redux/modules/Logradouros/actions';
import Colors from '@/constants/Colors';

import { Logradouro as Types } from '@/types';

import { filter, find } from 'lodash';

import styles from './index.styl';

export const contains = ({ nome }, query) => {
    if (nome.toString().toLowerCase().includes(query)) {
        return true;
    }
    return false;
};

class LogradouroFormScreen extends Component {
    inputNome = null;
    keyExtractor = item => `logradouro-${item.id}`;

    constructor(props) {
        super(props);
        this.state = {
            nome: '',
            bairro: null,
            quadra_key: null,
            tipo: Types.tipos.rua,
            tipos: Types.tipos,
            nomeFocus: false,
            logradouros: [],
            errors: {}
        };
    }

    componentWillMount() {
        const { props } = this;
        const { navigation } = props;
        this.setState({ ...navigation.getParam('model') });
    }

    componentDidMount() {
        this.fetchLogradouros();
    }

    render() {
        const { props, state } = this;
        const { navigation } = props;
        return (
            <SafeView navigation={navigation} light={true}>
                <LightHeader navigation={navigation} title={navigation.getParam('title')}>
                    <Left>
                        <HeaderLeftButton icon onPress={this.goBack}>
                            <Icon name="ios-arrow-back" style={{ color: Colors.textColor }} />
                        </HeaderLeftButton>
                    </Left>
                </LightHeader>
                <Container style={styles.container}>
                    <Form style={styles.formContainer}>
                        <View style={styles.inputGroup}>
                            <Item stackedLabel last error={state.errors.nome}>
                                <Label>Nome</Label>
                                <Input
                                    ref={ref => this.inputNome = ref}
                                    autoCorrect={false}
                                    placeholder="Insira o nome do Logradouro"
                                    value={state.nome}
                                    onBlur={this.onNomeBlur}
                                    onFocus={this.onNomeFocus}
                                    onChangeText={this.handleSearch}
                                />
                            </Item>
                        </View>
                        {
                            !state.nomeFocus
                                ? this.renderFormFields()
                                : this.renderLograFlatlist()
                        }
                    </Form>
                </Container>
                <LightFooter>
                    <Left>
                        <Button transparent block small onPress={this.goBack}>
                            <Text style={{ color: Colors.textColor }}>Cancelar</Text>
                        </Button>
                    </Left>
                    <Body />
                    <Right>
                        <Button transparent block small onPress={this.submitForm}>
                            <Text style={{ color: Colors.textColor }}>Salvar</Text>
                        </Button>
                    </Right>
                </LightFooter>
            </SafeView>
        );
    }

    goBack = () => {
        const { state, props } = this;

        props.navigation.goBack();

        setTimeout(() => {
            props.navigation.setParams({ logradouro_nome: state.nome });
        }, 200);
    }

    submitForm = () => {
        const { props } = this;
        if (props.navigation.getParam('action') === 'new') {
            return this.create();
        }

        if (props.navigation.getParam('action') === 'edit') {
            return this.update();
        }

        return null;
    }

    create = () => {
        const { state, props } = this;

        const logradourosByQuadras = props.getLogradourosByQuadra(state.quadra_key);
        const logradourosByBairro = props.getLogradourosByBairroID(state.bairro.id);
        const isHasInLograsByQuadras = filter(logradourosByQuadras, { nome: state.nome }).length;
        const isHasInLograsByBairro = filter(logradourosByBairro, { nome: state.nome }).length;

        const errors = {};

        let logradouro = {};


        if (isHasInLograsByQuadras) {
            errors.nome = true;
            Alert.alert(
                'Falha ao tentar salvar Logradouro.',
                'Nome de logradouro já existe para esta Quadra.'
            );

            this.setState({ errors });
            return;
        }

        if (isHasInLograsByBairro) {
            logradouro = {
                ...find(logradourosByBairro, { nome: state.nome }),
                _action: props.navigation.getParam('action')
            };
        } else {
            logradouro = {
                nome: state.nome,
                bairro: state.bairro,
                tipo: state.tipo,
                _action: props.navigation.getParam('action')
            };
        }

        props.createLogradouro(logradouro, state.quadra_key);
        setTimeout(this.goBack, 200);
    }

    update = () => {
        const { state, props } = this;

        const logradourosByQuadras = props.getLogradourosByQuadra(state.quadra_key);
        const logradourosByBairro = props.getLogradourosByBairroID(state.bairro.id);
        const isHasInLograsByQuadras = filter(logradourosByQuadras, { nome: state.nome }).length;
        const isHasInLograsByBairro = filter(logradourosByBairro, { nome: state.nome }).length;

        let logradouro = {};

        const currentName = props.navigation.getParam('model').nome;
        const errors = {};


        if (state.nome !== currentName && isHasInLograsByQuadras) {
            errors.nome = true;
            Alert.alert(
                'Falha ao tentar salvar Logradouro.',
                'Nome de logradouro já existe para esta Quadra.'
            );

            this.setState({ errors });
            return;
        }

        if (isHasInLograsByBairro) {
            logradouro = {
                ...find(logradourosByBairro, { nome: state.nome }),
                _action: props.navigation.getParam('action')
            };
        } else {
            logradouro = {
                key: state.key,
                nome: state.nome,
                bairro: state.bairro,
                tipo: state.tipo,
                _action: props.navigation.getParam('action')
            };
        }

        props.updateLogradouro(
            props.navigation.getParam('model').quadra_logradouro_key,
            {
                quadra_key: state.quadra_key,
                logradouro
            }
        );

        props.navigation.getParam('returnData')(state.nome);

        setTimeout(this.goBack, 600);
    }

    renderFormFields = () => {
        const { state } = this;
        return (
            <View>
                <View style={styles.inputGroup}>
                    <Item stackedLabel last>
                        <Label>Bairro</Label>
                        <Input
                            autoCorrect={false}
                            value={state.bairro ? state.bairro.nome : ''}
                            disabled
                        />
                    </Item>
                </View>
                <View style={styles.pickGroup}>
                    <Item picker>
                        <Picker
                            mode="dropdown"
                            iosIcon={<Icon name="arrow-down" />}
                            style={{ width: undefined }}
                            placeholder="Selecione o tipo do Logradouro"
                            placeholderIconColor="#007aff"
                            selectedValue={state.tipo}
                            onValueChange={tipo => this.setState({ tipo })}
                        >
                            <Picker.Item label="Rua" value={state.tipos.rua} />
                            <Picker.Item label="Avenida" value={state.tipos.avenida} />
                            <Picker.Item label="Outros" value={state.tipos.outros} />
                        </Picker>
                    </Item>
                </View>
            </View>
        );
    }

    renderLograFlatlist = () => {
        const { state } = this;
        return (
            <Card style={styles.selectCard}>
                <FlatList
                    data={state.logradouros}
                    renderItem={this.renderItem}
                    ListEmptyComponent={this.renderLograFlatlistEmptyContent}
                    keyExtractor={this.keyExtractor}
                    keyboardShouldPersistTaps="handled"
                />
            </Card>
        );
    }

    renderLograFlatlistEmptyContent = () => {
        return (
            <ListItem
                style={styles.selectCardItem}
                last
            >
                <Body>
                    <Text note style={styles.selectCardUnfoundText}>
                        Nenhum resultado encontrado.
                    </Text>
                </Body>
            </ListItem>
        );
    }

    renderItem = ({ item }) => {
        return (
            <ListItem
                style={styles.selectCardItem}
                onPress={() => this.onPressItem(item)}
                last
            >
                <Body>
                    <Text>{item.nome}</Text>
                </Body>
            </ListItem>
        );
    }

    onPressItem = ({ nome }) => {
        this.inputNome._root.blur();
        this.setState({ nome });
    }

    onNomeBlur = () => {
        this.setState({ nomeFocus: false });
    }

    onNomeFocus = () => {
        this.setState({ nomeFocus: true });
    }

    fetchLogradouros = () => {
        const { props, state } = this;
        const logradouros = props.getLogradourosByBairroID(state.bairro.id);
        this.setState({ logradouros });
    }

    handleSearch = (nome) => {
        const { props, state } = this;
        const data = props.getLogradourosByBairroID(state.bairro.id);
        const logradouros = filter(data, l => contains(l, nome.toLowerCase()));
        this.setState({ nome, logradouros });
    }
}

const mapStateToProps = ({ Logradouro }) => ({
    Logradouro,
});

export default connect(mapStateToProps, actions)(LogradouroFormScreen);
