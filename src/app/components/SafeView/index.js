import React, { Component } from 'react';
import { Animated, Dimensions, Easing } from 'react-native';
import { NavigationActions } from 'react-navigation';

import Colors from '@/constants/Colors';
import { modals } from '@/navigations/index.const';

import MainStatusBar from '@/components/MainStatusBar';
import OverlayScene from '@/components/OverlayScene';

import styles from './index.styl';

class SafeView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOverlay: false,
            screenWidth: Dimensions.get('window').width,
            translateX: new Animated.Value(0),
        };
    }
    componentDidMount() {
        const { navigation } = this.props;
        navigation.addListener('willFocus', this.translateOut);
        navigation.addListener('willBlur', this.translateIn);
    }
    render() {
        const { props, state } = this;
        const { translateX } = state;
        const transform = [{ translateX }];

        return (
            <Animated.View style={[styles.container, transform]}>
                <MainStatusBar barStyle="light-content" backgroundColor={props.light ? '#FFFFFF' : Colors.primaryColor} />
                {props.children}
                <OverlayScene opacity={0.36} visible={state.isOverlay} />
            </Animated.View>
        );
    }

    translateIn = (payload) => {
        const { state } = this;

        if (payload.action.type === NavigationActions.BACK) return;

        this.setState({ isOverlay: true });

        if (modals.includes(payload.action.routeName)) return;

        Animated.timing(
            state.translateX,
            {
                toValue: -(state.screenWidth * 0.24),
                easing: Easing.ease,
                duration: 200,
                useNativeDriver: true
            }
        ).start();
    }

    translateOut = (payload) => {
        const { state } = this;

        this.setState({ isOverlay: false });

        if (modals.includes(payload.action.routeName)) return;

        Animated.timing(
            state.translateX,
            {
                toValue: 0,
                easing: Easing.linear,
                duration: 240,
                useNativeDriver: true
            }
        ).start();
    }
}

export default SafeView;
