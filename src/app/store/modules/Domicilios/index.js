import { clone } from 'lodash';
import Types from './types';

const initialState = {
    data: [],
    domicilio: {}
};

export default (state = initialState, action) => {
    const { data } = state;
    const domicilio = clone(state.domicilio);

    switch (action.type) {
    case Types.SET_DOMICILIOS:
        return {
            ...state,
            data: action.data
        };
    case Types.ADD_DOMICILIOS:
        data.push(domicilio);
        return Object.assign({}, state);
    case Types.DESTROY_DOMICILIOS:
        data.splice(action.index, 1);
        return Object.assign({}, state);
    default:
        return state;
    }
};
