import React, { Component } from 'react';

import {
    Text,
    Content,
    Left,
    Icon,
    H1,
    Form,
    Label,
    Item,
    Input,
    Button,
    Body,
    Right
} from 'native-base';

import Colors from '@/constants/Colors';

import SafeView from '@/components/SafeView';
import HeaderLeftButton from '@/components/HeaderLeftButton';
import LightHeader from '@/components/LightHeader';
import LightFooter from '@/components/LightFooter';
import RadioSelect from '@/components/RadioSelect';

import styles from './index.styl';

import { convertToNumber } from '@/helpers';

import { Animais } from '@/types';

class DomicilioFormAnimaisModal extends Component {
    convertToNumber = convertToNumber

    constructor(props) {
        super(props);
        this.state = {
            an_cria_animais: null,
            an_numero: '',
            an_animais: Animais.an_animais,
        };
    }
    render() {
        const { props, state, inputs } = this;
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
                            <Label>Número</Label>
                            <Input
                                keyboardType="numeric"
                                value={state.an_numero}
                                placeholder="Informe o número de telefone"
                                onChangeText={an_numero => this.convertToNumber(an_numero, 'an_numero')}
                            />
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
    onPressBack = () => {
        const { props } = this;
        props.navigation.goBack();
    }
}

export default DomicilioFormAnimaisModal;
