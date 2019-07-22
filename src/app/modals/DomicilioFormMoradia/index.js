import React, { Component } from 'react';

import {
    Text,
    Content,
    Left,
    Right,
    Body,
    Icon,
    Form,
    Item,
    Label,
    Input,
    Button,
    H1,
} from 'native-base';

import Colors from '@/constants/Colors';

import SafeView from '@/components/SafeView';
import HeaderLeftButton from '@/components/HeaderLeftButton';
import LightHeader from '@/components/LightHeader';
import LightFooter from '@/components/LightFooter';
import RadioSelect from '@/components/RadioSelect';

import { Domicilio } from '@/types';


import StringMask from 'string-mask';

import styles from './index.styl';

class DomicilioFormMoradiaModal extends Component {
    inputs = {};

    constructor(props) {
        super(props);
        this.state = {
            cm_abastecimento_agua: 'cisterna',
            cm_condicao_posse: 'proprietario',
            cm_destino_lixo: 'queimado_enterrado',
            cm_disponibilidade_eletrica: false,
            cm_escoamento_banheiro: 'fossa_rudimentar',
            cm_localizacao: 'rural',
            cm_material_alvenaria: 'com_revestimento',
            cm_material_outros: 'madeira_aproveitada',
            cm_material_taipa: 'sem_revestimento',
            cm_numero_comodos: 12,
            cm_numero_moradores: 12,
            cm_situacao_moradia: 'financiado',
            cm_tipo: 'casa',
            cm_tipo_acesso: 'fluvial',
            cm_tratamento_agua: 'fervura',
        };
    }

    render() {
        const { props } = this;
        return (
            <SafeView navigation={props.navigation} light={true}>
                <LightHeader navigation={props.navigation} title="Cadastro Domiciliar">
                    <Left>
                        <HeaderLeftButton icon onPress={this.onPressBack}>
                            <Icon name="ios-arrow-back" style={{ color: Colors.textColor }} />
                        </HeaderLeftButton>
                    </Left>
                </LightHeader>
                <Content padder>
                    <H1 style={styles.heading}>Condição de Moradia</H1>
                    <Form>
                        <Text note>Situação de moradia/Posse da terra</Text>
                        <RadioSelect data={Domicilio.cm_condicao_posses} default="proprietario" />
                        <Text note>Localização</Text>
                        <RadioSelect data={Domicilio.cm_localizacoes} default="urbana" />
                        <Text note>Tipo de Domicilio</Text>
                        <RadioSelect data={Domicilio.cm_tipos} default="casa" />
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
    onPressBack = () => {
        const { props } = this;
        props.navigation.goBack();
    }

    jumpFocusTo = (target) => {
        const { inputs } = this;
        inputs[target]._root.focus();
        return true;
    }

    convertToPhone = (phone, target) => {
        if (!phone) return false;

        const numbers = phone.match(/\d+/g).map(Number).join('');
        const result = new StringMask('(00) 00000-0000').apply(numbers);

        this.setState((state) => {
            state[target] = result;
            return state;
        });

        return true;
    }
}

export default DomicilioFormMoradiaModal;