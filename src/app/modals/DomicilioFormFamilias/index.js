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
    Item,
    Input,
    Button,
    H1,
    Spinner
} from 'native-base';


import Colors from '@/constants/Colors';

import SafeView from '@/components/SafeView';
import HeaderLeftButton from '@/components/HeaderLeftButton';
import LightHeader from '@/components/LightHeader';
import LightFooter from '@/components/LightFooter';
import RadioSelect from '@/components/RadioSelect';
import DomicilioFormBaseModal from '@/modals/DomicilioFormBaseModal';

import { Familia } from '@/types';

import styles from './index.styl';

class DomicilioFormFamiliaModal extends DomicilioFormBaseModal {
    inputs = {};

    fields = [
        'numero_prontuario',
        'numero_cartao_sus_responsavel',
        'data_de_nascimento',
        'numero_membros_familia',
        'reside',
    ];

    requireds = [
        'numero_prontuario',
        'numero_cartao_sus_responsavel',
        'data_de_nascimento'
    ]

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { props, state, inputs } = this;
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
                <Content padder>
                    <H1 style={styles.heading}>Cadastro Domiciliar</H1>
                    <Form>
                        <Item stackedLabel error={this.hasError('numero_prontuario')}>
                            <Input
                                keyboardType="numeric"
                                value={state.numero_prontuario}
                                placeholder="Nº do prontuário familiar *"
                                onChangeText={numero_prontuario => this.convertToNumber(numero_prontuario, 'numero_prontuario')}
                                onSubmitEditing={() => this.jumpFocusTo('numero_cartao_sus_responsavel')}
                            />
                        </Item>

                        <Item stackedLabel error={this.hasError('numero_cartao_sus_responsavel')}>
                            <Input
                                ref={ref => inputs.numero_cartao_sus_responsavel = ref}
                                keyboardType="numeric"
                                value={state.numero_cartao_sus_responsavel}
                                placeholder="Nº cartão SUS do responsável *"
                                onChangeText={numero_cartao_sus_responsavel => this.convertToNumber(numero_cartao_sus_responsavel, 'numero_cartao_sus_responsavel')}
                                onSubmitEditing={() => this.jumpFocusTo('data_de_nascimento')}
                            />
                        </Item>

                        <Item stackedLabel error={this.hasError('data_de_nascimento')}>
                            <Input
                                ref={ref => inputs.data_de_nascimento = ref}
                                keyboardType="numeric"
                                value={state.data_de_nascimento}
                                placeholder="Data de nascimento do responsável *"
                                onChangeText={data_de_nascimento => this.convertToDate(data_de_nascimento, 'data_de_nascimento')}
                                onSubmitEditing={() => this.jumpFocusTo('renda_familiar')}
                            />
                        </Item>

                        <Item stackedLabel>
                            <Input
                                ref={ref => inputs.renda_familiar = ref}
                                keyboardType="numeric"
                                value={state.renda_familiar}
                                placeholder="Renda familiar"
                                onChangeText={renda_familiar => this.convertToMoney(renda_familiar, 'renda_familiar')}
                                onSubmitEditing={() => this.jumpFocusTo('numero_membros_familia')}
                            />
                        </Item>

                        <Item stackedLabel>
                            <Input
                                ref={ref => inputs.numero_membros_familia = ref}
                                keyboardType="numeric"
                                value={state.numero_membros_familia}
                                placeholder="Nº de membros da família"
                                onChangeText={numero_membros_familia => this.convertToNumber(numero_membros_familia, 'numero_membros_familia')}
                                onSubmitEditing={() => this.jumpFocusTo('reside')}
                            />
                        </Item>

                        <Item stackedLabel>
                            <Input
                                ref={ref => inputs.reside = ref}
                                keyboardType="numeric"
                                value={state.reside}
                                placeholder="Reside desde: 1990"
                                onChangeText={reside => this.convertToDate(reside, 'reside')}
                            />
                        </Item>

                        <Text style={styles.label} note>Possui algum animal?</Text>
                        <RadioSelect
                            data={Familia.mudou_se}
                            onChangeValue={mudou_se => this.setState({
                                mudou_se: mudou_se === 'yes'
                            })}
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
}

export default DomicilioFormFamiliaModal;
