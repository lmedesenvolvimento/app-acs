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
    ListItem,
    CheckBox
} from 'native-base';

import { connect } from 'react-redux';


import Colors from '@/constants/Colors';

import SafeView from '@/components/SafeView';
import HeaderLeftButton from '@/components/HeaderLeftButton';
import LightHeader from '@/components/LightHeader';
import LightFooter from '@/components/LightFooter';
import RadioSelect from '@/components/RadioSelect';
import Selectbox from '@/components/Selectbox';
import InputDate from '@/components/InputDate';

import DomicilioActions from '@redux/modules/Domicilios/actions';

import IndividuoFormBaseModal from '@/modals/IndividuoFormBaseModal';

import { Individuo } from '@/types';

import styles from './index.styl';

class IndividuoIDUsuario extends IndividuoFormBaseModal {
    inputs = {};

    emptyField = 'Desconhecido';

    requireds = [
        'iden_cns',
        'iden_nome',
        'iden_nome_mae',
        'iden_nome_pai',
        'iden_data_nascimento',
        'iden_nacionalidade',
        'iden_sexo',
        'iden_raca'
    ];

    fields = [
        'iden_cpf',
        'iden_cns',
        'iden_responsavel_familiar',
        'iden_cns_responsavel_familiar',
        'iden_nome',
        'iden_nome_social',
        'iden_data_nascimento',
        'iden_sexo',
        'iden_raca',
        'iden_etnia',
        'iden_n_nis',
        'iden_nome_mae',
        'iden_nome_pai',
        'iden_desconhece_nome_mae',
        'iden_desconhece_nome_pai',
        'iden_nacionalidade',
        'iden_pais_nascimento',
        'iden_data_naturalizacao',
        'iden_portaria_naturalizacao',
        'iden_municipio_uf_nascimento',
        'iden_data_entrada_brasil',
        'iden_tel_celular',
        'iden_email'
    ];

    constructor(props) {
        super(props);
        this.state = {
            iden_nacionalidade: 'brasileira',
            iden_desconhece_nome_mae: false,
            iden_desconhece_nome_pai: false
        };
    }

