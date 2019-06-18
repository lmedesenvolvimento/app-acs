import { clone } from 'lodash';
import Types from './types';

const initialState = {
    syncronized: false,
    downloaded: false,
    syncronized_at: null,
    downloaded_at: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
    case Types.FETCH_DATA:
        return {
            ...state,
            downloaded: true,
            downloaded_at: new Date()
        };
    case Types.EMIT_DATA:
        return {
            ...state,
            syncronized: true,
            syncronized_at: new Date(),
            downloaded: false,
            downloaded_at: null
        };
    case Types.CLEAR_DATA:
        return {
            ...state,
            ...clone(initialState)
        };
    default:
        return state;
    }
};
