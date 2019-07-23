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
    Input,
    Button,
    H1,
} from 'native-base';

import { View } from 'react-native';

import { Grid, Row, Col } from 'react-native-easy-grid';

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
            cm_localizacao: 'urbana',
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
                        <Text style={styles.label} note>Situação de moradia/Posse da terra</Text>
                        <RadioSelect
                            data={Domicilio.cm_condicao_posses}
                        />
                        <Text style={styles.label} note>Localização</Text>
                        <RadioSelect
                            data={Domicilio.cm_localizacoes}
                        />
                        <Text style={styles.label} note>Tipo de Domicilio</Text>
                        <RadioSelect
                            data={Domicilio.cm_tipos}
                        />
                        <Grid style={styles.label}>
                            <Row>
                                <Col>
                                    <Item style={styles.item} last>
                                        <Input placeholder="Nº de Moradores *" />
                                    </Item>
                                </Col>
                                <Col>
                                    <Item style={styles.item} last>
                                        <Input placeholder="Nº de Cômodo *" />
                                    </Item>
                                </Col>
                            </Row>
                        </Grid>

                        <Text style={styles.label} note>Tipo de Acesso ao Domicílio</Text>
                        <RadioSelect
                            data={Domicilio.cm_tipo_acessos}
                        />

                        <Text style={styles.label} note>Disponibilidade de Energia Elétrica</Text>
                        <RadioSelect
                            data={Domicilio.cm_disponibilidade_eletrica}
                        />

                        <View style={styles.label}>
                            <Text>EM CASO DE ÁREA DE PRODUÇÃO RURAL</Text>
                            <Text note>Condição de Posse e Uso da Terra</Text>
                        </View>
                        <RadioSelect
                            data={Domicilio.cm_disponibilidade_eletrica}
                        />

                        <View style={styles.label}>
                            <Text>
                                MATERIAL PREDOMINANTE NA CONTRUÇÃO
                                DAS PAREDES EXTERNAS DE SEU DOMICÍLIO
                            </Text>
                            <Text note>Alvenaria/Tijolo</Text>
                        </View>
                        <RadioSelect
                            data={Domicilio.cm_material_alvenarias}
                        />

                        <Text style={styles.label} note>Taipa</Text>
                        <RadioSelect
                            data={Domicilio.cm_material_taipas}
                        />

                        <Text style={styles.label} note>Outros</Text>
                        <RadioSelect
                            data={Domicilio.cm_material_outros}
                        />
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
        if (!phone && !phone.match(/\d+/g).length) return false;

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