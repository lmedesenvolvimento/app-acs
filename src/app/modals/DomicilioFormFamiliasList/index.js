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

// import { Grid, Row, Col } from 'react-native-easy-grid';

import { View, FlatList } from 'react-native';

import { findIndex } from 'lodash';
import shortid from 'shortid';

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
            <SafeView navigation={props.navigation} light={true} isModal={true}>
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

                        onPress={() => this.toNewFamilia()}
                        style={[{ backgroundColor: Colors.warnColor }, styles.fab]}
                    >
                        <Icon name="ios-add" />
                    </Fab>
                </View>
                <Content style={styles.content} padder>
                    <H2 style={[styles.subHeading, { color: Colors.primaryColor }]}>Membros</H2>
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
            <ListItem onPress={() => this.toEditFamilia(item)} last>
                <Body style={{ paddingHorizontal: 2 }}>
                    <Text>Nº do numero prontuário</Text>
                    <Text>{item.numero_prontuario}</Text>
                    <Text note>{item.data_de_nascimento}</Text>
                </Body>
            </ListItem>
        );
        // return (
        //     <ListItem onPress={() => this.toEditFamilia(item)} last>
        //         <Grid>
        //             <Row>
        //                 <Col>
        //                     <Body>
        //                         <Text>Nº do numero prontuário</Text>
        //                         <Text>{item.numero_prontuario}</Text>
        //                         <Text note>{item.data_de_nascimento}</Text>
        //                     </Body>
        //                 </Col>
        //                 <Col>
        //                     <Body>
        //                         <Text note>{`${item.numero_membros_familia} membros`}</Text>
        //                         <Text note>{item.renda_familiar}</Text>
        //                         <Row>
        //                             <Text note>{`reside ${item.reside} - ${item.mudou_se ? 'mudou-se' : 'não se mudou'} `}</Text>
        //                         </Row>
        //                     </Body>
        //                 </Col>
        //             </Row>
        //         </Grid>
        //     </ListItem>
        // );
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

    onPressBack = () => {
        MainNavigation.goBack();
    }
}

export default DomicilioFormFamiliasModal;
