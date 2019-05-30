import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    Text,
    Button,
    Container,
    Content
} from 'native-base';

import AuthActions from '@redux/modules/Auth/actions';

class AboutScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <Container>
                <Content>
                    <Text> textInComponent </Text>
                </Content>
                <Button block onPress={this.logout.bind(this)}>
                    <Text>Logout</Text>
                </Button>
            </Container>
        );
    }

    logout() {
        const { props } = this;
        props.signOutAsync();
        props.navigation.navigate('Auth');
    }
}

export default connect(null, AuthActions)(AboutScreen);
