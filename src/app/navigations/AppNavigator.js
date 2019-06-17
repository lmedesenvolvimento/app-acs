import {
    createSwitchNavigator,
    createStackNavigator,
    createDrawerNavigator,
    createAppContainer
} from 'react-navigation';

import { defaultNavigationOptions } from './index.const';

const FieldGroupStack = createStackNavigator({
    MicroAreas: require('app/screens/MicroAreaScreen').default,
}, {
    initialRouteName: 'MicroAreas',
    defaultNavigationOptions
});

const AppStack = createDrawerNavigator({
    Home: FieldGroupStack,
    About: require('@/screens/AboutScreen').default
}, {
    initialRouteName: 'Home'
});

const AuthStack = createStackNavigator({
    Login: require('@/screens/LoginScreen').default
}, {
    headerMode: 'none'
});


export default createAppContainer(
    createSwitchNavigator(
        {
            AuthLoading: require('@/screens/AuthLoadingScreen').default,
            App: AppStack,
            Auth: AuthStack,
        },
        {
            initialRouteName: 'AuthLoading'
        }
    )
);
