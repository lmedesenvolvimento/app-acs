import { PublicAreaTypes } from '@/types/publicarea'
import { generate as shortid } from 'shortid'

const initialState = {
    data: [
        {
            $field_group: 1,
            key: shortid(),
            type: PublicAreaTypes.street,
            address: "Rua Exemplo",
        },
        {
            $field_group: 1,
            key: shortid(),
            type: PublicAreaTypes.street,
            address: "Rua Exemplo 2",
        },
        {
            $field_group: 2,
            key: shortid(),
            type: PublicAreaTypes.street,
            address: "Rua Exemplo 3",
        },
        {
            $field_group: 2,
            key: shortid(),
            type: PublicAreaTypes.street,
            address: "Rua Exemplo 4",
        }
    ]
}

export default (state = initialState, action) => {
    return state
    // switch (action.type) {

    //     case typeName:
    //         return { ...state };

    //     default:
    //         return state
    // }
};
