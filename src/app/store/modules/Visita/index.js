import Types from './types';

const initialState = {
    data: [],
    domicilio: {}
};

export default (state = initialState, action) => {
    const { data } = state;

    switch (action.type) {
    case Types.SET_DOMICILIOS:
        return {
            ...state,
            data: action.data
        };

    case Types.ADD_DOMICILIOS:
        state.data.push(action.data);
        return Object.assign({}, state);

    case Types.UPDATE_DOMICILIOS:
        data[action.index] = action.data;
        return Object.assign({}, state);

    case Types.DESTROY_DOMICILIOS:
        state.data.splice(action.index, 1);
        return Object.assign({}, state);

    default:
        return state;
    }
};
