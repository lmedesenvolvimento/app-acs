import React, { Component } from 'react';
import { Container } from 'native-base';

import MainStatusBar from '@/components/MainStatusBar';
import OverlayScene from '@/components/OverlayScene';

class SafeView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOverlay: false,
        };
    }
    componentDidMount() {
        const { navigation } = this.props;
        navigation.addListener('willFocus', () => this.setState({ isOverlay: false }));
        navigation.addListener('willBlur', () => this.setState({ isOverlay: true }));
    }
    render() {
        const { props, state } = this;
        return (
            <Container>
                <MainStatusBar barStyle="light-content" />
                {props.children}
                <OverlayScene visible={state.isOverlay} />
            </Container>
        );
    }
}

export default SafeView;
