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
import SelectBox from '@/components/Selectbox';

import IndividuoFormBaseModal from '@/modals/IndividuoFormBaseModal';

import { Individuo } from '@/types';

import styles from './index.styl';

class IndividuoSituacaoRua extends IndividuoFormBaseModal {
    inputs = {};

    requireds = [
        'sr_esta_situacao_rua',
        'sr_tempo_rua',
        'sr_recebe_beneficio',
        'sr_recebe_beneficio',
        'sr_possui_referencia_familiar',
        'sr_vezes_alimenta_dia',
        'sr_origem_alimentacao',
    ];

    fields = [
        'sr_esta_situacao_rua',
        'sr_tempo_rua',
        'sr_recebe_beneficio',
        'sr_recebe_beneficio',
        'sr_possui_referencia_familiar',
        'sr_vezes_alimenta_dia',
        'sr_origem_alimentacao',
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
                    <H1 style={styles.heading}>Cidadão em situação de rua</H1>
                    <Form>
                        <Text style={this.hasError('sr_esta_situacao_rua') ? styles.labelError : styles.label} note>
                            Está em situação de rua?
                        </Text>
                        <RadioSelect
                            data={Individuo.sr_esta_situacao_rua}
                            default={state.sr_esta_situacao_rua}
                            isBoolean={true}
                            onChangeValue={sr_esta_situacao_rua => this.setState({
                                sr_esta_situacao_rua: sr_esta_situacao_rua === 'yes'
                            })}
                        />

                        <Text style={this.hasError('sr_tempo_rua') ? styles.labelError : styles.label} note>
                            Tempo em situação de rua?
                        </Text>
                        <RadioSelect
                            data={Individuo.sr_tempo_rua}
                            default={state.sr_tempo_rua}
                            onChangeValue={sr_tempo_rua => this.setState({ sr_tempo_rua })}
                        />

                        <Text style={this.hasError('sr_recebe_beneficio') ? styles.labelError : styles.label} note>
                            Recebe algum benefício?
                        </Text>
                        <RadioSelect
                            data={Individuo.sr_recebe_beneficio}
                            default={state.sr_recebe_beneficio}
                            onChangeValue={sr_recebe_beneficio => this.setState({
                                sr_recebe_beneficio: sr_recebe_beneficio === 'yes'
                            })}
                        />

                        <Text style={this.hasError('sr_possui_referencia_familiar') ? styles.labelError : styles.label} note>
                            Possui referência familiar?
                        </Text>
                        <RadioSelect
                            data={Individuo.sr_possui_referencia_familiar}
                            default={state.sr_possui_referencia_familiar}
                            onChangeValue={sr_possui_referencia_familiar => this.setState({
                                sr_possui_referencia_familiar: sr_possui_referencia_familiar === 'yes'
                            })}
                        />

                        <Text style={this.hasError('sr_vezes_alimenta_dia') ? styles.labelError : styles.label} note>
                            Quantas vezes se alimenta ao dia?
                        </Text>
                        <RadioSelect
                            data={Individuo.sr_vezes_alimenta_dia}
                            default={state.sr_vezes_alimenta_dia}
                            onChangeValue={sr_vezes_alimenta_dia => this.setState({
                                sr_vezes_alimenta_dia: sr_vezes_alimenta_dia === 'yes'
                            })}
                        />

                        <Text style={this.hasError('sr_origem_alimentacao') ? styles.labelError : styles.label} note>
                            Qual a origem da alimentação?
                        </Text>
                        <SelectBox
                            default={state.sr_origem_alimentacao}
                            data={Individuo.sr_origem_alimentacao}
                            onValueChange={(sr_origem_alimentacao) => {
                                this.setState({ sr_origem_alimentacao });
                            }}
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

    isEmptyField = (attr) => {
        const { state } = this;

        if (state[attr]) {
            return state[attr].toUpperCase() === this.emptyField.toUpperCase();
        }

        return false;
    }
}

export default IndividuoSituacaoRua;
