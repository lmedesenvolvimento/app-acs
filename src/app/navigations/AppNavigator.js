import {
    createSwitchNavigator,
    createStackNavigator,
    createDrawerNavigator,
    createAppContainer
} from 'react-navigation';

const AppStack = createDrawerNavigator({
    Home: require('@/screens/HomeScreen').default,
    About: require('@/screens/AboutScreen').default
});

const AuthStack = createStackNavigator({
    Login: require('@/screens/LoginScreen').default
}, {
    headerMode: "none"
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