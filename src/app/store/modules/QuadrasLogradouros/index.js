import Types from './types';

const initialState = {
    data: []
};

export default (state = initialState, action) => {
    const { data } = state;
    switch (action.type) {
    case Types.SET_QUADRAS_LOGRADOUROS:
        return {
            ...state,
            data: action.data
        };
    case Types.ADD_QUADRAS_LOGRADOUROS:
        data.push(action.data);
        return Object.assign({}, state);
    case Types.DESTROY_QUADRAS_LOGRADOUROS:
        data.splice(action.index, 1);
        return Object.assign({}, state);
    default:
        return state;
    }
};
