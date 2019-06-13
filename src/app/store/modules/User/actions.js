import { bindActionCreators } from 'redux';
import Types from './types';

export const actions = {
    setUser(data) {
        return {
            type: Types.SET_USER,
            data
        };
    }
};

export default dispatch => (
    bindActionCreators(Object.assign({}, actions), dispatch)
);
