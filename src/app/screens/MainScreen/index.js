import React from 'react';
import { connect } from 'react-redux';

import {
    Container,
} from 'native-base';

import MainNavigator from '@/navigations/MainNavigator';
import MainStatusBar from '@/components/MainStatusBar';
import Colors from '@/constants/Colors';

class MainScreen extends React.Component {
    static navigationOptions = {
        title: 'Fluxo Principal',
    };

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <Container>
                <MainStatusBar backgroundColor={Colors.primaryColor} barStyle="light-content" />
                <MainNavigator />
            </Container>
        );
    }
}

export default connect()(MainScreen);