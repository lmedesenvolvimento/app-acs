import {
    createSwitchNavigator,
    createStackNavigator,
    createAppContainer
} from 'react-navigation';

const AppStack = createStackNavigator({
    Home: require('@/components/screens/HomeScreen').default
});

const AuthStack = createStackNavigator({
    Login: require('@/components/screens/LoginScreen').default
}, {
    headerMode: "none"
});

export default createAppContainer(
    createSwitchNavigator(
        {
            AuthLoading: require('@/components/screens/AuthLoadingScreen').default,
            App: AppStack,
            Auth: AuthStack,
        },
        {
            initialRouteName: 'AuthLoading'            
        }
    )
);