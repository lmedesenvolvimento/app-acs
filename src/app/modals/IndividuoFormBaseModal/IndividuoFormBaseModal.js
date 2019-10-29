import DomicilioFormBaseModal from '@/modals/DomicilioFormBaseModal';

import {
    convertToPISNIS
} from '@/helpers';

class IndividuoFormBaseModal extends DomicilioFormBaseModal {
    convertToPISNIS = convertToPISNIS
}

export default IndividuoFormBaseModal;
