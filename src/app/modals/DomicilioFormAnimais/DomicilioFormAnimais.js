import React from 'react';

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

import { pickBy } from 'lodash';

import Colors from '@/constants/Colors';

import SafeView from '@/components/SafeView';
import HeaderLeftButton from '@/components/HeaderLeftButton';
import LightHeader from '@/components/LightHeader';
import LightFooter from '@/components/LightFooter';
import RadioSelect from '@/components/RadioSelect';
import CheckboxSelect from '@/components/CheckboxSelect';

import DomicilioFormBaseModal from '@/modals/DomicilioFormBaseModal';

import styles from './index.styl';

import { Animais } from '@/types';

class DomicilioFormAnimaisModal extends DomicilioFormBaseModal {
    fields = [
        'an_cria_animais',
        'an_numero',
        'an_animais',
    ]

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { props, state } = this;
        if (!state.ready) {
            return (
                <Container style={styles.spinContainer}>
                    <Spinner
                        color="#ddd"
                        size={64}
                    />
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
                            default={state.an_cria_animais}
                            isBoolean={true}
                            onChangeValue={an_cria_animais => this.setState({
                                an_cria_animais: an_cria_animais === 'yes'
                            })}
                        />

                        <Text style={styles.label} note>Quantos</Text>
                        <Item stackedLabel>
                            <Input
                                keyboardType="numeric"
                                autoCorrect={false}
                                placeholder="Informe o total de animais"
                                maxLength={3}
                                onChangeText={an_numero => this.convertToNumber(an_numero, 'an_numero')}
                            >
                                {state.an_numero}
                            </Input>
                        </Item>

                        <Text style={styles.label} note>Qual(is)?</Text>
                        <CheckboxSelect
                            default={this.mapAnAnimaisDefaultValue()}
                            data={Animais.an_animais}
                            onChangeValue={an_animais => this.onChangeValueAnAnimais(an_animais)}
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

    mapAnAnimaisDefaultValue = () => {
        const { an_animais } = this.state;
        const selection = pickBy(an_animais, animal => animal);
        return Object.keys(selection);
    }

    onChangeValueAnAnimais = (data) => {
        const an_animais = {};

        Animais.an_animais.forEach((animal) => {
            an_animais[animal.key] = data.includes(animal.key) ? 1 : 0;
        });

        this.setState({ an_animais });
    }
}

export default DomicilioFormAnimaisModal;
