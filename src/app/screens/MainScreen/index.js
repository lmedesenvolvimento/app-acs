import React from 'react';
import { connect } from 'react-redux';

import {
    Container,
} from 'native-base';

import MainNavigator from '@/navigations/MainNavigator';

class MainScreen extends React.Component {
    static navigationOptions = {
        title: 'Fluxo Principal',
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Container>
                <MainNavigator />
            </Container>
        );
    }
}

export default connect()(MainScreen);
