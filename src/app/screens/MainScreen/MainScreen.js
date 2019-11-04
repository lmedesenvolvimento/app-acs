import React from 'react';

import { connect } from 'react-redux';

import {
    Container,
} from 'native-base';
import MainNavigation from '@/services/MainNavigation';
import MainNavigator from '@/navigations/MainNavigator';

const MainScreen = () => {
    return (
        <Container>
            <MainNavigator
                ref={navigationRef => MainNavigation.setMainNavigator(navigationRef)}
            />
        </Container>
    );
};

MainScreen.navigationOptions = {
    title: 'Página principal',
};

export default connect()(MainScreen);
