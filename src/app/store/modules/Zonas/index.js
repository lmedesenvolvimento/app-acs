import Types from './types';
import Zona from '@/models/Zona';

const initialState = {
    data: [
        new Zona(1, 1, 'Zona 1', new Date(), new Date()),
        new Zona(2, 1, 'Zona 2', new Date(), new Date())
    ]
};

export default (state = initialState, action) => {
    switch (action.type) {
    case Types.FETCH_ZONAS:
        return {
            ...state,
            data: action.data
        };
    default:
        return state;
    }
};
