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

import { View } from 'react-native';

import { Grid, Row, Col } from 'react-native-easy-grid';

import Colors from '@/constants/Colors';

import SafeView from '@/components/SafeView';
import HeaderLeftButton from '@/components/HeaderLeftButton';
import LightHeader from '@/components/LightHeader';
import LightFooter from '@/components/LightFooter';
import RadioSelect from '@/components/RadioSelect';

import DomicilioFormBaseModal from '@/modals/DomicilioFormBaseModal';

import { Domicilio } from '@/types';

import styles from './index.styl';

class DomicilioFormMoradiaModal extends DomicilioFormBaseModal {
    inputs = {};

    requireds = [
        'cm_numero_moradores',
        'cm_numero_comodos'
    ];

    fields = [
        'cm_tipo',
        'cm_tipo_acesso',
        'cm_abastecimento_agua',
        'cm_condicao_posse',
        'cm_destino_lixo',
        'cm_disponibilidade_eletrica',
        'cm_escoamento_banheiro',
        'cm_localizacao',
        'cm_material_alvenaria',
        'cm_material_outros',
        'cm_material_taipa',
        'cm_numero_comodos',
        'cm_numero_moradores',
        'cm_situacao_moradia',
        'cm_tratamento_agua',
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
                        <Text style={styles.label} note>Situação de moradia/Posse da terra</Text>
                        <RadioSelect
                            data={Domicilio.cm_situacao_moradias}
                            onChangeValue={(cm_situacao_moradia) => {
                                this.setState({ cm_situacao_moradia });
                            }}
                        />
                        <Text style={styles.label} note>Localização</Text>
                        <RadioSelect
                            data={Domicilio.cm_localizacoes}
                            onChangeValue={cm_localizacao => this.setState({ cm_localizacao })}
                        />
                        <Text style={styles.label} note>Tipo de Domicilio</Text>
                        <RadioSelect
                            data={Domicilio.cm_tipos}
                            onChangeValue={cm_tipo => this.setState({ cm_tipo })}
                        />
                        <Grid style={styles.label}>
                            <Row>
                                <Col>
                                    <Item style={styles.item} error={state.errors ? state.errors.cm_numero_moradores.error : false} last>
                                        <Input
                                            ref={ref => this.inputs.cm_numero_moradores = ref}
                                            value={state.cm_numero_moradores}
                                            placeholder="Nº de Moradores *"
                                            keyboardType="numeric"
                                            onChangeText={cm_numero_moradores => this.convertToNumber(cm_numero_moradores, 'cm_numero_moradores')}
                                            onSubmitEditing={() => this.jumpFocusTo('cm_numero_comodos')}
                                        />
                                    </Item>
                                </Col>
                                <Col>
                                    <Item style={styles.item} error={state.errors ? state.errors.cm_numero_comodos.error : false} last>
                                        <Input
                                            ref={ref => this.inputs.cm_numero_comodos = ref}
                                            value={state.cm_numero_comodos}
                                            placeholder="Nº de Cômodo *"
                                            keyboardType="numeric"
                                            onChangeText={cm_numero_comodos => this.convertToNumber(cm_numero_comodos, 'cm_numero_comodos')}
                                        />
                                    </Item>
                                </Col>
                            </Row>
                        </Grid>

                        <Text style={styles.label} note>Tipo de Acesso ao Domicílio</Text>
                        <RadioSelect
                            data={Domicilio.cm_tipo_acessos}
                            onChangeValue={cm_tipo_acesso => this.setState({ cm_tipo_acesso })}
                        />

                        <Text style={styles.label} note>Disponibilidade de Energia Elétrica</Text>
                        <RadioSelect
                            data={Domicilio.cm_disponibilidade_eletrica}
                            onChangeValue={cm_disponibilidade_eletrica => this.setState({
                                cm_disponibilidade_eletrica: cm_disponibilidade_eletrica === 'yes'
                            })}
                        />

                        <View style={styles.label}>
                            <Text>EM CASO DE ÁREA DE PRODUÇÃO RURAL</Text>
                            <Text note>Condição de Posse e Uso da Terra</Text>
                        </View>
                        <RadioSelect
                            data={Domicilio.cm_condicao_posses}
                        />

                        <View style={styles.label}>
                            <Text>
                                MATERIAL PREDOMINANTE NA CONTRUÇÃO
                                DAS PAREDES EXTERNAS DE SEU DOMICÍLIO
                            </Text>
                            <Text note>Alvenaria/Tijolo</Text>
                        </View>
                        <RadioSelect
                            data={Domicilio.cm_material_alvenarias}
                            onChangeValue={(cm_material_alvenaria) => {
                                this.setState({ cm_material_alvenaria });
                            }}
                        />

                        <Text style={styles.label} note>Taipa</Text>
                        <RadioSelect
                            data={Domicilio.cm_material_taipas}
                            onChangeValue={(cm_material_taipa) => {
                                this.setState({ cm_material_taipa });
                            }}
                        />

                        <Text style={styles.label} note>Outros</Text>
                        <RadioSelect
                            data={Domicilio.cm_material_outros}
                            onChangeValue={(cm_material_outros) => {
                                this.setState({ cm_material_outros });
                            }}
                        />

                        <Text style={styles.label} note>Abastecimento de Água</Text>
                        <RadioSelect
                            data={Domicilio.cm_abastecimento_aguas}
                            onChangeValue={(cm_abastecimento_agua) => {
                                this.setState({ cm_abastecimento_agua });
                            }}
                        />

                        <Text style={styles.label} note>
                            Forma de escoamento do Banheiro Sanitário
                        </Text>
                        <RadioSelect
                            data={Domicilio.cm_escoamento_banheiros}
                            onChangeValue={(cm_escoamento_banheiros) => {
                                this.setState({ cm_escoamento_banheiros });
                            }}
                        />

                        <Text style={styles.label} note>Tratamento de Água no Domicílio</Text>
                        <RadioSelect
                            data={Domicilio.cm_tratamento_aguas}
                            onChangeValue={(cm_tratamento_agua) => {
                                this.setState({ cm_tratamento_agua });
                            }}
                        />

                        <Text style={styles.label} note>Destino do Lixo</Text>
                        <RadioSelect
                            data={Domicilio.cm_destino_lixo}
                            onChangeValue={cm_destino_lixo => this.setState({ cm_destino_lixo })}
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

export default DomicilioFormMoradiaModal;
