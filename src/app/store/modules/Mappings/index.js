import Types from './types';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {

  case Types.FETCH_MAPPINGS:
  return { 
        ...state,
        ...action.data
    };

  default:
    return state
  }
};
