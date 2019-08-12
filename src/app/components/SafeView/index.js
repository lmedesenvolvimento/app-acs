import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import { NavigationActions } from 'react-navigation';

import Colors from '@/constants/Colors';
import { modals } from '@/navigations/index.const';

import MainStatusBar from '@/components/MainStatusBar';
import OverlayScene from '@/components/OverlayScene';

import posed from 'react-native-pose';

import styles from './index.styl';

const AnimatedView = posed.View({
    in: {
        x: -(Dimensions.get('window').width * 0.50),
        transition: {
            translateX: { ease: 'easeOut', duration: 300 }
        }
    },
    out: {
        x: 0,
        transition: {
            x: { ease: 'easeOut', duration: 300 }
        }
    }
});

class SafeView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOverlay: false,
            pushed: false,
        };
    }
    componentDidMount() {
        const { navigation } = this.props;
        navigation.addListener('willFocus', this.translateOut);
        navigation.addListener('willBlur', this.translateIn);
    }
    render() {
        const { props, state } = this;

        return (
            <AnimatedView style={styles.container} pose={state.pushed ? 'in' : 'out'}>
                <MainStatusBar barStyle="light-content" backgroundColor={props.light ? '#FFFFFF' : Colors.primaryColor} />
                {props.children}
                <OverlayScene opacity={0.36} visible={state.isOverlay} />
            </AnimatedView>
        );
    }

    translateIn = (payload) => {
        if (payload.action.type === NavigationActions.BACK) return;

        this.setState({ isOverlay: true });

        if (modals.includes(payload.action.routeName)) return;

        this.setState({ pushed: true });
    }

    translateOut = (payload) => {
        this.setState({ isOverlay: false });

        if (modals.includes(payload.action.routeName)) return;

        this.setState({ pushed: false });
    }
}

export default SafeView;
