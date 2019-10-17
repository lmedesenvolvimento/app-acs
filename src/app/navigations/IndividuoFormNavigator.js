import {
    createStackNavigator,
} from 'react-navigation';

import { fromBottom } from 'react-navigation-transitions';

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
    IndividuoCadastroSaida: {
        screen: require('@/modals/IndividuoCadastroSaida').default
    },
    IndividuoCondicaoSaude: {
        screen: require('@/modals/IndividuoCondicaoSaude').default
    },
}, {
    initialRouteName: 'IndividuoForm',
    mode: 'modal',
    headerMode: 'none',
    transitionConfig: () => fromBottom(600),
});
