import React from 'react';
import { View, StatusBar } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import { connect, useSelector } from 'react-redux';

import styles from './index.styl';

const LoadingScreen = () => {
    const visible = useSelector(state => state.UI.interventionalModal);

    return (
        <View style={styles}>
            <StatusBar hidden={visible} />
            <Spinner
                visible={visible}
                textContent="Aguarde alguns instantes"
                textStyle={{ color: '#fff' }}
                size="large"
                overlayColor="rgba(0, 0, 0, 0.75)"
            />
        </View>
    );
};

export default connect(null)(LoadingScreen);
