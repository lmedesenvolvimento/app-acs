import React, { Component } from 'react';
import { Image } from 'react-native';

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
                <Button iconLeft block onPress={this.login.bind(this)}>
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
        // Validate Form
        let emailIsValid = this.state.email.length === 0 ? false : true;
        let passwordIsValid = this.state.password.length === 0 ? false : true;

        this.setState({ emailValid: emailIsValid, passwordValid: passwordIsValid });

        if (!emailIsValid || !passwordIsValid) {
            return false;
        }

        this.props.navigation.navigate('App');
    }
}

export default LoginScreen;
