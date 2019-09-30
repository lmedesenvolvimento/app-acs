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
import APIActions from '@redux/modules/API/actions';

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
        props.asynClearData();
        props.navigation.navigate('Auth');
    }
}

const mapActions = (dispatch) => {
    return Object.assign({}, APIActions(dispatch), AuthActions(dispatch));
};

export default connect(UserMapState, mapActions)(AboutScreen);
