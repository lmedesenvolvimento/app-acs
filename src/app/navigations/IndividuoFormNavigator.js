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
    transitionConfig: () => fromBottom(600),
});

export default createStackNavigator({
    IndividuoForm: {
        screen: require('@/screens/IndividuoFormMainScreen').default
    },
    IndividuoIDUsuario: {
        screen: require('app/modals/IndividuoIDUsuario').default
    },
    IndividuoInfoSocio: {
        screen: require('@/modals/IndividuoInfoSocio').default
    },
    Animais: {
        screen: require('@/modals/DomicilioFormAnimais').default
    },
    Familias: {
        screen: FamiliaStack
    },
}, {
    initialRouteName: 'IndividuoForm',
    mode: 'modal',
    headerMode: 'none',
    transitionConfig: () => fromBottom(600),
});
