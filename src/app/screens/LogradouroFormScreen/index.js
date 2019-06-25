import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    Container,
    Button,
    Left,
    Icon,
    Form,
    Item,
    Input,
    Label,
    Picker,
    Text,
    Body,
    Right
} from 'native-base';


import LightHeader from '@/components/LightHeader';
import LightFooter from '@/components/LightFooter';
import actions from '@redux/modules/Logradouros/actions';
import Colors from '@/constants/Colors';
import { Logradouro as Types } from '@/types/index';

import styles from './index.styl';

class LogradouroFormScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            model: {},
            tipos: Types.tipos
        };
    }

    componentDidMount() {
        const { props } = this;
        const { navigation } = props;

        this.setState((state) => {
            const updates = {
                ...state.model,
                ...navigation.getParam('model'),
            };
            return { model: updates };
        });
    }

    render() {
        const { props, state } = this;
        const { navigation } = props;
        return (
            <Container>
                <LightHeader navigation={navigation} title={navigation.getParam('title')}>
                    <Left>
                        <Button transparent onPress={this.goBack}>
                            <Icon name="ios-arrow-back" style={{ color: Colors.textColor }} />
                        </Button>
                    </Left>
                </LightHeader>
                <Container style={styles.container}>
                    <Form style={styles.formContainer}>
                        <Item stackedLabel last>
                            <Label>Nome</Label>
                            <Input placeholder="Insira o nome do Logradouro" autoFocus value={state.model.nome} />
                        </Item>
                        <Item stackedLabel last>
                            <Label>Bairro</Label>
                            <Input value={state.model.bairro_id ? state.model.bairro_id.toString() : ''} disabled />
                        </Item>
                        <Item picker>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="arrow-down" />}
                                style={{ width: undefined }}
                                placeholder="Selecione o tipo do Logradouro"
                                placeholderIconColor="#007aff"
                                selectedValue={state.model.tipo}
                            >
                                <Picker.Item label="Rua" value={state.tipos.rua} />
                                <Picker.Item label="Avenida" value={state.tipos.avenida} />
                                <Picker.Item label="Outros" value={state.tipos.outros} />
                            </Picker>
                        </Item>
                    </Form>
                </Container>
                <LightFooter>
                    <Left>
                        <Button transparent small>
                            <Text style={{ color: Colors.primaryColor }}>Cancelar</Text>
                        </Button>
                    </Left>
                    <Body />
                    <Right>
                        <Button transparent small>
                            <Text style={{ color: Colors.primaryColor }}>Salvar</Text>
                        </Button>
                    </Right>
                </LightFooter>
            </Container>
        );
    }

    goBack = () => {
        const { navigation } = this.props;
        navigation.goBack();
    }
}

const mapStateToProps = ({ Logradouro }) => ({
    Logradouro,
});

export default connect(mapStateToProps, actions)(LogradouroFormScreen);
