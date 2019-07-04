import React, { Component } from 'react';

import {
    Alert,
    Image,
    ToastAndroid,
    Platform,
    StatusBar
} from 'react-native';

import { connect } from 'react-redux';

import { AuthMapState } from '@redux/modules/Auth/mappers';
import AuthActions from '@redux/modules/Auth/actions';

import {
    Button,
    Container,
    Content,
    Form,
    Item,
    Input,
    Label,
    Left,
    Right,
    Text,
    Spinner,
    Icon
} from 'native-base';

import styles from './index.styl';

class LoginScreen extends Component {
    static navigationOptions = {
        title: 'LoginScreen',
    };

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            emailValid: true,
            password: '',
            passwordValid: true
        };
    }

    render() {
        const { Auth } = this.props;
        const { emailValid, passwordValid } = this.state;
        return (
            <Container>
                <StatusBar barStyle="dark-content" />
                <Image
                    source={require('@assets/icon-hd.png')}
                    style={styles.logo}
                />
                <Content padder>
                    <Form>
                        <Item inlineLabel error={!emailValid}>
                            <Label>Email</Label>
                            <Input
                                onChangeText={email => this.setState({ email })}
                                keyboardType="email-address"
                                disabled={Auth.authenticating}
                            />
                            { !emailValid ? <Icon name="close-circle" /> : null }
                        </Item>
                        <Item inlineLabel error={!passwordValid}>
                            <Label>Password</Label>
                            <Input
                                secureTextEntry
                                onChangeText={password => this.setState({ password })}
                                disabled={Auth.authenticating}
                            />
                            { !passwordValid ? <Icon name="close-circle" /> : null }
                        </Item>
                    </Form>
                </Content>
                <Button
                    iconLeft
                    block
                    onPress={this.login.bind(this)}
                    disabled={Auth.authenticating}
                >
                    <Left>
                        { Auth.authenticating ? <Spinner color="#fff" style={styles.spinner} /> : null }
                    </Left>
                    <Text>Login</Text>
                    <Right />
                </Button>
            </Container>
        );
    }

    login() {
        const { signInAsync } = this.props;
        const { email, password } = this.state;

        // Validate Form
        const emailValid = email.length > 0;
        const passwordValid = password.length > 0;

        this.setState({ emailValid, passwordValid });

        if (!emailValid || !passwordValid) return false;

        signInAsync(
            email,
            password,
            this.onSingnInSuccess.bind(this),
            this.onSignInFail.bind(this)
        );
        return true;
    }

    onSingnInSuccess() {
        const { navigation } = this.props;
        navigation.navigate('AuthLoading');
    }

    onSignInFail() {
        const { Auth } = this.props;
        if (Platform.OS === 'android') {
            ToastAndroid.show(Auth.errorMessage, ToastAndroid.SHORT);
        } else {
            Alert(
                'Falha no Login',
                Auth.errorMessage
            );
        }
    }
}

export default connect(AuthMapState, AuthActions)(LoginScreen);
