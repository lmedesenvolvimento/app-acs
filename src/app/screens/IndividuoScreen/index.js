import React from 'react';
import { Alert, FlatList } from 'react-native';
import { connect } from 'react-redux';

import DomiciliosActions from '@redux/modules/Domicilios/actions';
import IndividuosActions from '@redux/modules/Individuos/actions';

import {
    Text,
    Title,
    Header,
    Left,
    Icon,
    Body,
    Fab,
    Button,
    Right,
    ListItem
} from 'native-base';

import { pick } from 'lodash';


import Colors from '@/constants/Colors';

import SafeView from '@/components/SafeView';
import HeaderLeftButton from '@/components/HeaderLeftButton';

const ButtonEditDomicilio = (props) => {
    const { navigation } = props;
    const { domicilio, onEditSubmit } = props;

    const logradouro = navigation.getParam('logradouro');

    const onPressEditDomicilio = () => {
        const payload = {
            model: {
                logradouro_nome: logradouro ? logradouro.nome : '',
                ...domicilio
            },
            title: 'Cadastro Domiciliar',
            action: 'edit',
            onSubmit: onEditSubmit
        };

        navigation.navigate('DomiciliosForm', payload);
    };

    if (!navigation.getParam('id')) {
        return (
            <Button icon transparent onPress={onPressEditDomicilio}>
                <Icon name="mode-edit" type="MaterialIcons" />
            </Button>
        );
    }

    return null;
};

const ButtonRemoveDomicilio = ({ navigation, domicilio, destroyDomicilios }) => {
    const onPressRemoveDomicilio = () => {
        Alert.alert(
            'Remover Domicílio',
            'Você realmente deseja apagar este domicílio? Esta ação é irreversível.',
            [
                { text: 'Não', style: 'cancel' },
                { text: 'Sim', onPress: onConfirmRemoveDomicilio, style: 'destructive' },
            ]
        );
    };

    const onConfirmRemoveDomicilio = () => {
        destroyDomicilios(domicilio.key);
        navigation.goBack();
    };

    if (!navigation.getParam('id')) {
        return (
            <Button icon transparent onPress={onPressRemoveDomicilio}>
                <Icon name="trash" />
            </Button>
        );
    }

    return null;
};

const EmptyContentIndividuosList = () => (
    <Text note>Este domicílo não possui nenhum individuo cadastrado</Text>
);

class IndividuoScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            domicilio: {},
            individuos: []
        };
    }

    componentWillMount() {
        const { navigation } = this.props;
        navigation.addListener('willFocus', this.defineProps);
    }

    componentDidMount() {
        const { navigation } = this.props;
        const domicilio = navigation.getParam('domicilio');
        this.setState({ domicilio });
    }

    render() {
        const { props, state } = this;
        const { navigation } = props;
        const { domicilio, individuos } = state;

        return (
            <SafeView navigation={navigation} isModal={true}>
                <Header noShadow>
                    <Left>
                        <HeaderLeftButton icon onPress={this.onPressBack}>
                            <Icon name="ios-arrow-back" />
                        </HeaderLeftButton>
                    </Left>
                    <Body>
                        <Title>{`Domicílio - ${domicilio.end_numero}`}</Title>
                    </Body>
                    <Right>
                        <ButtonEditDomicilio
                            domicilio={domicilio}
                            onEditSubmit={this.onEditSubmit}
                            {...props}
                        />
                        <ButtonRemoveDomicilio
                            domicilio={domicilio}
                            {...props}
                        />
                    </Right>
                </Header>
                <FlatList
                    data={individuos}
                    extraData={state}
                    renderItem={this.renderItem}
                    ListEmptyComponent={EmptyContentIndividuosList}
                />
                <Fab
                    style={[{ backgroundColor: Colors.warnColor }]}
                    onPress={this.onPressNewIndividuo}
                >
                    <Icon name="ios-add" />
                </Fab>
            </SafeView>
        );
    }

    renderItem = ({ item }) => {
        return (
            <ListItem onPress={() => this.onPressItem(item)}>
                <Body>
                    <Text>{item.iden_cns}</Text>
                    <Text note>{item.iden_nome}</Text>
                </Body>
            </ListItem>
        );
    }

    defineProps = () => {
        const { navigation, getIndividuosByDomicilio } = this.props;

        const domicilio = navigation.getParam('domicilio');
        const individuos = getIndividuosByDomicilio(domicilio.key);

        this.setState({ individuos });
    }

    onPressNewIndividuo = () => {
        const { navigation } = this.props;
        const domicilio = navigation.getParam('domicilio');

        const payload = {
            model: { domicilio: pick(domicilio, ['key', 'end_numero']) },
            title: 'Cadastro Individuo',
            action: 'new'
        };

        setTimeout(() => {
            navigation.navigate('IndividuosForm', payload);
        }, 200);
    };

    onPressEditIndividuo = (individuo) => {
        const { navigation } = this.props;
        const domicilio = navigation.getParam('domicilio');
        const payload = {
            model: Object.assign({}, individuo, { domicilio: pick(domicilio, ['key', 'end_numero']) }),
            title: 'Editar Individuo',
            action: 'edit',
            onSubmit: this.onEditSubmit
        };

        navigation.navigate('IndividuosForm', payload);
    }

    onPressDestroyIndividuo = (individuo) => {
        Alert.alert(
            'Deletar Individuo',
            'Você deseja realmente excluir este indivíduo?',
            [
                { text: 'Sim', onPress: () => this.onConfirmDestroyIndividuo(individuo), style: 'destructive' },
                { text: 'Não', style: 'cancel' },
            ]
        );
    }

    onConfirmDestroyIndividuo = ({ key }) => {
        const { destroyIndividuo } = this.props;
        destroyIndividuo(key);
        this.defineProps(); // force reload flatlist
    }

    onPressBack = () => {
        const { navigation } = this.props;
        navigation.goBack();
    };

    onEditSubmit = () => {
        return false;
    };

    onPressItem = (item) => {
        Alert.alert(
            'Ações',
            'Escolha uma ação para o indivíduo',
            [
                { text: 'Excluir', onPress: () => this.onPressDestroyIndividuo(item), style: 'destructive' },
                { text: 'Editar', onPress: () => this.onPressEditIndividuo(item) },
                { text: 'Cancelar', style: 'cancel' },
            ]
        );
    };
}

const mapDispatchToProps = (dispatch) => {
    return Object.assign({}, DomiciliosActions(dispatch), IndividuosActions(dispatch));
};

// DomiciliosActions
export default connect(null, mapDispatchToProps)(IndividuoScreen);
