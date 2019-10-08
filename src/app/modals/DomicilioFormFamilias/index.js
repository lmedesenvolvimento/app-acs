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
    Spinner,
    Picker
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
        'renda_familiar',
        'numero_membros_familia',
        'reside',
        'mudou_se',
        'key',
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
                                autoCorrect={false}
                                placeholder="Nº do prontuário familiar *"
                                onChangeText={numero_prontuario => this.convertToNumber(numero_prontuario, 'numero_prontuario')}
                                onSubmitEditing={() => this.jumpFocusTo('numero_cartao_sus_responsavel')}
                            >
                                { state.numero_prontuario }
                            </Input>
                        </Item>

                        <Item stackedLabel error={this.hasError('numero_cartao_sus_responsavel')}>
                            <Input
                                ref={ref => inputs.numero_cartao_sus_responsavel = ref}
                                autoCorrect={false}
                                keyboardType="numeric"
                                placeholder="Nº cartão SUS do responsável *"
                                onChangeText={numero_cartao_sus_responsavel => this.convertToNumber(numero_cartao_sus_responsavel, 'numero_cartao_sus_responsavel')}
                                onSubmitEditing={() => this.jumpFocusTo('data_de_nascimento')}
                            >
                                {state.numero_cartao_sus_responsavel}
                            </Input>
                        </Item>

                        <Item stackedLabel error={this.hasError('data_de_nascimento')}>
                            <Input
                                ref={ref => inputs.data_de_nascimento = ref}
                                autoCorrect={false}
                                keyboardType="numeric"
                                placeholder="Data de nascimento do responsável *"
                                onChangeText={data_de_nascimento => this.convertToDate(data_de_nascimento, 'data_de_nascimento')}
                            >
                                {state.data_de_nascimento}
                            </Input>
                        </Item>

                        <Text style={styles.label} note>Renda familiar</Text>
                        <Picker
                            mode="dropdown"
                            iosIcon={<Icon name="arrow-down" />}
                            style={[styles.picker, { width: undefined }]}
                            placeholder="Selecione o tipo de renda"
                            placeholderIconColor="#007aff"
                            selectedValue={state.renda_familiar}
                            onValueChange={renda_familiar => this.setState({ renda_familiar })}
                        >
                            <Picker.Item label="Selecione o tipo de renda" value={undefined} />
                            <Picker.Item label={Familia.renda_familiar.menos_que_meio_salario} value="menos_que_meio_salario" />
                            <Picker.Item label={Familia.renda_familiar.meio_salario} value="meio_salario" />
                            <Picker.Item label={Familia.renda_familiar.um_salario} value="um_salario" />
                            <Picker.Item label={Familia.renda_familiar.um_salario_meio} value="um_salario_meio" />
                            <Picker.Item label={Familia.renda_familiar.tres_salario} value="tres_salario" />
                            <Picker.Item label={Familia.renda_familiar.mais_que_tres_salario} value="mais_que_tres_salario" />
                        </Picker>

                        <Item stackedLabel>
                            <Input
                                ref={ref => inputs.numero_membros_familia = ref}
                                autoCorrect={false}
                                keyboardType="numeric"
                                placeholder="Nº de membros da família"
                                onChangeText={numero_membros_familia => this.convertToNumber(numero_membros_familia, 'numero_membros_familia')}
                                onSubmitEditing={() => this.jumpFocusTo('reside')}
                            >
                                { state.numero_membros_familia }
                            </Input>
                        </Item>

                        <Item stackedLabel>
                            <Input
                                ref={ref => inputs.reside = ref}
                                autoCorrect={false}
                                keyboardType="numeric"
                                placeholder="Reside desde: 1990"
                                onChangeText={reside => this.convertToDate(reside, 'reside')}
                            >
                                { state.reside }
                            </Input>
                        </Item>

                        <Text style={styles.label} note>Possui algum animal?</Text>
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
