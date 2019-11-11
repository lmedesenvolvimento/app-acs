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
import CheckboxSelect from '@/components/CheckboxSelect';

import IndividuoFormBaseModal from '@/modals/IndividuoFormBaseModal';

import { Individuo } from '@/types';

import styles from './index.styl';

class IndividuoInfoSocio extends IndividuoFormBaseModal {
    inputs = {};

    requireds = [
        'is_frequenta_escola',
        'is_possui_deficiencia'
    ];

    fields = [
        'is_parentesco_responsavel_familiar',
        'is_ocupacao',
        'is_frequenta_escola',
        'is_curso_elevado_frequentou',
        'is_situacao_mercado_trabalho',
        'is_criancas_cuidadores',
        'is_frequenta_cuidador_tradicional',
        'is_participa_grupo_comunitario',
        'is_possui_plano_saude',
        'is_e_membro_comunidade',
        'is_povo_ou_comunidade',
        'is_deseja_informar_orientacao_sexual',
        'is_informar_orientacao_sexual',
        'is_informar_identidade_genero',
        'is_possui_deficiencia',
        'is_deficiencias'
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
                    <H1 style={styles.heading}>Informações Sociodemográficas</H1>
                    <Form>
                        <Text style={styles.label} note>
                            Relação de parentesco com o responsável familiar:
                        </Text>
                        <RadioSelect
                            data={Individuo.is_parentesco_responsavel_familiar}
                            default={state.is_parentesco_responsavel_familiar}
                            onChangeValue={is_parentesco_responsavel_familiar => this.setState({
                                is_parentesco_responsavel_familiar
                            })}
                        />

                        <Item
                            stackedLabel
                        >
                            <Label>Ocupação</Label>
                            <Input
                                onChangeText={is_ocupacao => this.setState({ is_ocupacao })}
                                placeholder="Informe a ocupação"
                            >
                                {state.is_ocupacao}
                            </Input>
                        </Item>

                        <Text style={this.hasError('is_frequenta_escola') ? styles.labelError : styles.label} note>
                            Frequenta escola ou creche:
                        </Text>
                        <RadioSelect
                            data={Individuo.is_frequenta_escola}
                            default={state.is_frequenta_escola}
                            isBoolean={true}
                            onChangeValue={is_frequenta_escola => this.setState({
                                is_frequenta_escola: is_frequenta_escola === 'yes'
                            })}
                        />

                        <Text style={styles.label} note>
                            Qual é o curso mais elevado que frequenta ou frequentou?
                        </Text>
                        <RadioSelect
                            data={Individuo.is_curso_elevado_frequentou}
                            default={state.is_curso_elevado_frequentou}
                            onChangeValue={is_curso_elevado_frequentou => this.setState({
                                is_curso_elevado_frequentou
                            })}
                        />

                        <Text style={styles.label} note>
                            Situação no mercado de trabalho:
                        </Text>
                        <RadioSelect
                            data={Individuo.is_situacao_mercado_trabalho}
                            default={state.is_situacao_mercado_trabalho}
                            onChangeValue={is_situacao_mercado_trabalho => this.setState({
                                is_situacao_mercado_trabalho
                            })}
                        />

                        <Text style={styles.label} note>
                            Crianças de 0 a 9 anos, com quem fica?
                        </Text>
                        <CheckboxSelect
                            default={state.is_criancas_cuidadores}
                            data={Individuo.is_criancas_cuidadores}
                            onChangeValue={(is_criancas_cuidadores) => {
                                this.setState({ is_criancas_cuidadores });
                            }}
                        />

                        <Text style={styles.label} note>
                            Frequenta cuidador tradicional?
                        </Text>
                        <RadioSelect
                            data={Individuo.is_frequenta_cuidador_tradicional}
                            default={state.is_frequenta_cuidador_tradicional}
                            isBoolean={true}
                            onChangeValue={is_frequenta_cuidador_tradicional => this.setState({
                                is_frequenta_cuidador_tradicional
                            })}
                        />

                        <Text style={styles.label} note>
                            Participa de algum grupo comunitário?
                        </Text>
                        <RadioSelect
                            data={Individuo.is_frequenta_cuidador_tradicional}
                            default={state.is_frequenta_cuidador_tradicional}
                            isBoolean={true}
                            onChangeValue={is_frequenta_cuidador_tradicional => this.setState({
                                is_frequenta_cuidador_tradicional
                            })}
                        />

                        <Text style={styles.label} note>
                            Possui plano de saúde?
                        </Text>
                        <RadioSelect
                            data={Individuo.is_possui_plano_saude}
                            default={state.is_possui_plano_saude}
                            isBoolean={true}
                            onChangeValue={is_possui_plano_saude => this.setState({
                                is_possui_plano_saude
                            })}
                        />

                        <Text style={styles.label} note>
                            É membro de povo ou comunidade tradicional?
                        </Text>
                        <RadioSelect
                            data={Individuo.is_e_membro_comunidade}
                            default={state.is_e_membro_comunidade}
                            isBoolean={true}
                            onChangeValue={is_e_membro_comunidade => this.setState({
                                is_e_membro_comunidade
                            })}
                        />

                        <Item
                            stackedLabel
                        >
                            <Label>Se sim, qual?</Label>
                            <Input
                                onChangeText={(is_povo_ou_comunidade) => {
                                    this.setState({ is_povo_ou_comunidade });
                                }}
                                placeholder="Informe"
                            >
                                {state.is_povo_ou_comunidade}
                            </Input>
                        </Item>

                        <Text style={styles.label} note>
                            Deseja informar orientação sexual?
                        </Text>
                        <RadioSelect
                            data={Individuo.is_deseja_informar_orientacao_sexual}
                            default={state.is_deseja_informar_orientacao_sexual}
                            isBoolean={true}
                            onChangeValue={is_deseja_informar_orientacao_sexual => this.setState({
                                is_deseja_informar_orientacao_sexual
                            })}
                        />

                        <Text style={styles.label} note>
                            Se sim, qual?
                        </Text>
                        <RadioSelect
                            data={Individuo.is_informar_orientacao_sexual}
                            default={state.is_informar_orientacao_sexual}
                            onChangeValue={is_informar_orientacao_sexual => this.setState({
                                is_informar_orientacao_sexual
                            })}
                        />

                        <Text style={styles.label} note>
                            Deseja informar identidade de gênero?
                        </Text>
                        <RadioSelect
                            data={Individuo.is_informar_identidade_genero}
                            default={state.is_informar_identidade_genero}
                            onChangeValue={is_informar_identidade_genero => this.setState({
                                is_informar_identidade_genero
                            })}
                        />

                        <Text
                            style={
                                this.hasError('is_possui_deficiencia')
                                    ? styles.labelError
                                    : styles.label
                            }
                            note
                        >
                            Possui algum tipo de deficiência? *
                        </Text>
                        <RadioSelect
                            data={Individuo.is_possui_deficiencia}
                            default={state.is_possui_deficiencia}
                            isBoolean={true}
                            onChangeValue={is_possui_deficiencia => this.setState({
                                is_possui_deficiencia
                            })}
                        />

                        <Text style={styles.label} note>
                            Se sim, qual?
                        </Text>
                        <CheckboxSelect
                            default={state.is_deficiencias}
                            data={Individuo.is_deficiencias}
                            onChangeValue={is_deficiencias => this.setState({ is_deficiencias })}
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

    isEmptyField = (attr) => {
        const { state } = this;

        if (!state[attr]) return false;

        return state[attr].toUpperCase() === this.emptyField.toUpperCase();
    }
}

export default IndividuoInfoSocio;
