import React, { Component } from 'react';
import { FlatList, Alert } from 'react-native';
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
    Icon,
    Fab,
    Button
} from 'native-base';

import LogradouroActions from '@redux/modules/Logradouros/actions';
import DomiciliosActions from '@redux/modules/Domicilios/actions';

import Colors from '@/constants/Colors';

import SafeView from '@/components/SafeView';
import HeaderLeftButton from '@/components/HeaderLeftButton';

import { Domicilio } from '@/types';

import styles from './index.styl';

class DomicilioScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            domicilios: []
        };
    }

    componentWillMount() {
        const { navigation } = this.props;
        navigation.addListener('willFocus', this.defineProps);
    }

    componentDidMount() {
        const { props } = this;
        const title = props.navigation.getParam('logradouro_nome');
        this.setState({ title });
    }

    render() {
        const { state, props } = this;
        return (
            <SafeView navigation={props.navigation} isModal={true}>
                <Header noShadow>
                    <Left>
                        <HeaderLeftButton icon onPress={this.onPressBack.bind(this)}>
                            <Icon name="ios-arrow-back" />
                        </HeaderLeftButton>
                    </Left>
                    <Body>
                        <Title>{state.title || 'Indefinido'}</Title>
                    </Body>
                    <Right>
                        {
                            !props.navigation.getParam('quadra_logradouro_id') ? (
                                <Button icon transparent onPress={this.onPressEditLogradouro}>
                                    <Icon name="mode-edit" type="MaterialIcons" />
                                </Button>
                            ) : null
                        }
                        {
                            !props.navigation.getParam('quadra_logradouro_id') ? (
                                <Button icon transparent onPress={this.onPressDestroyLogradouro}>
                                    <Icon name="trash" />
                                </Button>
                            ) : null
                        }
                    </Right>
                </Header>
                <FlatList
                    data={state.domicilios}
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
            </SafeView>
        );
    }

    renderItem = ({ item }) => {
        return (
            <ListItem iconLeft onPress={() => this.onPressDomicilio(item)}>
                <Icon name="md-pin" type="Ionicons" />
                <Body>
                    <Text>
                        {`Nº ${item.end_numero}`}
                    </Text>
                    <Text note>
                        {this.renderDomicilioComplement(item)}
                    </Text>
                </Body>
            </ListItem>
        );
    }

    renderEmptyContent = () => {
        return (
            <Container style={styles.emptyContainer}>
                <Icon name="mood-bad" type="MaterialIcons" style={styles.emptyContainerIcon} />
                <Text style={[styles.emptyContainerText, { color: Colors.primaryColor }]}>
                    Oh, não! Você não tem nenhum domicilio cadastrado.
                </Text>
                <Text note style={styles.emptyContainerText}>
                    Começe já a adicionar os domicilios.
                </Text>
            </Container>
        );
    }

    renderDomicilioComplement = (item) => {
        const sentence = [];

        if (item && item.cm_tipo) {
            sentence.push(Domicilio.cm_tipos[item.cm_tipo]);
        } else {
            sentence.push('Não Informado');
        }

        if (item && item.end_complement) {
            sentence.push(item.end_complement);
        }

        return sentence.join(' - ');
    }

    defineProps = () => {
        const { props } = this;
        const quadra_logradouro_key = props.navigation.getParam('quadra_logradouro_key');
        const domicilios = props.getDomiciliosByQuadraLogradouro(quadra_logradouro_key);
        this.setState({ domicilios });
    }

    onPressBack() {
        const { navigation } = this.props;
        navigation.goBack();
    }

    onPressDomicilio = (domicilio) => {
        const { navigation } = this.props;
        const logradouro = navigation.getParam('logradouro');
        navigation.navigate('Individuos', { domicilio, logradouro });
    }

    onPressNewLogradouro = () => {
        const { props } = this;
        const { navigation } = props;
        const logradouro = props.navigation.getParam('logradouro');

        const payload = {
            model: {
                logradouro_nome: logradouro ? logradouro.nome : '',
                quadra_logradouro_key: props.navigation.getParam('quadra_logradouro_key'),
            },
            title: 'Cadastro Domiciliar',
            action: 'new'
        };

        setTimeout(() => {
            navigation.navigate('DomiciliosForm', payload);
        }, 200);
    }

    onPressEditLogradouro = () => {
        const { props } = this;
        const { navigation } = props;
        const logradouro = navigation.getParam('logradouro');

        const payload = {
            model: {
                key: logradouro.key,
                nome: logradouro.nome,
                tipo: logradouro.tipo,
                bairro: logradouro.bairro,
                quadra_key: props.navigation.getParam('quadra_key'),
                quadra_logradouro_key: props.navigation.getParam('quadra_logradouro_key'),
            },
            title: 'Editar Logradouro',
            action: 'edit',
            returnData: this.onReturnDataEdit
        };

        setTimeout(() => {
            navigation.navigate('LogradouroForm', payload);
        }, 200);
    }

    onPressDestroyLogradouro = () => {
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
        const { props } = this;

        props.destroyLogradouro(
            props.navigation.getParam('logradouro'),
            props.navigation.getParam('quadra_logradouro_key')
        );

        props.navigation.goBack();
    }

    onReturnDataEdit = (title) => {
        this.setState({ title });
    }
}

const mapStateToProps = (state) => {
    const { Domicilios } = state;
    return { Domicilios };
};


const mapDispatchToProps = (dispatch) => {
    return Object.assign(
        DomiciliosActions(dispatch),
        LogradouroActions(dispatch)
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(DomicilioScreen);
