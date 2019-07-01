import React, { Component } from 'react';
import AnimatedOverlay from 'react-native-animated-overlay';

class OverlayScene extends Component {
    constructor(props) {
        super(props);
        this.state = {
            useNativeDriver: true
        };
    }

    render() {
        const { props, state } = this;
        return (
            <AnimatedOverlay
                backgroundColor="#000"
                opacity={0.7}
                duration={props.visible ? 200 : 600}
                overlayShow={props.visible}
                useNativeDriver={state.useNativeDriver}
            />
        );
    }
}

export default OverlayScene;
