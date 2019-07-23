import {
    createStackNavigator,
    createAppContainer
} from 'react-navigation';

import { fromBottom, fromRight } from 'react-navigation-transitions';

const MainStack = createStackNavigator({
    MicroAreas: {
        screen: require('@/screens/MicroAreaScreen').default
    },
    Quadras: {
        screen: require('@/screens/QuadraScreen').default
    },
    Logradouros: {
        screen: require('@/screens/LogradouroScreen').default
    },
    Domicilios: {
        screen: require('@/screens/DomicilioScreen').default
    },
    DomiciliosForm: {
        screen: require('./DomicilioFormNavigator').default
    }
}, {
    // initialRouteName: 'Domicilios',
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
