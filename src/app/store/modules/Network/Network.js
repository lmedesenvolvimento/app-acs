import network_types from './types';

const initialState = {
    isConnected: false
};

export default (state = initialState, action) => {
    switch (action.type) {
    case network_types.CONNECTED:
        return { ...state, isConnected: true };
    case network_types.NOTCONNECTED:
        return { ...state, isConnected: false };
    default:
        return state;
    }
};
