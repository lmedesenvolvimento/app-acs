import React from 'react';

import {
    Text,
    Container,
    Content,
    Left,
    Fab,
    Icon,
    H1,
    H2,
    Spinner,
    ListItem,
    Body,
} from 'native-base';

import { View, FlatList } from 'react-native';

import Colors from '@/constants/Colors';

import SafeView from '@/components/SafeView';
import HeaderLeftButton from '@/components/HeaderLeftButton';
import LightHeader from '@/components/LightHeader';

import DomicilioFormBaseModal from '@/modals/DomicilioFormBaseModal';

import MainNavigation from '@/services/MainNavigation';

import styles from './index.styl';

class DomicilioFormFamiliasModal extends DomicilioFormBaseModal {
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
            <SafeView navigation={props.navigation} light={true}>
                <LightHeader navigation={props.navigation} title="Cadastro Domiciliar">
                    <Left>
                        <HeaderLeftButton icon onPress={this.onPressBack}>
                            <Icon name="ios-arrow-back" style={{ color: Colors.textColor }} />
                        </HeaderLeftButton>
                    </Left>
                </LightHeader>
                <View style={styles.header}>
                    <H1 style={styles.heading}>Famílias</H1>
                    <Fab

                        onPress={() => this.toFamiliaForm()}
                        style={[{ backgroundColor: Colors.warnColor }, styles.fab]}
                    >
                        <Icon name="ios-add" />
                    </Fab>
                </View>
                <Content style={styles.content} padder>
                    <H2 style={{ color: Colors.primaryColor }}>Membros</H2>
                    <FlatList
                        data={state.familias}
                        extraData={state}
                        renderItem={this.renderItem}
                        ListEmptyComponent={this.renderEmptyContent}
                    />
                </Content>
            </SafeView>
        );
    }

    renderItem = ({ item }) => {
        return (
            <ListItem last>
                <Body>
                    <Text>{item.numero_prontuario}</Text>
                </Body>
            </ListItem>
        );
    }

    renderEmptyContent = () => {
        return (
            <ListItem last>
                <Body>
                    <Text>Nenhum membro cadastrado.</Text>
                </Body>
            </ListItem>
        );
    }

    toFamiliaForm = (familia) => {
        const { navigation } = this.props;
        navigation.navigate('Familias', { model: {}, onSubmit: this.onSubmit });
    }

    onSubmit = (familia) => {
        const { familias } = this.state;
        familias.push(familia);
        this.setState({ familias });
    }

    onPressBack = () => {
        MainNavigation.goBack();
    }
}

export default DomicilioFormFamiliasModal;
