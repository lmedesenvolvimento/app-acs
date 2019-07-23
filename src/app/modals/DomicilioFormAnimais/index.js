import React, { Component } from 'react';

import {
    Text,
    Container,
    Content,
    Left,
    Icon,
    H1,
    Form,
    Item,
    Input,
    Button,
    Body,
    Right,
    Spinner
} from 'native-base';

import { pick } from 'lodash';

import Colors from '@/constants/Colors';

import SafeView from '@/components/SafeView';
import HeaderLeftButton from '@/components/HeaderLeftButton';
import LightHeader from '@/components/LightHeader';
import LightFooter from '@/components/LightFooter';
import RadioSelect from '@/components/RadioSelect';
import CheckboxSelect from '@/components/CheckboxSelect';

import styles from './index.styl';

import { convertToNumber } from '@/helpers';

import { Animais } from '@/types';

class DomicilioFormAnimaisModal extends Component {
    convertToNumber = convertToNumber

    fields = [
        'an_cria_animais',
        'an_numero',
        'an_animais',
    ]

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        const { props } = this;
        const model = props.navigation.getParam('model');
        this.setState({ ...pick(model, this.fields) });
    }

    componentDidMount() {
        const { props } = this;
        props.navigation.addListener('didFocus', () => {
            this.setState({ ready: true });
        });
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
                    <H1 style={styles.heading}>Animais de estimação</H1>
                    <Form>
                        <Text style={styles.label} note>Possui algum animal?</Text>
                        <RadioSelect
                            data={Animais.an_cria_animais}
                            onChangeValue={an_cria_animais => this.setState({
                                an_cria_animais: an_cria_animais === 'yes'
                            })}
                        />

                        <Text style={styles.label} note>Quantos</Text>
                        <Item stackedLabel>
                            <Input
                                keyboardType="numeric"
                                value={state.an_numero}
                                placeholder="Informe o total de animais"
                                onChangeText={an_numero => this.convertToNumber(an_numero, 'an_numero')}
                            />
                        </Item>

                        <Text style={styles.label} note>Qual(is)?</Text>
                        <CheckboxSelect
                            data={Animais.an_animais}
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
    onPressBack = () => {
        const { props } = this;
        props.navigation.goBack();
    }

    submitForm = () => {
        const { props, state } = this;
        props.navigation.getParam('onSubmit')({ ...state }, props.navigation.getParam('key'));
        props.navigation.goBack();
    }
}

export default DomicilioFormAnimaisModal;
