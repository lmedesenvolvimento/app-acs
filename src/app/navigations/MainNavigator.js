import {
    createStackNavigator,
    createAppContainer
} from 'react-navigation';

import { fromBottom, fromRight } from 'react-navigation-transitions';

const MainStack = createStackNavigator({
    MicroAreas: {
        screen: require('app/screens/MicroAreaScreen').default
    },
    Quadras: {
        screen: require('app/screens/QuadraScreen').default
    },
    Logradouros: {
        screen: require('app/screens/LogradouroScreen').default
    },
    Domicilios: {
        screen: require('app/screens/DomicilioScreen').default
    },
}, {
    initialRouteName: 'MicroAreas',
    headerMode: 'none',
    transitionConfig: () => fromRight(400),

});

const RootStackNavigator = createStackNavigator({
    MainApp: { screen: MainStack },
    LogradouroForm: {
        screen: require('@/modals/LogradouroForm').default
    },
}, {
    mode: 'modal',
    headerMode: 'none',
    transitionConfig: () => fromBottom(600),
});


export default createAppContainer(
    RootStackNavigator,
);
