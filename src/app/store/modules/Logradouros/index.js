import Types from './types';

const initialState = {
    data: []
};

export default (state = initialState, action) => {
    const { data } = state;
    switch (action.type) {
    case Types.SET_LOGRADOUROS:
        return {
            ...state,
            data: action.data
        };
    case Types.ADD_LOGRADOURO:
        state.data.push(action.data);
        return Object.assign({}, state);
    case Types.UPDATE_LOGRADOURO:
        data[action.index] = action.data;
        return Object.assign({}, state);
    case Types.DESTROY_LOGRADOURO:
        data.slice(action.index, 1);
        return Object.assign({}, state);
    default:
        return state;
    }
};
