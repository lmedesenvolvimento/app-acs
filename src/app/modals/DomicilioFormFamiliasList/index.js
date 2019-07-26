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
} from 'native-base';

import { View } from 'react-native';

import Colors from '@/constants/Colors';

import SafeView from '@/components/SafeView';
import HeaderLeftButton from '@/components/HeaderLeftButton';
import LightHeader from '@/components/LightHeader';

import DomicilioFormBaseModal from '@/modals/DomicilioFormBaseModal';

import styles from './index.styl';

class DomicilioFormFamiliasModal extends DomicilioFormBaseModal {
    constructor(props) {
        super(props);
        this.state = {};
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
                    <Fab style={[{ backgroundColor: Colors.warnColor }, styles.fab]}>
                        <Icon name="ios-add" />
                    </Fab>
                </View>
                <Content style={styles.content} padder>
                    <H2 style={{ color: Colors.primaryColor }}>Membros</H2>
                    <Text>Minim ea nostrud nostrud ad ex.</Text>
                </Content>
            </SafeView>
        );
    }
}

export default DomicilioFormFamiliasModal;
