/* eslint-disable arrow-parens */
import { omit } from 'lodash';
import { blacklist } from '../index.const';

import Localstorage from '@/services/LocalStorage';

const IGNORE_ACTIONS = [
    'CONNECTED',
    'NOTCONNECTED',
    'SIGNED',
    'SIGNOUT',
    'SIGNIN_START',
    'SIGNIN_DONE',
    'SIGNIN_FAIL',
    'TO_DARK_STATUSBAR',
    'TO_LIGHT_STATUSBAR',
    'SET_USER',
    'EMIT_DATA',
    'CLEAR_DATA'
];

const SessionsMiddleware = store => next => action => {
    next(action);

    if (IGNORE_ACTIONS.includes(action.type)) return;

    const state = store.getState();
    const payload = omit(state, blacklist);

    if (!payload.User.data) return;

    Localstorage.read().then((session) => {
        const user = payload.User.data;
        const email = user.email.replace(/\./g, ';');

        // sync with localstorage
        session
            .set(email, { user, data: payload })
            .write()
            .value();

        // eslint-disable-next-line no-undef
        if (__DEV__) {
            const jsonstr = JSON.stringify(session.get(email).value());
            console.log('session saved!', jsonstr.length, new Date());
        }

    });
};

export default SessionsMiddleware;
