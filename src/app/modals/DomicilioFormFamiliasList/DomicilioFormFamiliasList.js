import React from 'react';

import {
    Text,
    Container,
    Left,
    Fab,
    Icon,
    H1,
    H2,
    Spinner,
    ListItem,
    Body,
    Right,
    Button
} from 'native-base';


import { Alert, View, FlatList } from 'react-native';

import { findIndex } from 'lodash';
import shortid from 'shortid';

import Colors from '@/constants/Colors';

import SafeView from '@/components/SafeView';
import HeaderLeftButton from '@/components/HeaderLeftButton';
import LightHeader from '@/components/LightHeader';
import LightFooter from '@/components/LightFooter';

import DomicilioFormBaseModal from '@/modals/DomicilioFormBaseModal';

import MainNavigation from '@/services/MainNavigation';
import moment from '@/services/Timestamp';

import styles from './index.styl';

class DomicilioFormFamiliasModal extends DomicilioFormBaseModal {
    fields = ['familias']

    constructor(props) {
        super(props);
        this.state = {
            familias: []
        };
    }
    render() {
        const { props, state } = this;
        if (!state.ready) {
            return (
                <Container style={styles.spinContainer}>
                    <Spinner color="#ddd" size={64} />
                </Container>
            );
        }
        return (
            <SafeView navigation={props.navigation} light={true} isModal={true}>
                <LightHeader navigation={props.navigation} title="Cadastro Domiciliar">
                    <Left>
                        <HeaderLeftButton icon onPress={this.onPressBackWithConfirmation}>
                            <Icon name="ios-arrow-back" style={{ color: Colors.textColor }} />
                        </HeaderLeftButton>
                    </Left>
                </LightHeader>
                <View style={styles.header}>
                    <H1 style={styles.heading}>Famílias</H1>
                    <Fab
                        onPress={() => this.toNewFamilia()}
                        style={[{ backgroundColor: Colors.warnColor }, styles.fab]}
                    >
                        <Icon name="ios-add" />
                    </Fab>
                </View>
                <H2 style={[styles.subHeading, { color: Colors.primaryColor }]}>Membros</H2>
                <FlatList
                    data={state.familias}
                    extraData={state}
                    renderItem={this.renderItem}
                    ListEmptyComponent={this.renderEmptyContent}
                />
                <LightFooter>
                    <Left>
                        <Button transparent block small onPress={this.onPressBackWithConfirmation}>
                            <Text style={{ color: Colors.textColor }}>Cancelar</Text>
                        </Button>
                    </Left>
                    <Body />
                    <Right>
                        <Button transparent block small onPress={this.submitFamiliaForm}>
                            <Text style={{ color: Colors.textColor }}>Salvar</Text>
                        </Button>
                    </Right>
                </LightFooter>
            </SafeView>
        );
    }

    renderItem = ({ item }) => {
        return (
            <ListItem onPress={() => this.onPressItem(item)} last>
                <Body>
                    <Text>Nº do CNS</Text>
                    <Text>{item.numero_cartao_sus_responsavel}</Text>
                    <Text note>
                        { moment(item.data_de_nascimento).format('DD/MM/YYYY') }
                    </Text>
                </Body>
            </ListItem>
        );
    }

    renderEmptyContent = () => {
        return (
            <ListItem last>
                <Body style={{ paddingHorizontal: 2 }}>
                    <Text>Nenhum membro cadastrado.</Text>
                </Body>
            </ListItem>
        );
    }

    toNewFamilia = () => {
        const { navigation } = this.props;
        navigation.navigate('Familias', { model: {}, onSubmit: this.onSubmitNew });
    }

    toEditFamilia = (familia) => {
        const { navigation } = this.props;
        navigation.navigate('Familias', { model: familia, onSubmit: this.onSubmitUpdate });
    }

    onPressItem = (item) => {
        Alert.alert(
            'Cadastro de Moradia',
            'O que você deseja fazer?',
            [
                { text: 'Excluir', onPress: () => this.onDestroy(item), style: 'destructive' },
                { text: 'Editar', onPress: () => this.toEditFamilia(item) },
                { text: 'Cancelar', style: 'cancel' }
            ]
        );
    }

    onSubmitNew = (familia) => {
        const { familias } = this.state;
        const key = shortid.generate();
        const payload = Object.assign({}, familia, { key });

        familias.push(payload);

        this.setState({ familias });
    }

    onSubmitUpdate = (familia) => {
        const { familias } = this.state;
        const { key } = familia;
        const indexOf = findIndex(familias, { key });

        familias[indexOf] = Object.assign({}, familia);

        this.setState({ familias });
    }

    onDestroy = (familia) => {
        const { familias } = this.state;
        const { key } = familia;
        const indexOf = findIndex(familias, { key });

        familias.splice(indexOf, 1);

        this.setState({ familias });
    }

    submitFamiliaForm = () => {
        const { familias } = this.state;

        if (!familias.length) {
            Alert.alert('Cadastro Domiciliar', 'È obrigado existir algum membro cadastrado no domicílio.');
            return;
        }

        this.submitForm();
    }

    onPressBack = () => {
        MainNavigation.goBack();
    }

    onPressBackWithConfirmation = () => {
        const { familias } = this.state;

        if (familias.length) {
            Alert.alert(
                'Atenção',
                'Todos os dados dos formulários serão perdidos.',
                [
                    { text: 'Cancelar', style: 'cancel' },
                    { text: 'Confirmar', style: 'destructive', onPress: () => MainNavigation.goBack() }
                ]
            );
            return;
        }

        MainNavigation.goBack();
    }
}

export default DomicilioFormFamiliasModal;
