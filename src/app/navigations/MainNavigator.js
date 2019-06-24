import {
    createStackNavigator,
    createAppContainer
} from 'react-navigation';

const MainStack = createStackNavigator({
    MicroAreas: require('app/screens/MicroAreaScreen').default,
    Quadras: require('app/screens/QuadraScreen').default,
    Logradouros: require('app/screens/LogradouroScreen').default,
    LogradouroForm: require('app/screens/LogradouroFormScreen').default,
}, {
    initialRouteName: 'MicroAreas',
    headerMode: 'none'
});

export default createAppContainer(
    MainStack
);
