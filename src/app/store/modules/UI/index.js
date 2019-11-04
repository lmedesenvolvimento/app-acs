import Types from './types';

const inititalState = {
    lightStatusBar: false,
    interventionalModal: false
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
    case Types.OPEN_INTERVENTIONAL_MODAL:
        return {
            ...state,
            interventionalModal: true
        };
    case Types.CLOSE_INTERVENTIONAL_MODAL:
        return {
            ...state,
            interventionalModal: false
        };
    default:
        return state;
    }
};
