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
    Spinner
} from 'native-base';


import { Grid, Row, Col } from 'react-native-easy-grid';

import Colors from '@/constants/Colors';

import SafeView from '@/components/SafeView';
import HeaderLeftButton from '@/components/HeaderLeftButton';
import LightHeader from '@/components/LightHeader';
import LightFooter from '@/components/LightFooter';
import RadioSelect from '@/components/RadioSelect';
import Selectbox from '@/components/Selectbox';

import IndividuoFormBaseModal from '@/modals/IndividuoFormBaseModal';

import { Individuo } from '@/types';

import styles from './index.styl';

class IndividuoIDUsuario extends IndividuoFormBaseModal {
    inputs = {};

    requireds = [
        'iden_cns',
    ];

    fields = [
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
        'iden_nacionalidade',
        'iden_nacionalidade',
        'iden_pais_nascimento',
        'iden_data_naturalizacao',
        'iden_municipio_uf_nascimento',
        'iden_data_entrada_brasil',
        'iden_tel_celular',
        'iden_email'
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
                <LightHeader navigation={props.navigation} title="Cadastro Domiciliar">
                    <Left>
                        <HeaderLeftButton icon onPress={this.onPressBack}>
                            <Icon name="ios-arrow-back" style={{ color: Colors.textColor }} />
                        </HeaderLeftButton>
                    </Left>
                </LightHeader>
                <Content padder>
                    <H1 style={styles.heading}>Condição de Moradia</H1>
                    <Form>
                        <Item
                            style={styles.item}
                            error={this.hasError('iden_cns')}
                            last
                        >
                            <Input
                                ref={ref => this.inputs.cm_numero_moradores = ref}
                                autoCorrect={false}
                                placeholder="CNS do cidadão *"
                                keyboardType="numeric"
                                maxLength={11}
                                onChangeText={iden_cns => this.convertToNumber(iden_cns, 'iden_cns')}
                                onSubmitEditing={() => this.jumpFocusTo('cm_numero_comodos')}
                            >
                                {state.iden_cns}
                            </Input>
                        </Item>

                        <Text style={styles.label} note>Cidadão é o responsável familiar?</Text>
                        <RadioSelect
                            data={Individuo.iden_responsavel_familiar}
                            default={state.iden_responsavel_familiar}
                            onChangeValue={iden_responsavel_familiar => this.setState({
                                iden_responsavel_familiar: iden_responsavel_familiar === 'yes'
                            })}
                        />

                        <Item
                            style={styles.item}
                            last
                        >
                            <Input
                                ref={ref => this.inputs.iden_cns_responsavel_familiar = ref}
                                autoCorrect={false}
                                placeholder="CNS do responsável familiar *"
                                keyboardType="numeric"
                                maxLength={11}
                                onChangeText={iden_cns_responsavel_familiar => this.convertToNumber(iden_cns_responsavel_familiar, 'iden_cns_responsavel_familiar')}
                            >
                                {state.iden_cns_responsavel_familiar}
                            </Input>
                        </Item>

                        <Item
                            style={styles.item}
                            last
                        >
                            <Input
                                ref={ref => this.inputs.iden_nome = ref}
                                autoCorrect={false}
                                placeholder="Nome Completo"
                                onChangeText={iden_nome => this.convertToNumber(iden_nome, 'iden_nome')}
                            >
                                {state.iden_nome}
                            </Input>
                        </Item>

                        <Item
                            style={styles.item}
                            last
                        >
                            <Input
                                ref={ref => this.inputs.iden_nome_social = ref}
                                autoCorrect={false}
                                placeholder="Nome Social"
                                onChangeText={iden_nome_social => this.convertToNumber(iden_nome_social, 'iden_nome_social')}
                            >
                                {state.iden_nome_social}
                            </Input>
                        </Item>

                        <Grid>
                            <Row>
                                <Col>
                                    <Item
                                        style={styles.item}
                                        last
                                    >
                                        <Input
                                            ref={ref => this.inputs.iden_data_nascimento = ref}
                                            autoCorrect={false}
                                            placeholder="Data de Nascimento"
                                            keyboardType="numeric"
                                            onChangeText={iden_data_nascimento => this.convertToDate(iden_data_nascimento, 'iden_data_nascimento')}
                                        >
                                            {state.iden_data_nascimento}
                                        </Input>
                                    </Item>
                                </Col>
                                <Col>
                                    <Selectbox
                                        data={Individuo.iden_sexo}
                                        default={state.iden_sexo}
                                        placeholder="Sexo"
                                        onValueChange={iden_sexo => this.setState({ iden_sexo })}
                                    />
                                </Col>
                            </Row>
                        </Grid>
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

export default IndividuoIDUsuario;
