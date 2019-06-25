import {
    createStackNavigator,
    createAppContainer
} from 'react-navigation';

import { fromBottom } from 'react-navigation-transitions';

const MainStack = createStackNavigator({
    MicroAreas: require('app/screens/MicroAreaScreen').default,
    Quadras: require('app/screens/QuadraScreen').default,
    Logradouros: require('app/screens/LogradouroScreen').default,
}, {
    initialRouteName: 'MicroAreas',
    headerMode: 'none'
});

const RootStackNavigator = createStackNavigator({
    MainApp: { screen: MainStack },
    LogradouroForm: {
        screen: require('@/modals/LogradouroForm').default
    },
},{
    mode: 'modal',
    headerMode: 'none',
    transitionConfig: () => fromBottom(600),
})


export default createAppContainer(
    RootStackNavigator,
);
