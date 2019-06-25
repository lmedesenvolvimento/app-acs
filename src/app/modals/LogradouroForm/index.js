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
    Label,
    ListItem,
    Picker,
    Text,
    Body,
    Right,
} from 'native-base';

import { View, FlatList } from 'react-native';

import LightHeader from '@/components/LightHeader';
import LightFooter from '@/components/LightFooter';
import actions from '@redux/modules/Logradouros/actions';
import Colors from '@/constants/Colors';
import { Logradouro as Types } from '@/types';

import { filter } from 'lodash';

import styles from './index.styl';

export const contains = ({ nome }, query) => {
    if (nome.toLowerCase().includes(query)) {
        return true;
    }
    return false;
};

class LogradouroFormScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nome: '',
            bairro_id: null,
            tipo: Types.tipos.rua,
            tipos: Types.tipos,
            nomeFocus: false,
            logradouros: [],
        };
    }

    keyExtractor = item => `logradouro-${item.id}`


    componentWillMount() {
        const { props } = this;
        const { navigation } = props;
        this.setState({ ...navigation.getParam('model') });
    }

    componentDidMount() {
        this.handleSearch('');
    }

    render() {
        const { props, state } = this;
        const { navigation } = props;
        return (
            <Container>
                <LightHeader navigation={navigation} title={navigation.getParam('title')}>
                    <Left>
                        <Button transparent onPress={this.goBack}>
                            <Icon name="ios-arrow-back" style={{ color: Colors.textColor }} />
                        </Button>
                    </Left>
                </LightHeader>
                <Container style={styles.container}>
                    <Form style={styles.formContainer}>
                        <View style={styles.inputGroup}>
                            <Item stackedLabel last>
                                <Label>Nome</Label>
                                <Input
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
                            : (
                                <FlatList
                                    data={state.logradouros}
                                    renderItem={this.renderItem}
                                    keyExtractor={this.keyExtractor}
                                />
                            )
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
                        <Button transparent block small>
                            <Text style={{ color: Colors.textColor }}>Salvar</Text>
                        </Button>
                    </Right>
                </LightFooter>
            </Container>
        );
    }

    goBack = () => {
        const { navigation } = this.props;
        navigation.goBack();
    }

    renderFormFields = () => {
        const { state } = this;
        return (
            <View>
                <View style={styles.inputGroup}>
                    <Item stackedLabel last>
                        <Label>Bairro</Label>
                        <Input value={state.bairro_id ? state.bairro_id.toString() : ''} disabled />
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

    renderItem = ({ item }) => {
        return (
            <ListItem last>
                <Body>
                    <Text>{item.nome}</Text>
                    <Text note>{`Bairro ID: ${item.bairro_id}`}</Text>
                </Body>
            </ListItem>
        );
    }

    onNomeBlur = () => {
        this.setState({ nomeFocus: false });
    }

    onNomeFocus = () => {
        this.setState({ nomeFocus: true });
    }

    handleSearch = (nome) => {
        const { props } = this;
        const { bairro_id } = props.navigation.getParam('model');
        const data = props.getLogradourosByBairroID(bairro_id);
        const logradouros = filter(data, l => contains(l, nome.toLowerCase()));
        this.setState({ nome, logradouros });
    }
}

const mapStateToProps = ({ Logradouro }) => ({
    Logradouro,
});

export default connect(mapStateToProps, actions)(LogradouroFormScreen);
