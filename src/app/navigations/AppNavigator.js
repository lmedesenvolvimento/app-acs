import {
    createSwitchNavigator,
    createStackNavigator,
    createDrawerNavigator,
    createAppContainer
} from 'react-navigation';

import { defaultNavigationOptions } from './index.const';


const AppStack = createDrawerNavigator({
    Home: require('@/screens/MainScreen').default,
    About: require('@/screens/AboutScreen').default,
    Sync: require('@/screens/SyncScreeen').default
}, {
    initialRouteName: 'Sync',
    defaultNavigationOptions
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
            initialRouteName: 'AuthLoading',
        }
    )
);
