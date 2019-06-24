import { bindActionCreators } from 'redux';

import Types from './types';

const defineStatusBarContentToLight = () => ({
    type: Types.TO_LIGHT_STATUSBAR
});

const defineStatusBarContentToDark = () => ({
    type: Types.TO_DARK_STATUSBAR
});

export const actions = {
    defineStatusBarContentToDark,
    defineStatusBarContentToLight,
};

export default dispatch => (
    bindActionCreators(Object.assign({}, actions), dispatch)
);
