import {
    createStackNavigator,
} from 'react-navigation';

import { fromBottom } from 'react-navigation-transitions';

export default createStackNavigator({
    DomicilioForm: {
        screen: require('@/screens/DomicilioFormMainScreen').default
    },
    Endereco: {
        screen: require('@/modals/DomicilioFormEndereco').default
    },
    Moradia: {
        screen: require('@/modals/DomicilioFormMoradia').default
    },
    Animais: {
        screen: require('@/modals/DomicilioFormAnimais').default
    },
    Familias: {
        screen: require('@/modals/DomicilioFormFamilias').default
    }
}, {
    initialRouteName: 'DomicilioForm',
    mode: 'modal',
    headerMode: 'none',
    transitionConfig: () => fromBottom(600),
});
