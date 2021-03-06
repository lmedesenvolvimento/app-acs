import React from 'react';

import {
    Text,
    Container,
    Content,
    Left,
    Right,
    Body,
    Label,
    Item,
    Input,
    Icon,
    Form,
    Button,
    H1,
    Spinner,
    DatePicker
} from 'native-base';


import { connect } from 'react-redux';

import Colors from '@/constants/Colors';

import SafeView from '@/components/SafeView';
import HeaderLeftButton from '@/components/HeaderLeftButton';
import LightHeader from '@/components/LightHeader';
import LightFooter from '@/components/LightFooter';
import RadioSelect from '@/components/RadioSelect';
import Selectbox from '@/components/Selectbox';

import IndividuoFormBaseModal from '@/modals/IndividuoFormBaseModal';

import moment from '@/services/Timestamp';
import { Visita } from '@/types';

import IndividuoActions from '@redux/modules/Individuos/actions';

import styles from './index.styl';

const currentYear = new Date().getFullYear();
const minimumDate = new Date(currentYear, 0, 0);

class VisitaFicha extends IndividuoFormBaseModal {
    inputs = {};

    requireds = [
        'turno',
        'data',
        'tipo_imovel',
    ];

    fields = [
        'turno',
        'tipo_imovel',
        'data',
        'antropometria_peso',
        'antropometria_altura'
    ];

    constructor(props) {
        super(props);
        this.state = {
            individuo: {}
        };
    }

    componentDidMount() {
        const { getIndividuo, navigation } = this.props;
        const { key } = navigation.getParam('model').individuo;
        const individuo = getIndividuo(key);

        this.setState({ individuo });

        super.componentDidMount();
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
                <LightHeader navigation={props.navigation} title="Visita Domiciliar">
                    <Left>
                        <HeaderLeftButton icon onPress={this.onPressBack}>
                            <Icon name="ios-arrow-back" style={{ color: Colors.textColor }} />
                        </HeaderLeftButton>
                    </Left>
                </LightHeader>
                <Content padder>
                    <H1 style={styles.heading}>Ficha de Vista</H1>
                    <Form>
                        <Text style={this.hasError('data') ? styles.labelError : styles.label} note>
                            Data da Visita *
                        </Text>
                        <DatePicker
                            defaultDate={this.getDefaultDate}
                            minimumDate={minimumDate}
                            locale="pt-br"
                            timeZoneOffsetInMinutes={undefined}
                            modalTransparent={false}
                            animationType="fade"
                            androidMode="default"
                            placeHolderText={this.getPlaceHolderText()}
                            textStyle={{
                                color: Colors.iconColor,
                                paddingHorizontal: 16,
                                paddingBottom: 0
                            }}
                            placeHolderTextStyle={{
                                color: Colors.iconColor,
                                paddingHorizontal: 16,
                                paddingBottom: 0
                            }}
                            onDateChange={data => this.setState({ data: moment(data) })}
                        />

                        <Text style={this.hasError('turno') ? styles.labelError : styles.label} note>
                            Turno
                        </Text>
                        <RadioSelect
                            data={Visita.turno}
                            default={state.turno}
                            onChangeValue={turno => this.setState({ turno })}
                        />
                        <Item
                            style={styles.pickerItem}
                            picker
                            error={this.hasError('tipo_imovel')}
                        >
                            <Selectbox
                                data={Visita.tipo_imovel}
                                default={state.tipo_imovel}
                                placeholder="Tipo de imóvel"
                                onValueChange={tipo_imovel => this.setState({ tipo_imovel })}
                            />
                        </Item>

                        <Item
                            stackedLabel
                        >
                            <Label>CNS do cidadão</Label>
                            <Input disabled>
                                {state.individuo.iden_cns ? state.individuo.iden_cns : 'Não Informado'}
                            </Input>
                        </Item>

                        <Item
                            stackedLabel
                        >
                            <Label>Sexo</Label>
                            <Input disabled>
                                {state.individuo.iden_sexo ? state.individuo.iden_sexo : 'Não Informado'}
                            </Input>
                        </Item>

                        <Item
                            stackedLabel
                        >
                            <Label>Data de nascimento</Label>
                            <Input disabled>
                                {state.individuo.iden_data_nascimento ? moment(state.individuo.iden_data_nascimento).format('DD/MM/YYYY') : 'Não Informado'}
                            </Input>
                        </Item>

                        <Item
                            stackedLabel
                        >
                            <Label>Altura cm</Label>
                            <Input
                                ref={ref => this.inputs.antropometria_altura = ref}
                                keyboardType="numeric"
                                maxLength={4}
                                onChangeText={antropometria_altura => this.convertToHeight(antropometria_altura, 'antropometria_altura')}
                                placeholder="Informe a altura da pessoa"
                            >
                                {state.antropometria_altura}
                            </Input>
                        </Item>

                        <Item
                            stackedLabel
                        >
                            <Label>Peso kg</Label>
                            <Input
                                ref={ref => this.inputs.antropometria_peso = ref}
                                keyboardType="numeric"
                                maxLength={6}
                                onChangeText={antropometria_peso => this.convertToWeight(antropometria_peso, 'antropometria_peso')}
                                placeholder="Informe a peso da pessoa"
                            >
                                {state.antropometria_peso}
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

    getPlaceHolderText = () => {
        return 'Selecione uma data';
    }

    getDefaultDate = () => {
        const { state } = this;
        return (state.data && state.data._d) ? state.data.toDate() : new Date();
    }
}

export default connect(null, IndividuoActions)(VisitaFicha);
