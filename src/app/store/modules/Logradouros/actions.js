import { bindActionCreators } from 'redux';
import Types from './types';


export const actions = {
    setLogradouros(data) {
        return {
            type: Types.SET_LOGRADOUROS,
            data
        };
    },
    clearLogradouro: {
        type: Types.SET_LOGRADOUROS,
        data: []
    }
};

export const getters = {
    getLogradouros() {
        return (dispatch, getState) => {
            return getState().Logradouros.data;
        };
    }
};

export default dispatch => (
    bindActionCreators(Object.assign({}, actions, getters), dispatch)
);
