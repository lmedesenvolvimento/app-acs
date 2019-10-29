import { NetInfo } from 'react-native';
import { connect } from 'react-redux';

import NetworkActions from '@redux/modules/Network/actions';

// const TYPES = {
//   none: 'none',
//   wifi: 'wifi',
//   cellular: 'cellular',
//   unknown: 'unknown'
// };


const NetworkProvider = ({ children, setStatusOnline, setStatusOffline }) => {
    const onConnectivityChange = (isConnected) => {
        return isConnected ? setStatusOnline() : setStatusOffline();
    };

    NetInfo.isConnected.addEventListener(
        'connectionChange',
        isConnected => onConnectivityChange(isConnected)
    );

    return children;
};

export default connect(null, NetworkActions)(NetworkProvider);
