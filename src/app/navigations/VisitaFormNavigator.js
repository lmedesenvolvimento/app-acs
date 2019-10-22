import {
    createStackNavigator,
} from 'react-navigation';

import { fromBottom } from 'react-navigation-transitions';

export default createStackNavigator({
    Visita: {
        screen: require('@/screens/VisitaFormMainScreen').default
    },
    Ficha: {
        screen: require('@/modals/VisitaFicha').default
    },
    Motivo: {
        screen: require('@/modals/VisitaMotivo').default
    },
    DesfechoVisitia: {
        screen: require('@/modals/DesfechoVisitia').default
    },
}, {
    initialRouteName: 'Visita',
    mode: 'modal',
    headerMode: 'none',
    transitionConfig: () => fromBottom(600),
});