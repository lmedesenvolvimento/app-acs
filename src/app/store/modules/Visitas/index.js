import Types from './types';

const initialState = {
    data: [],
};

export default (state = initialState, action) => {
    const { data } = state;

    switch (action.type) {
    case Types.SET_VISITAS:
        return {
            ...state,
            data: action.data
        };

    case Types.ADD_VISITA:
        state.data.push(action.data);
        return Object.assign({}, state);

    case Types.UPDATE_VISITA:
        data[action.index] = action.data;
        return Object.assign({}, state);
    default:
        return state;
    }
};
