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
    Item,
    Input,
    Label
} from 'native-base';


import Colors from '@/constants/Colors';

import SafeView from '@/components/SafeView';
import HeaderLeftButton from '@/components/HeaderLeftButton';
import LightHeader from '@/components/LightHeader';
import LightFooter from '@/components/LightFooter';
import RadioSelect from '@/components/RadioSelect';
import CheckboxSelect from '@/components/CheckboxSelect';

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
        this.state = {
            cs_outras_condicoes: []
        };
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
                        <Text style={styles.label} note>
                            Está gestante?
                        </Text>
                        <RadioSelect
                            data={Individuo.cs_esta_gestante}
                            default={state.cs_esta_gestante}
                            isBoolean={true}
                            onChangeValue={cs_esta_gestante => this.setState({
                                cs_esta_gestante: cs_esta_gestante === 'yes'
                            })}
                        />

                        <Text style={styles.label} note>
                            Sobre seu peso, você se considera?
                        </Text>
                        <RadioSelect
                            data={Individuo.cs_peso}
                            default={state.cs_peso}
                            onChangeValue={cs_peso => this.setState({ cs_peso })}
                        />

                        <Text style={styles.label} note>
                            Está fumante?
                        </Text>
                        <RadioSelect
                            data={Individuo.cs_esta_fumante}
                            default={state.cs_esta_fumante}
                            isBoolean={true}
                            onChangeValue={cs_esta_fumante => this.setState({
                                cs_esta_fumante: cs_esta_fumante === 'yes'
                            })}
                        />

                        <Text style={styles.label} note>
                            Faz o uso de álcool?
                        </Text>
                        <RadioSelect
                            data={Individuo.cs_usa_alcool}
                            default={state.cs_usa_alcool}
                            isBoolean={true}
                            onChangeValue={cs_usa_alcool => this.setState({
                                cs_usa_alcool: cs_usa_alcool === 'yes'
                            })}
                        />

                        <Text style={styles.label} note>
                            Faz o uso de outras drogas?
                        </Text>
                        <RadioSelect
                            data={Individuo.cs_usa_drogas}
                            default={state.cs_usa_drogas}
                            isBoolean={true}
                            onChangeValue={cs_usa_drogas => this.setState({
                                cs_usa_drogas: cs_usa_drogas === 'yes'
                            })}
                        />

                        <Text style={styles.label} note>
                            Tem hipertensão arterial?
                        </Text>
                        <RadioSelect
                            data={Individuo.cs_tem_hipertensao_arterial}
                            default={state.cs_tem_hipertensao_arterial}
                            isBoolean={true}
                            onChangeValue={cs_tem_hipertensao_arterial => this.setState({
                                cs_tem_hipertensao_arterial: cs_tem_hipertensao_arterial === 'yes'
                            })}
                        />

                        <Text style={styles.label} note>
                            Tem diabete?
                        </Text>
                        <RadioSelect
                            data={Individuo.cs_tem_diabetes}
                            default={state.cs_tem_diabetes}
                            isBoolean={true}
                            onChangeValue={cs_tem_diabetes => this.setState({
                                cs_tem_diabetes: cs_tem_diabetes === 'yes'
                            })}
                        />

                        <Text style={styles.label} note>
                            Teve avc/derrame?
                        </Text>
                        <RadioSelect
                            data={Individuo.cs_teve_avc}
                            default={state.cs_teve_avc}
                            isBoolean={true}
                            onChangeValue={cs_teve_avc => this.setState({
                                cs_teve_avc: cs_teve_avc === 'yes'
                            })}
                        />

                        <Text style={styles.label} note>
                            Teve infarto?
                        </Text>
                        <RadioSelect
                            data={Individuo.cs_teve_infarto}
                            default={state.cs_teve_infarto}
                            isBoolean={true}
                            onChangeValue={cs_teve_infarto => this.setState({
                                cs_teve_infarto: cs_teve_infarto === 'yes'
                            })}
                        />

                        <Text style={styles.label} note>
                            Teve doença cárdiaca/do coração?
                        </Text>
                        <RadioSelect
                            data={Individuo.cs_tem_doenca_cardiaca}
                            default={state.cs_tem_doenca_cardiaca}
                            isBoolean={true}
                            onChangeValue={cs_tem_doenca_cardiaca => this.setState({
                                cs_tem_doenca_cardiaca: cs_tem_doenca_cardiaca === 'yes'
                            })}
                        />

                        <Text style={styles.label} note>
                            Se sim, indique qual(is)?
                        </Text>
                        <CheckboxSelect
                            default={state.cs_doencas_coracao}
                            data={Individuo.cs_doencas_coracao}
                            onChangeValue={(cs_doencas_coracao) => {
                                this.setState({ cs_doencas_coracao });
                            }}
                        />

                        <Text style={styles.label} note>
                            Tem ou teve problemas nos rins?
                        </Text>
                        <RadioSelect
                            data={Individuo.cs_tem_teve_problemas_rins}
                            default={state.cs_tem_teve_problemas_rins}
                            isBoolean={true}
                            onChangeValue={cs_tem_teve_problemas_rins => this.setState({
                                cs_tem_teve_problemas_rins: cs_tem_teve_problemas_rins === 'yes'
                            })}
                        />

                        <Text style={styles.label} note>
                            Se sim, indique qual(is)?
                        </Text>
                        <CheckboxSelect
                            default={state.cs_problemas_rins}
                            data={Individuo.cs_problemas_rins}
                            onChangeValue={(cs_problemas_rins) => {
                                this.setState({ cs_problemas_rins });
                            }}
                        />

                        <Text style={styles.label} note>
                            Tem doença respiratória/no pulmão?
                        </Text>
                        <RadioSelect
                            data={Individuo.cs_tem_doenca_respiratoria}
                            default={state.cs_tem_doenca_respiratoria}
                            isBoolean={true}
                            onChangeValue={cs_tem_doenca_respiratoria => this.setState({
                                cs_tem_doenca_respiratoria: cs_tem_doenca_respiratoria === 'yes'
                            })}
                        />

                        <Text style={styles.label} note>
                            Se sim, indique qual(is)?
                        </Text>
                        <CheckboxSelect
                            default={state.cs_doencas_respiratorias}
                            data={Individuo.cs_doencas_respiratorias}
                            onChangeValue={(cs_doencas_respiratorias) => {
                                this.setState({ cs_doencas_respiratorias });
                            }}
                        />

                        <Text style={styles.label} note>
                            Está com Hanseníase?
                        </Text>
                        <RadioSelect
                            data={Individuo.cs_esta_com_hanseniase}
                            default={state.cs_esta_com_hanseniase}
                            isBoolean={true}
                            onChangeValue={cs_esta_com_hanseniase => this.setState({
                                cs_esta_com_hanseniase: cs_esta_com_hanseniase === 'yes'
                            })}
                        />

                        <Text style={styles.label} note>
                            Está com Tubercúlose?
                        </Text>
                        <RadioSelect
                            data={Individuo.cs_esta_com_turberculose}
                            default={state.cs_esta_com_turberculose}
                            isBoolean={true}
                            onChangeValue={cs_esta_com_turberculose => this.setState({
                                cs_esta_com_turberculose: cs_esta_com_turberculose === 'yes'
                            })}
                        />

                        <Text style={styles.label} note>
                            Está com Câncer?
                        </Text>
                        <RadioSelect
                            data={Individuo.cs_tem_teve_cancer}
                            default={state.cs_tem_teve_cancer}
                            isBoolean={true}
                            onChangeValue={cs_tem_teve_cancer => this.setState({
                                cs_tem_teve_cancer: cs_tem_teve_cancer === 'yes'
                            })}
                        />

                        <Text style={styles.label} note>
                            Teve alguma internação nos últimos 12 meses?
                        </Text>
                        <RadioSelect
                            data={Individuo.cs_teve_internacao}
                            default={state.cs_teve_internacao}
                            isBoolean={true}
                            onChangeValue={cs_teve_internacao => this.setState({
                                cs_teve_internacao: cs_teve_internacao === 'yes'
                            })}
                        />

                        <Item
                            style={styles.item}
                            stackedLabel
                        >
                            <Label>Se sim, por qual causa?</Label>
                            <Input
                                placeholder="Informe a causa"
                                onChangeText={(cs_internacao_causa) => {
                                    this.setState({ cs_internacao_causa });
                                }}
                            >
                                {state.cs_internacao_causa}
                            </Input>
                        </Item>

                        <Text style={styles.label} note>
                            Teve diagnóstico de algum problema
                            de saúde mental por profissional de saúde?
                        </Text>
                        <RadioSelect
                            data={Individuo.cs_teve_problema_saude_mental}
                            default={state.cs_teve_problema_saude_mental}
                            isBoolean={true}
                            onChangeValue={cs_teve_problema_saude_mental => this.setState({
                                cs_teve_problema_saude_mental: cs_teve_problema_saude_mental === 'yes'
                            })}
                        />

                        <Text style={styles.label} note>
                            Está acamando?
                        </Text>
                        <RadioSelect
                            data={Individuo.cs_esta_acamado}
                            default={state.cs_esta_acamado}
                            isBoolean={true}
                            onChangeValue={cs_esta_acamado => this.setState({
                                cs_esta_acamado: cs_esta_acamado === 'yes'
                            })}
                        />

                        <Text style={styles.label} note>
                            Está domicíliado?
                        </Text>
                        <RadioSelect
                            data={Individuo.cs_esta_domiciliado}
                            default={state.cs_esta_domiciliado}
                            isBoolean={true}
                            onChangeValue={cs_esta_domiciliado => this.setState({
                                cs_esta_domiciliado: cs_esta_domiciliado === 'yes'
                            })}
                        />

                        <Text style={styles.label} note>
                            Usa plantas medicinais?
                        </Text>
                        <RadioSelect
                            data={Individuo.cs_usa_plantas_medicinais}
                            default={state.cs_usa_plantas_medicinais}
                            isBoolean={true}
                            onChangeValue={cs_usa_plantas_medicinais => this.setState({
                                cs_usa_plantas_medicinais: cs_usa_plantas_medicinais === 'yes'
                            })}
                        />

                        <Item
                            style={styles.item}
                            stackedLabel
                        >
                            <Label>Se sim, por qual(is)?</Label>
                            <Input
                                placeholder="Informe qual(is)"
                                onChangeText={(cs_plantas_medicinais) => {
                                    this.setState({ cs_plantas_medicinais });
                                }}
                            >
                                {state.cs_plantas_medicinais}
                            </Input>
                        </Item>

                        <Text style={styles.label} note>
                            Usa outras práticas integridades e complementares?
                        </Text>
                        <RadioSelect
                            data={Individuo.cs_usa_praticas_integrativas}
                            default={state.cs_usa_praticas_integrativas}
                            isBoolean={true}
                            onChangeValue={cs_usa_praticas_integrativas => this.setState({
                                cs_usa_praticas_integrativas: cs_usa_praticas_integrativas === 'yes'
                            })}
                        />

                        <Text style={styles.label} note uppercase>
                            Outras condições de saúde
                        </Text>

                        <Item
                            style={styles.item}
                            stackedLabel
                        >
                            <Input
                                placeholder="1 - Qual?"
                                onChangeText={(cs_outras_condicoes_line_1) => {
                                    this.setState(({ cs_outras_condicoes }) => {
                                        // eslint-disable-next-line no-param-reassign
                                        cs_outras_condicoes[0] = cs_outras_condicoes_line_1;
                                        return { cs_outras_condicoes };
                                    });
                                }}
                            >
                                {state.cs_outras_condicoes[0]}
                            </Input>
                        </Item>
                        <Item
                            style={styles.item}
                            stackedLabel
                        >
                            <Input
                                placeholder="2 - Qual?"
                                onChangeText={(cs_outras_condicoes_line_2) => {
                                    this.setState(({ cs_outras_condicoes }) => {
                                        // eslint-disable-next-line no-param-reassign
                                        cs_outras_condicoes[1] = cs_outras_condicoes_line_2;
                                        return { cs_outras_condicoes };
                                    });
                                }}
                            >
                                {state.cs_outras_condicoes[1]}
                            </Input>
                        </Item>
                        <Item
                            style={styles.item}
                            stackedLabel
                        >
                            <Input
                                placeholder="3 - Qual?"
                                onChangeText={(cs_outras_condicoes_line_3) => {
                                    this.setState(({ cs_outras_condicoes }) => {
                                        // eslint-disable-next-line no-param-reassign
                                        cs_outras_condicoes[2] = cs_outras_condicoes_line_3;
                                        return { cs_outras_condicoes };
                                    });
                                }}
                            >
                                {state.cs_outras_condicoes[2]}
                            </Input>
                        </Item>
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

    isEmptyField = (attr) => {
        const { state } = this;

        if (state[attr]) {
            return state[attr].toUpperCase() === this.emptyField.toUpperCase();
        }

        return false;
    }
}

export default IndividuoCondicaoSaude;
