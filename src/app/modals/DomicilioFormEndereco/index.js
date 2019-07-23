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

import { convertToNumber, convertToPhone } from '@/helpers';

import styles from './index.styl';

class DomicilioFormEnderecoModal extends Component {
    inputs = {};
    convertToNumber = convertToNumber
    convertToPhone = convertToPhone

    constructor(props) {
        super(props);
        this.state = {
            end_numero: '',
            end_complement: '',
            tel_residencial: '',
            tel_referencia: '',
        };
    }

    render() {
        const { props, state, inputs } = this;
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
                    <H1 style={styles.heading}>Endereço</H1>
                    <Form>
                        <Item stackedLabel>
                            <Label>Número</Label>
                            <Input
                                keyboardType="numeric"
                                value={state.end_numero}
                                placeholder="Informe o número de telefone"
                                onChangeText={end_numero => this.convertToNumber(end_numero, 'end_numero')}
                                onSubmitEditing={() => this.jumpFocusTo('end_complement')}
                            />
                        </Item>
                        <Item stackedLabel>
                            <Label>Complemento</Label>
                            <Input
                                ref={ref => inputs.end_complement = ref}
                                value={state.end_complement}
                                placeholder="Informe o complemento"
                                onChangeText={end_complement => this.setState({ end_complement })}
                                onSubmitEditing={() => this.jumpFocusTo('tel_residencial')}
                            />
                        </Item>
                        <Item stackedLabel>
                            <Label>Telefone Residencial</Label>
                            <Input
                                ref={ref => inputs.tel_residencial = ref}
                                keyboardType="phone-pad"
                                value={state.tel_residencial}
                                placeholder="Informe Telefone residencial"
                                onChangeText={tel_residencial => this.convertToPhone(tel_residencial, 'tel_residencial')}
                                onSubmitEditing={() => this.jumpFocusTo('tel_referencia')}
                            />
                        </Item>
                        <Item stackedLabel>
                            <Label>Telefone Referência</Label>
                            <Input
                                ref={ref => inputs.tel_referencia = ref}
                                keyboardType="phone-pad"
                                value={state.tel_referencia}
                                placeholder="Informe Telefone referência"
                                onChangeText={tel_referencia => this.convertToPhone(tel_referencia, 'tel_referencia')}
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
    onPressBack = () => {
        const { props } = this;
        props.navigation.goBack();
    }

    jumpFocusTo = (target) => {
        const { inputs } = this;
        inputs[target]._root.focus();
        return true;
    }
}

export default DomicilioFormEnderecoModal;
