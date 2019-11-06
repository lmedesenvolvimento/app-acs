import React from 'react';

import {
    Text,
    Container,
    Content,
    Left,
    Right,
    Body,
    Icon,
    Form,
    Button,
    H1,
    Spinner,
} from 'native-base';


import Colors from '@/constants/Colors';

import SafeView from '@/components/SafeView';
import HeaderLeftButton from '@/components/HeaderLeftButton';
import LightHeader from '@/components/LightHeader';
import LightFooter from '@/components/LightFooter';
import CheckboxSelect from '@/components/CheckboxSelect';

import IndividuoFormBaseModal from '@/modals/IndividuoFormBaseModal';

import { Motivo } from '@/types';

import styles from './index.styl';

class VisitaMotivo extends IndividuoFormBaseModal {
    inputs = {};

    requireds = [
        'motivos',
    ];

    fields = [
        'motivos',
    ];

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
                <LightHeader navigation={props.navigation} title="Visita Domiciliar">
                    <Left>
                        <HeaderLeftButton icon onPress={this.onPressBack}>
                            <Icon name="ios-arrow-back" style={{ color: Colors.textColor }} />
                        </HeaderLeftButton>
                    </Left>
                </LightHeader>
                <Content padder>
                    <H1 style={styles.heading}>Motivo da Visita</H1>
                    <Form>
                        <Text style={this.hasError('motivos') ? styles.labelError : styles.label} note>
                            Tipo
                        </Text>
                        <CheckboxSelect
                            default={state.motivos}
                            data={Motivo.motivos}
                            onChangeValue={motivos => this.setState({ motivos })}
                        />
                    </Form>
                </Content>
                <LightFooter>
                    <Left>
                        <Button transparent block small onPress={this.onPressBack}>
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
}

export default VisitaMotivo;
