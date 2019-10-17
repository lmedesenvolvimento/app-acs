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
import RadioSelect from '@/components/RadioSelect';

import IndividuoFormBaseModal from '@/modals/IndividuoFormBaseModal';

import { Individuo } from '@/types';

import styles from './index.styl';

class IndividuoCondicaoSaude extends IndividuoFormBaseModal {
    inputs = {};

    requireds = [
    ];

    fields = [
        'cs_esta_gestante',
        'cs_maternidade_referencia',
        'cs_peso',
        'cs_esta_fumante',
        'cs_usa_alcool',
        'cs_usa_drogas',
        'cs_tem_hipertensao_arterial',
        'cs_tem_diabetes',
        'cs_teve_avc',
        'cs_teve_infarto',
        'cs_tem_doenca_cardiaca',
        'cs_doencas_coracao',
        'cs_tem_teve_problemas_rins',
        'cs_problemas_rins',
        'cs_tem_doenca_respiratoria',
        'cs_doencas_respiratorias',
        'cs_esta_com_hanseniase',
        'cs_esta_com_turberculose',
        'cs_tem_teve_cancer',
        'cs_teve_internacao',
        'cs_internacao_causa',
        'cs_teve_problema_saude_mental',
        'cs_esta_acamado',
        'cs_esta_domiciliado',
        'cs_usa_plantas_medicinais',
        'cs_plantas_medicinais',
        'cs_usa_praticas_integrativas',
        'cs_outras_condicoes'
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
                    <H1 style={styles.heading}>Condições / situações de saúde</H1>
                    <Form>
                        <Text style={this.hasError('sc_tipo') ? styles.labelError : styles.label} note>
                            Motivo Obrigatório: *
                        </Text>
                        <RadioSelect
                            data={Individuo.sc_tipo}
                            default={state.sc_tipo}
                            isBoolean={true}
                            onChangeValue={this.onChangeValueScTipo}
                        />
                        <Text style={styles.label} note>
                            Motivo: *
                        </Text>
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

export default IndividuoCondicaoSaude;
