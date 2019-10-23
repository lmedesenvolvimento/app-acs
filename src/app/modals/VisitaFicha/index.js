import React from 'react';

import {
    Text,
    Container,
    Content,
    Left,
    Right,
    Body,
    Item,
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
import RadioSelect from '@/components/RadioSelect';
import Selectbox from '@/components/Selectbox';

import IndividuoFormBaseModal from '@/modals/IndividuoFormBaseModal';

import { Visita } from '@/types';

import styles from './index.styl';

class VisitaFicha extends IndividuoFormBaseModal {
    inputs = {};

    requireds = [
        'turno',
        'tipo_imovel',
    ];

    fields = [
        'turno',
        'tipo_imovel',
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
                    <H1 style={styles.heading}>Ficha de Vista</H1>
                    <Form>
                        <Text style={this.hasError('turno') ? styles.labelError : styles.label} note>
                            Turno
                        </Text>
                        <RadioSelect
                            data={Visita.turno}
                            default={state.turno}
                            onChangeValue={turno => this.setState({ turno })}
                        />
                        <Item
                            style={styles.pickerItem}
                            picker
                            error={this.hasError('tipo_imovel')}
                        >
                            <Selectbox
                                data={Visita.tipo_imovel}
                                default={state.tipo_imovel}
                                placeholder="Tipo de imóvel"
                                onValueChange={tipo_imovel => this.setState({ tipo_imovel })}
                            />
                        </Item>
                    </Form>
                </Content>
                <LightFooter>
                    <Left>
                        <Button transparent block small onPress={this.onPressBack}>
                            <Text style={{ color: Colors.textColor }}>Voltar</Text>
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

export default VisitaFicha;
