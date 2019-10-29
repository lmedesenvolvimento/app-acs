import { bindActionCreators } from 'redux';
import Actions from './types';

function setStatusOnline() {
    return { type: Actions.CONNECTED };
}

function setStatusOffline() {
    return { type: Actions.NOTCONNECTED };
}

export const actions = {
    setStatusOnline,
    setStatusOffline
};

export default dispatch => (
    bindActionCreators(Object.assign({}, actions), dispatch)
);
