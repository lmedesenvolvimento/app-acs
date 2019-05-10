import React, { Component } from 'react';
import { Image, ToastAndroid, Platform } from 'react-native';
import { connect } from 'react-redux';

import { AuthMapState } from '@redux/modules/Auth/selectors'
import AuthActions from '@redux/modules/Auth/actions'

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
    Icon
} from 'native-base'

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
        let { Auth } = this.props;
        return (
            <Container>
                <Image 
                    source={require('@assets/icon.png')} 
                    style={{ flex: 1, width: 192, height: 192, resizeMode: 'contain', alignSelf: 'center' }}
                >
                </Image>
                <Content padder>
                    <Form>
                        <Item inlineLabel error={!this.state.emailValid}>
                            <Label>Email</Label>
                            <Input onChangeText={ email => this.setState({ email })} keyboardType='email-address' />
                            { !this.state.emailValid ? <Icon name='close-circle' /> : null }
                        </Item>
                        <Item inlineLabel error={!this.state.passwordValid}>
                            <Label>Password</Label>
                            <Input onChangeText={ password => this.setState({ password })} secureTextEntry={true} />
                            { !this.state.passwordValid ? <Icon name='close-circle' /> : null }
                        </Item>
                    </Form>
                </Content>
                <Button iconLeft block onPress={this.login.bind(this)} disabled={Auth.authenticating}>
                    <Left/>
                    {/* <Left>
                        {auth.waiting ? <Spinner color="#fff" style={styles.spinner} /> : null}
                    </Left> */}
                    <Text>Login</Text>
                    <Right />
                </Button>
            </Container>
        );
    }

    login(){
        let { email, password } = this.state
        
        // Validate Form
        let emailIsValid = email.length === 0 ? false : true;
        let passwordIsValid = password.length === 0 ? false : true;

        this.setState({ emailValid: emailIsValid, passwordValid: passwordIsValid });

        if (!emailIsValid || !passwordIsValid) {
            return false;
        }
        
        this.props.signInAsync(
            email, 
            password, 
            this.onSingnInSuccess.bind(this), 
            this.onSignInFail.bind(this)
        )
    }

    onSingnInSuccess(){
        this.props.navigation.navigate('App');
    }

    onSignInFail(){
        Platform.OS === 'android' 
            ? ToastAndroid.show(this.props.Auth.errorMessage, ToastAndroid.LONG) 
            : alert(this.props.Auth.errorMessage)
    }
}

export default connect(AuthMapState, AuthActions)(LoginScreen);
