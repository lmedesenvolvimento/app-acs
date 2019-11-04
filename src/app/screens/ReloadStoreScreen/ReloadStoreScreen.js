import React, { useState } from 'react';

import { connect } from 'react-redux';

import {
    Container,
    Body,
    H3,
    Form,
    Text,
    H1,
    Item,
    Input,
    Button,
    Footer
} from 'native-base';

import { Alert, ToastAndroid } from 'react-native';

import { Grid, Row, Col } from 'react-native-easy-grid';

import shortid from 'shortid32';

import mapDispatchToProps from '@redux/modules/API/actions';

import styles from './index.styl';

const ReloadStoreScreen = ({ navigation, forceAsyncFetchData }) => {
    const [inputConfirmCode, setInputConfirmCode] = useState('');
    const [confirmCode, setConfirmCode] = useState('');


    navigation.addListener('willFocus', () => {
        const hex = shortid.generate().slice(3).toUpperCase();
        setConfirmCode(hex);
        setInputConfirmCode('');
    });

    const onSubmitConfirmCode = () => {
        if (confirmCode === inputConfirmCode.toUpperCase()) {
            forceAsyncFetchData(() => {
                ToastAndroid.show('Dados recebidos com sucesso!', ToastAndroid.LONG);
                navigation.goBack();
            }, () => {
                ToastAndroid.show('Falha ao receber novos dados por favor tente novamente ou contacte o administrador!', ToastAndroid.LONG);
            });
            return;
        }
        Alert.alert('Dados incorretos', 'Os dois códigos não se coincidem');
    };

    return (
        <Container>
            <Grid>
                <Row>
                    <Col>
                        <Body style={styles.container}>
                            <H3 style={styles.textCenter}>
                                Você deseja realmente recarregar os dados?
                                Seus dados locais serão apagados e essa ação é irreversível.
                            </H3>
                        </Body>
                        <Form style={{ alignItems: 'center', flex: 2 }}>
                            <Text note style={styles.textCenter}>Código de Confirmação</Text>
                            <H1 style={[styles.block, styles.textCenter]}>{confirmCode}</H1>
                            <Item fixedLabel>
                                <Input
                                    onChangeText={value => setInputConfirmCode(value)}
                                    style={styles.textCenter}
                                    placeholder="Informe o código de confirmação."
                                >
                                    {inputConfirmCode}
                                </Input>
                            </Item>
                            <Button
                                full
                                primary
                                style={styles.block}
                                onPress={onSubmitConfirmCode.bind(this)}
                            >
                                <Text>Recarregar dados agora</Text>
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Grid>
            <Footer
                padder
                style={{ backgroundColor: '#FFFFFF' }}
            >
                <Grid>
                    <Row>
                        <Col>
                            <Button full transparent onPress={() => navigation.goBack()}>
                                <Text>Cancelar</Text>
                            </Button>
                        </Col>
                    </Row>
                </Grid>
            </Footer>
        </Container>
    );
};

ReloadStoreScreen.navigationOptions = {
    title: 'Recarregar Dados'
};

export default connect(null, mapDispatchToProps)(ReloadStoreScreen);
