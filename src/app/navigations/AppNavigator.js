import {
    createSwitchNavigator,
    createStackNavigator,
    createDrawerNavigator,
    createAppContainer
} from 'react-navigation';

import { defaultNavigationOptions } from './index.const';


const AppStack = createDrawerNavigator({
    Home: require('@/screens/MainScreen').default,
    Profile: require('@/screens/ProfileScreen').default,
    Sync: require('@/screens/SyncScreeen').default,
    Reload: require('@/screens/ReloadStoreScreen').default,
    About: require('@/screens/AboutScreen').default
}, {
    initialRouteName: 'Home',
    drawerLockMode: 'locked-closed',
    defaultNavigationOptions,
    contentComponent: require('@/components/SideMenu').default
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
