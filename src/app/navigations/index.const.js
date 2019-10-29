import Colors from '@/constants/Colors';

export const defaultNavigationOptions = {
    headerStyle: {
        backgroundColor: Colors.primaryColor,
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
        fontWeight: 'normal',
    },
};

export const modals = [
    'LogradouroForm',
    'DomicilioForm',
    'Endereco',
    'Moradia',
    'Animais',
    'Familias',
    'IndividuoIDUsuario',
    'IndividuoInfoSocio',
    'IndividuoCadastroSaida',
    'IndividuoCondicaoSaude',
    'IndividuoSituacaoRua',
    'Visita',
    'Ficha',
    'Motivo',
    'Desfecho'
];

export default {
    defaultNavigationOptions
};
