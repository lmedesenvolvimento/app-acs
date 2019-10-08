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
    Label,
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
import DomicilioFormBaseModal from '@/modals/DomicilioFormBaseModal';

import styles from './index.styl';

class DomicilioFormEnderecoModal extends DomicilioFormBaseModal {
    inputs = {};
    fields = ['end_numero', 'end_complement', 'tel_residencial', 'tel_referencia'];
    requireds = ['end_numero', 'tel_residencial']

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
                    <H1 style={styles.heading}>Endereço</H1>
                    <Form>
                        <Item stackedLabel error={this.hasError('end_numero')}>
                            <Label>Número</Label>
                            <Input
                                keyboardType="numeric"
                                autoCorrect={false}
                                placeholder="Informe o número de telefone"
                                onChangeText={end_numero => this.convertToNumber(end_numero, 'end_numero')}
                                onSubmitEditing={() => this.jumpFocusTo('end_complement')}
                            >
                                {state.end_numero}
                            </Input>
                        </Item>
                        <Item stackedLabel>
                            <Label>Complemento</Label>
                            <Input
                                ref={ref => inputs.end_complement = ref}
                                autoCorrect={false}
                                value={state.end_complement}
                                placeholder="Informe o complemento"
                                onChangeText={end_complement => this.setState({ end_complement })}
                                onSubmitEditing={() => this.jumpFocusTo('tel_residencial')}
                            >
                                {state.end_complement}
                            </Input>
                        </Item>
                        <Item stackedLabel error={this.hasError('tel_residencial')}>
                            <Label>Telefone Residencial</Label>
                            <Input
                                ref={ref => inputs.tel_residencial = ref}
                                autoCorrect={false}
                                keyboardType="phone-pad"
                                placeholder="Informe Telefone residencial"
                                onChangeText={tel_residencial => this.convertToPhone(tel_residencial, 'tel_residencial')}
                                onSubmitEditing={() => this.jumpFocusTo('tel_referencia')}
                            >
                                {state.tel_residencial}
                            </Input>
                        </Item>
                        <Item stackedLabel>
                            <Label>Telefone Referência</Label>
                            <Input
                                ref={ref => inputs.tel_referencia = ref}
                                autoCorrect={false}
                                keyboardType="phone-pad"
                                placeholder="Informe Telefone referência"
                                onChangeText={tel_referencia => this.convertToPhone(tel_referencia, 'tel_referencia')}
                            >
                                {state.tel_referencia}
                            </Input>
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

export default DomicilioFormEnderecoModal;
