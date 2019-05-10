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
    Text
} from 'native-base'

class LoginScreen extends Component {
    static navigationOptions = {
        title: 'LoginScreen',
    };

    constructor(props) {
        super(props);
        this.state = {
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
                        <Item inlineLabel>
                            <Label>Email</Label>
                            <Input />
                        </Item>
                        <Item inlineLabel>
                            <Label>Password</Label>
                            <Input />
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
        this.props.navigation.navigate('App');
    }
}

export default LoginScreen;
