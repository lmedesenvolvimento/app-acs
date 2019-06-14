import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    Text,
    Button,
    Container,
    Content
} from 'native-base';

import { UserMapState } from '@redux/modules/User/mappers';
import AuthActions from '@redux/modules/Auth/actions';

class AboutScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const { User } = this.props;
        return (
            <Container>
                <Content>
                    <Text>{JSON.stringify(User.data)}</Text>
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

export default connect(UserMapState, AuthActions)(AboutScreen);