    componentDidMount() {
        super.componentDidMount();
        const { navigation, getDomicilio } = this.props;
        const { domicilio } = navigation.getParam('model');

        // Adicionando o primeiro membro da familia como responsável familiar
        const { familias } = getDomicilio(domicilio.key);

        if (familias && familias.length) {
            const { numero_cartao_sus_responsavel } = familias[0];
            this.setState({
                iden_cns_responsavel_familiar: numero_cartao_sus_responsavel
            });
        }
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
                    <H1 style={styles.heading}>Indentificação do usuário / cidadão</H1>
                    <Form>
                        <Item
                            style={styles.item}
                            stackedLabel
                        >
                            <Label>CPF do cidadão</Label>
                            <Input
                                ref={ref => this.inputs.cm_numero_moradores = ref}
                                keyboardType="numeric"
                                maxLength={14}
                                onChangeText={iden_cpf => this.convertToCPF(iden_cpf, 'iden_cpf')}
                                placeholder="Informe o CPF do cidadão"
                            >
                                {state.iden_cpf}
                            </Input>
                        </Item>
                        <Item
                            style={styles.item}
                            error={this.hasError('iden_cns')}
                            stackedLabel
                        >
                            <Label>CNS do cidadão *</Label>
                            <Input
                                ref={ref => this.inputs.cm_numero_moradores = ref}
                                keyboardType="numeric"
                                maxLength={18}
                                onChangeText={iden_cns => this.convertToNumber(iden_cns, 'iden_cns')}
                                placeholder="Informe o CNS do cidadão"
                            >
                                {state.iden_cns}
                            </Input>
                        </Item>

                        <Text style={styles.label} note>Cidadão é o responsável familiar?</Text>
                        <RadioSelect
                            data={Individuo.iden_responsavel_familiar}
                            default={state.iden_responsavel_familiar}
                            isBoolean={true}
                            onChangeValue={iden_responsavel_familiar => this.setState({
                                iden_responsavel_familiar: iden_responsavel_familiar === 'yes'
                            })}
                        />

                        <Item
                            style={styles.item}
                            stackedLabel
                        >
                            <Label>CNS do responsável familiar</Label>
                            <Input
                                ref={ref => this.inputs.iden_cns_responsavel_familiar = ref}
                                keyboardType="numeric"
                                maxLength={18}
                                onChangeText={iden_cns_responsavel_familiar => this.convertToNumber(iden_cns_responsavel_familiar, 'iden_cns_responsavel_familiar')}
                                placeholder="Informe o CNS do responsável familiar"

                            >
                                {state.iden_cns_responsavel_familiar}
                            </Input>
                        </Item>

                        <Item
                            style={styles.item}
                            error={this.hasError('iden_nome')}
                            stackedLabel
                        >
                            <Label>Nome Completo *</Label>
                            <Input
                                ref={ref => this.inputs.iden_nome = ref}
                                onChangeText={iden_nome => this.setState({ iden_nome })}
                                placeholder="Informe o nome completo do indivíduo"
                            >
                                {state.iden_nome}
                            </Input>
                        </Item>

                        <Item
                            style={styles.item}
                            stackedLabel
                        >
                            <Label>Nome Social</Label>
                            <Input
                                style={styles.item}
                                ref={ref => this.inputs.iden_nome_social = ref}
                                onChangeText={(iden_nome_social) => {
                                    this.setState({ iden_nome_social });
                                }}
                                placeholder="Informe o nome social do indivíduo"
                            >
                                {state.iden_nome_social}
                            </Input>
                        </Item>

                        <Item
                            style={styles.pickerItem}
                            error={this.hasError('iden_sexo')}
                            picker
                        >
                            <Selectbox
                                data={Individuo.iden_sexo}
                                default={state.iden_sexo}
                                placeholder="Sexo *"
                                onValueChange={iden_sexo => this.setState({ iden_sexo })}
                            />
                        </Item>

                        <InputDate
                            style={styles.item}
                            default={state.iden_data_nascimento}
                            label="Data de Nascimento *"
                            onChangeValue={(iden_data_nascimento) => {
                                this.setState({ iden_data_nascimento });
                            }}
                            placeholder="00/00/0000"
                            error={this.hasError('iden_data_nascimento')}
                        />

                        <Item
                            style={styles.pickerItem}
                            error={this.hasError('iden_raca')}
                            picker
                        >
                            <Selectbox
                                data={Individuo.iden_raca}
                                default={state.iden_raca}
                                placeholder="Raça/Cor"
                                onValueChange={iden_raca => this.setState({ iden_raca })}
                            />
                        </Item>

                        <Item
                            style={styles.item}
                            error={this.hasError('iden_etnia')}
                            stackedLabel
                        >
                            <Label>Etnia</Label>
                            <Input
                                ref={ref => this.inputs.iden_etnia = ref}
                                onChangeText={iden_etnia => this.setState({ iden_etnia })}
                                placeholder="Informe a etnia"
                            >
                                {state.iden_etnia}
                            </Input>
                        </Item>

                        <Item
                            style={styles.item}
                            stackedLabel
                        >
                            <Label>Nº NIS (PIS/PASEP)</Label>
                            <Input
                                ref={ref => this.inputs.iden_n_nis = ref}
                                keyboardType="numeric"
                                onChangeText={iden_n_nis => this.convertToPISNIS(iden_n_nis, 'iden_n_nis')}
                                placeholder="000.00000.00-0"
                            >
                                {state.iden_n_nis}
                            </Input>
                        </Item>

                        <Item
                            style={styles.item}
                            error={this.hasError('iden_nome_mae')}
                            stackedLabel
                        >
                            <Label>Nome Completo da Mãe *</Label>
                            <Input
                                ref={ref => this.inputs.iden_nome_mae = ref}
                                onChangeText={iden_nome_mae => this.setState({ iden_nome_mae })}
                                placeholder="Informe o nome completo da mãe"
                                disabled={this.isEmptyField('iden_nome_mae')}
                            >
                                {state.iden_nome_mae}
                            </Input>
                        </Item>

                        <ListItem
                            onPress={this.onPressCheckEmptyNomeMae}
                            noBorder
                        >
                            <CheckBox checked={this.isEmptyField('iden_nome_mae')} />
                            <Body>
                                <Text>Desconhecido</Text>
                            </Body>
                        </ListItem>

                        <Item
                            style={styles.item}
                            error={this.hasError('iden_nome_pai')}
                            stackedLabel
                        >
                            <Label>Nome Completo do Pai *</Label>
                            <Input
                                ref={ref => this.inputs.iden_nome_pai = ref}
                                onChangeText={iden_nome_pai => this.setState({ iden_nome_pai })}
                                placeholder="Informe o nome completo do pai"
                                disabled={this.isEmptyField('iden_nome_pai')}
                            >
                                {state.iden_nome_pai}
                            </Input>
                        </Item>

                        <ListItem
                            onPress={this.onPressCheckEmptyNomePai}
                            noBorder
                        >
                            <CheckBox checked={this.isEmptyField('iden_nome_pai')} />
                            <Body>
                                <Text>Desconhecido</Text>
                            </Body>
                        </ListItem>

                        <Item
                            style={styles.pickerItem}
                            error={this.hasError('iden_nacionalidade')}
                            picker
                        >
                            <Selectbox
                                data={Individuo.iden_nacionalidade}
                                default={state.iden_nacionalidade}
                                placeholder="Nacionalidade *"
                                onValueChange={(iden_nacionalidade) => {
                                    this.setState({ iden_nacionalidade });
                                }}
                            />
                        </Item>

                        <Item
                            style={styles.item}
                            error={this.hasError('iden_pais_nascimento')}
                            stackedLabel
                        >
                            <Label>País de Nascimento</Label>
                            <Input
                                ref={ref => this.inputs.iden_pais_nascimento = ref}
                                onChangeText={(iden_pais_nascimento) => {
                                    this.setState({ iden_pais_nascimento });
                                }}
                                placeholder="Informe o país de Nascimento"
                            >
                                {state.iden_pais_nascimento}
                            </Input>
                        </Item>

                        <InputDate
                            style={styles.item}
                            default={state.iden_data_naturalizacao}
                            label="Data da Naturalização"
                            onChangeValue={(iden_data_naturalizacao) => {
                                this.setState({ iden_data_naturalizacao });
                            }}
                            placeholder="00/00/0000"
                        />

                        <Item
                            style={styles.item}
                            error={this.hasError('iden_portaria_naturalizacao')}
                            stackedLabel
                        >
                            <Label>Portaria da Naturalização</Label>
                            <Input
                                ref={ref => this.inputs.iden_portaria_naturalizacao = ref}
                                onChangeText={(iden_portaria_naturalizacao) => {
                                    this.convertToNumber(iden_portaria_naturalizacao, 'iden_portaria_naturalizacao');
                                }}
                                keyboardType="numeric"
                                placeholder="Informe a portaria da naturalização"
                            >
                                {state.iden_portaria_naturalizacao}
                            </Input>
                        </Item>

                        <Item
                            style={styles.item}
                            stackedLabel
                        >
                            <Label>Município e UF de Nascimento</Label>
                            <Input
                                ref={ref => this.inputs.iden_municipio_uf_nascimento = ref}
                                onChangeText={(iden_municipio_uf_nascimento) => {
                                    this.setState({ iden_municipio_uf_nascimento });
                                }}
                                placeholder="Informe município e UF de nascimento"
                            >
                                {state.iden_municipio_uf_nascimento}
                            </Input>
                        </Item>

                        <InputDate
                            style={styles.item}
                            default={state.iden_data_entrada_brasil}
                            label="Informe a data de entrada no Brasil"
                            onChangeValue={(iden_data_entrada_brasil) => {
                                this.setState({ iden_data_entrada_brasil });
                            }}
                            placeholder="00/00/0000"
                        />

                        <Item
                            style={styles.item}
                            stackedLabel
                        >
                            <Label>Telefone Celular</Label>
                            <Input
                                ref={ref => this.inputs.iden_tel_celular = ref}
                                keyboardType="phone-pad"
                                onChangeText={iden_tel_celular => this.convertToPhone(iden_tel_celular, 'iden_tel_celular')}
                                placeholder="(00) 00000-0000"
                            >
                                {state.iden_tel_celular}
                            </Input>
                        </Item>

                        <Item
                            style={styles.item}
                            stackedLabel
                        >
                            <Label>Email Pessoal</Label>
                            <Input
                                ref={ref => this.inputs.iden_email = ref}
                                keyboardType="email-address"
                                onChangeText={iden_email => this.setState({ iden_email })}
                                placeholder="pessoa@email.br"
                            >
                                {state.iden_email}
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

    onPressCheckEmptyNomeMae = () => {
        const isNotEmpty = !this.isEmptyField('iden_nome_mae');
        const iden_nome_mae = isNotEmpty ? this.emptyField.toString() : '';

        this.setState(state => ({
            iden_nome_mae,
            iden_desconhece_nome_mae: !state.iden_desconhece_nome_mae
        }));
    }

    onPressCheckEmptyNomePai = () => {
        const isNotEmpty = !this.isEmptyField('iden_nome_pai');
        const iden_nome_pai = isNotEmpty ? this.emptyField.toString() : '';

        this.setState(state => ({
            iden_nome_pai,
            iden_desconhece_nome_pai: !state.iden_desconhece_nome_pai
        }));
    }

    isEmptyField = (attr) => {
        const { state } = this;

        if (!state[attr]) return false;

        return state[attr].toUpperCase() === this.emptyField.toUpperCase();
    }
}

export default connect(null, DomicilioActions)(IndividuoIDUsuario);
