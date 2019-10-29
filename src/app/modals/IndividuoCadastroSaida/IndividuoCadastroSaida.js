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
    Label,
} from 'native-base';


import Colors from '@/constants/Colors';

import SafeView from '@/components/SafeView';
import HeaderLeftButton from '@/components/HeaderLeftButton';
import LightHeader from '@/components/LightHeader';
import LightFooter from '@/components/LightFooter';
import RadioSelect from '@/components/RadioSelect';

import IndividuoFormBaseModal from '@/modals/IndividuoFormBaseModal';

import { Individuo } from '@/types';

import styles from './index.styl';

class IndividuoCadastroSaida extends IndividuoFormBaseModal {
    inputs = {};

    requireds = [
        'sc_tipo'
    ];

    fields = [
        'sc_tipo',
        'sc_obito_data',
        'sc_obito_numero'
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
                <LightHeader navigation={props.navigation} title="Cadastro Indivíduo">
                    <Left>
                        <HeaderLeftButton icon onPress={this.onPressBack}>
                            <Icon name="ios-arrow-back" style={{ color: Colors.textColor }} />
                        </HeaderLeftButton>
                    </Left>
                </LightHeader>
                <Content padder>
                    <H1 style={styles.heading}>Saída do cidadão do cadastro</H1>
                    <Form>
                        <Text style={this.hasError('sc_tipo') ? styles.labelError : styles.label} note>
                            Motivo Obrigatório: *
                        </Text>
                        <RadioSelect
                            data={Individuo.sc_tipo}
                            default={state.sc_tipo}
                            onChangeValue={this.onChangeValueScTipo}
                        />
                        <Text style={styles.label} note>
                            Motivo: *
                        </Text>

                        <Item
                            stackedLabel
                            error={this.hasError('sc_obito_data')}
                        >
                            <Label>Data do Óbito</Label>
                            <Input
                                onChangeText={sc_obito_data => this.convertToDate(sc_obito_data, 'sc_obito_data')}
                                placeholder="Informe a data do óbito"
                                disabled={state.sc_tipo !== 'obito'}
                            >
                                {state.sc_obito_data}
                            </Input>
                        </Item>

                        <Item
                            stackedLabel
                            error={this.hasError('sc_obito_numero')}
                        >
                            <Label>Número da D.O</Label>
                            <Input
                                onChangeText={sc_obito_numero => this.convertToNumber(sc_obito_numero, 'sc_obito_numero')}
                                keyboardType="numeric"
                                placeholder="Informe o número da D.O"
                                disabled={state.sc_tipo !== 'obito'}
                            >
                                {state.sc_obito_numero}
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

    isEmptyField = (attr) => {
        const { state } = this;

        if (state[attr]) {
            return state[attr].toUpperCase() === this.emptyField.toUpperCase();
        }

        return false;
    }

    onChangeValueScTipo = (sc_tipo) => {
        const newRequires = ['sc_obito_data', 'sc_obito_numero'];

        if (sc_tipo === 'mudanca_territorio') {
            this.setState({
                sc_tipo,
                sc_obito_data: null,
                sc_obito_numero: null,
            });

            /**
             *  Se sc_tipo for não obito remove
             *  itens ['sc_obito_data', 'sc_obito_numero'] como obrigatórios
             * */
            newRequires.forEach((field) => {
                if (this.requireds.includes(field)) {
                    this.requireds.slice(1, this.requireds.indexOf(field));
                }
            });

            return;
        }

        // Se sc_tipo for obito adicionar novos itens obrigatórios
        newRequires.forEach((field) => {
            if (!this.requireds.includes(field)) {
                this.requireds.push(field);
            }
        });

        this.setState({
            sc_tipo
        });
    }
}

export default IndividuoCadastroSaida;
