import {
    createStackNavigator,
} from 'react-navigation';

import { fromBottom } from 'react-navigation-transitions';

const FamiliaStack = createStackNavigator({
    List: {
        screen: require('@/modals/DomicilioFormFamiliasList').default
    },
    Familias: {
        screen: require('@/modals/DomicilioFormFamilias').default
    }
}, {
    initialRouteName: 'List',
    headerMode: 'none',
    transitionConfig: () => fromBottom(700),
});

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
        screen: FamiliaStack
    },
}, {
    initialRouteName: 'DomicilioForm',
    mode: 'modal',
    headerMode: 'none',
    transitionConfig: () => fromBottom(700),
});
