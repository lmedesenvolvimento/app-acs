import { bindActionCreators } from 'redux';

import Types from './types';

const defineStatusBarContentToLight = () => ({
    type: Types.TO_LIGHT_STATUSBAR
});

const defineStatusBarContentToDark = () => ({
    type: Types.TO_DARK_STATUSBAR
});

const openInteventionalModal = () => ({
    type: Types.OPEN_INTERVENTIONAL_MODAL
});

const closeInteventionalModal = () => ({
    type: Types.CLOSE_INTERVENTIONAL_MODAL
});

export const actions = {
    defineStatusBarContentToDark,
    defineStatusBarContentToLight,
    openInteventionalModal,
    closeInteventionalModal
};

export default dispatch => (
    bindActionCreators(Object.assign({}, actions), dispatch)
);
