import React from 'react';
import { Alert, SectionList } from 'react-native';
import { connect } from 'react-redux';
// import { createSelector } from 'reselect';

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
    List,
    ListItem,
    Separator,
    Container,
} from 'native-base';

import { pick } from 'lodash';

import Colors from '@/constants/Colors';

import SafeView from '@/components/SafeView';
import HeaderLeftButton from '@/components/HeaderLeftButton';

import RBSheet from 'react-native-raw-bottom-sheet';

import styles from './index.styl';

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

class IndividuoScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            domicilio: {},
            individuo: {},
            individuos: [
                {
                    key: 'not_visited',
                    title: 'Não Visitadas',
                    data: []
                },
                {
                    key: 'visited',
                    title: 'Visitadas',
                    data: []
                },
            ]
        };

        this.RBSheet = null;
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
                            onEditSubmit={this.onEditSubmitDomicilio}
                            {...props}
                        />
                        <ButtonRemoveDomicilio
                            domicilio={domicilio}
                            {...props}
                        />
                    </Right>
                </Header>
                <SectionList
                    sections={individuos}
                    extraData={state}
                    renderItem={this.renderItem}
                    renderEmptyContent={this.renderEmptyContent}
                    renderSectionHeader={this.renderSectionHeader}
                    ListEmptyComponent={EmptyContentIndividuosList}
                />
                <Fab
                    style={[{ backgroundColor: Colors.warnColor }]}
                    onPress={this.onPressNewIndividuo}
                >
                    <Icon name="ios-add" />
                </Fab>
                <RBSheet
                    ref={ref => this.RBSheet = ref}
                    height={300}
                    duration={250}
                >
                    <List>
                        {(() => {
                            if (this.canVisit()) {
                                return (
                                    <ListItem
                                        onPress={() => this.onPressNewVisita(state.individuo)}
                                    >
                                        <Body>
                                            <Text>Realizar Visita</Text>
                                        </Body>
                                    </ListItem>
                                );
                            }
                            return null;
                        })()}
                        <ListItem onPress={() => this.onPressEditIndividuo(state.individuo)}>
                            <Body>
                                <Text>Editar</Text>
                            </Body>
                        </ListItem>
                        <ListItem onPress={() => this.onPressDestroyIndividuo(state.individuo)}>
                            <Body>
                                <Text>Excluir</Text>
                            </Body>
                        </ListItem>
                    </List>
                </RBSheet>
            </SafeView>
        );
    }

    renderEmptyContent = () => {
        return (
            <Container style={styles.emptyContainer}>
                <Icon name="mood-bad" type="MaterialIcons" style={styles.emptyContainerIcon} />
                <Text style={[styles.emptyContainerText, { color: Colors.primaryColor }]}>
                    Oh, não! Você não tem nenhum indivíduo cadastrado.
                </Text>
                <Text note style={styles.emptyContainerText}>
                    Começe já a adicionar os individuos.
                </Text>
            </Container>
        );
    }

    renderItem = ({ item }) => {
        return (
            <ListItem iconLeft onPress={() => this.onPressItem(item)}>
                <Icon name="address-card" type="FontAwesome" />
                <Body>
                    <Text>{item.iden_cns}</Text>
                    <Text note>{`${item.iden_nome} - Total Visitas ${item.visita ? item.visita.total : '0'} DEBUG`}</Text>
                </Body>
            </ListItem>
        );
    }

    renderSectionHeader = ({ section: { title, data } }) => {
        if (data.length) {
            return (
                <Separator bordered>
                    <Text uppercase>{title}</Text>
                </Separator>
            );
        }
        return null;
    };

    defineProps = () => {
        const { navigation, getVisitedIndividuos, getNotVisitedIndividuos } = this.props;
        const { individuos } = this.state;

        const domicilio = navigation.getParam('domicilio');

        individuos[0].data = getNotVisitedIndividuos(domicilio.key);
        individuos[1].data = getVisitedIndividuos(domicilio.key);

        this.setState({ individuos, domicilio });
    }

    onEditSubmitDomicilio = (domicilio) => {
        const { navigation } = this.props;
        navigation.setParams({ ...navigation.state.params, domicilio });
        this.defineProps();
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

    onPressNewVisita = (individuo) => {
        const { navigation } = this.props;
        const { action } = this.canVisit();

        let model = Object.assign({}, { individuo: pick(individuo, ['key', 'iden_nome']) });

        if (action === 'edit') {
            model = { ...model, ...individuo.visita };
        }

        const payload = {
            model,
            action,
            onSubmit: this.defineProps
        };

        this.RBSheet.close();

        navigation.navigate('VisitaForm', payload);
    };

    onPressEditIndividuo = (individuo) => {
        const { navigation } = this.props;
        const domicilio = navigation.getParam('domicilio');
        const payload = {
            model: Object.assign({}, individuo, { domicilio: pick(domicilio, ['key', 'end_numero']) }),
            title: 'Editar Individuo',
            action: 'edit',
            onSubmit: this.defineProps
        };
        this.RBSheet.close();
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
        this.RBSheet.close();
        destroyIndividuo(key);
        this.defineProps(); // force reload flatlist
    }

    onPressBack = () => {
        const { navigation } = this.props;
        navigation.goBack();
    };

    onPressItem = (individuo) => {
        this.setState({ individuo });
        this.RBSheet.open();
    };

    canVisit = () => {
        const { individuo } = this.state;
        const { visita } = individuo;

        if (!visita) return { can: true, action: 'new' };

        if (visita.id && visita.desfecho === 'visita_realizada') {
            return false;
        }

        return { can: true, action: 'edit' };
    }
}

const mapDispatchToProps = (dispatch) => {
    return Object.assign({}, DomiciliosActions(dispatch), IndividuosActions(dispatch));
};

// DomiciliosActions
export default connect(null, mapDispatchToProps)(IndividuoScreen);
