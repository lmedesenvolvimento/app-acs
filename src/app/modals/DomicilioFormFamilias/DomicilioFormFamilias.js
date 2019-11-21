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
    Label,
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
import InputDate from '@/components/InputDate';
import DomicilioFormBaseModal from '@/modals/DomicilioFormBaseModal';

import { Familia } from '@/types';

import styles from './index.styl';

class DomicilioFormFamiliaModal extends DomicilioFormBaseModal {
    inputs = {};

    fields = [
        'numero_prontuario',
        'numero_cartao_sus_responsavel',
        'data_de_nascimento',
        'renda_familiar',
        'numero_membros_familia',
        'reside',
        'mudou_se',
        'key',
    ];

    requireds = [
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
                            <Label>Nº do prontuário familiar</Label>
                            <Input
                                keyboardType="numeric"
                                autoCorrect={false}
                                placeholder="Informe Nº do prontuário familiar"
                                onChangeText={numero_prontuario => this.convertToNumber(numero_prontuario, 'numero_prontuario')}
                                onSubmitEditing={() => this.jumpFocusTo('numero_cartao_sus_responsavel')}
                                maxLength={18}
                            >
                                {state.numero_prontuario}
                            </Input>
                        </Item>

                        <Item stackedLabel error={this.hasError('numero_cartao_sus_responsavel')}>
                            <Label>Nº cartão SUS do responsável *</Label>
                            <Input
                                ref={ref => inputs.numero_cartao_sus_responsavel = ref}
                                autoCorrect={false}
                                keyboardType="numeric"
                                placeholder="Informe Nº cartão SUS do responsável"
                                onChangeText={(numero_cartao_sus_responsavel) => {
                                    this.convertToNumber(
                                        numero_cartao_sus_responsavel,
                                        'numero_cartao_sus_responsavel'
                                    );
                                }}
                                onSubmitEditing={() => this.jumpFocusTo('data_de_nascimento')}
                                maxLength={18}
                            >
                                {state.numero_cartao_sus_responsavel}
                            </Input>
                        </Item>

                        <InputDate
                            style={styles.item}
                            default={state.data_de_nascimento}
                            label="Data de nascimento do responsável *"
                            onChangeValue={(data_de_nascimento) => {
                                this.setState({ data_de_nascimento });
                            }}
                            placeholder="00/00/0000"
                            error={this.hasError('data_de_nascimento')}
                        />

                        <Item
                            style={styles.pickerItem}
                            picker
                        >
                            <Selectbox
                                default={state.renda_familiar}
                                data={Familia.renda_familiar}
                                placeholder="Renda Familiar"
                                onValueChange={renda_familiar => this.setState({ renda_familiar })}
                            />
                        </Item>

                        <Item stackedLabel>
                            <Label>Nº de membros da família</Label>
                            <Input
                                ref={ref => inputs.numero_membros_familia = ref}
                                autoCorrect={false}
                                keyboardType="numeric"
                                placeholder="Informe Nº de membros da família"
                                onChangeText={numero_membros_familia => this.convertToNumber(numero_membros_familia, 'numero_membros_familia')}
                                onSubmitEditing={() => this.jumpFocusTo('reside')}
                                maxLength={3}
                            >
                                {state.numero_membros_familia}
                            </Input>
                        </Item>

                        <InputDate
                            style={styles.item}
                            default={state.reside}
                            label="Reside desde: "
                            onChangeValue={reside => this.setState({ reside })}
                            placeholder="00/00/0000"
                        />

                        <Text style={styles.label} note>Mudou-se?</Text>
                        <RadioSelect
                            data={Familia.mudou_se}
                            default={state.mudou_se}
                            isBoolean={true}
                            onChangeValue={mudou_se => this.setState({
                                mudou_se: mudou_se === 'yes'
                            })}
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

export default DomicilioFormFamiliaModal;
