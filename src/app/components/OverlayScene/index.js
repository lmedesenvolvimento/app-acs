import React, { Component } from 'react';
import { Dimensions, StatusBar } from 'react-native';
import AnimatedOverlay from 'react-native-animated-overlay';

const size = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height + StatusBar.currentHeight,
};

class OverlayScene extends Component {
    render() {
        const { props } = this;
        return (
            <AnimatedOverlay
                style={[size, { flex: 1 }]}
                backgroundColor="#212121"
                opacity={props.opacity || 0.7}
                duration={props.visible ? 200 : 600}
                overlayShow={props.visible}
                useNativeDriver={true}
            />
        );
    }
}

export default OverlayScene;
