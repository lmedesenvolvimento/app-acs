import { PublicAreaTypes } from '@/types/publicarea'

const initialState = {
    'ref1': {
        $field_group: 1,
        type: PublicAreaTypes.street,
        address: "Rua Exemplo",
    },
    'ref2': {
        $field_group: 1,
        type: PublicAreaTypes.street,
        address: "Rua Exemplo 2",
    },
    'ref13': {
        $field_group: 2,
        type: PublicAreaTypes.street,
        address: "Rua Exemplo 3",
    },
    'ref4': {
        $field_group: 2,
        type: PublicAreaTypes.street,
        address: "Rua Exemplo 4",
    }
}

export default (state = initialState, action) => {
  return state;
  // switch (action.type) {

  // case typeName:
  //   return { ...state };

  // default:
  //   return state
  // }
};
