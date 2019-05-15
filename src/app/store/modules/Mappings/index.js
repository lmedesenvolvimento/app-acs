import { MappingStatus } from "@/types/mapping"

const initialState = {
    'ref1': {
        id: 1,
        cycle_id: 1,
        status: MappingStatus.not_finished,
        field_group: {
            id: 1,
            name: 'Quadra 1',
            neighborhood: {
                name: 'Messejana'
            }
        }
    },
    'ref2': {
        id: 2,
        cycle_id: 1,
        status: MappingStatus.not_finished,
        field_group: {
            id: 2,
            name: 'Quadra 2',
            neighborhood: {
                name: 'Messejana'
            }
        }
    }
}

export default (state = initialState, action) => {
    return state;
//   switch (action.type) {

//   case typeName:
//     return { ...state };

//   default:
//     return state
//   }
};
