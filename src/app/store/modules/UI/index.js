import Types from './types';

const inititalState = {
    lightStatusBar: false
};

export default (state = inititalState, action) => {
    switch (action.type) {
    case Types.TO_LIGHT_STATUSBAR:
        return {
            ...state,
            lightStatusBar: true
        };
    case Types.TO_DARK_STATUSBAR:
        return {
            ...state,
            lightStatusBar: false
        };
    default:
        return state;
    }
};
