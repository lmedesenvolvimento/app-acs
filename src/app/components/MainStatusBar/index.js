import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { connect } from 'react-redux';

import Colors from '@/constants/Colors';

import styles from './styles';

class MainStatusBarColor extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const { props } = this;
        const backgroundColor = props.UI.lightStatusBar ? '#FFFFFF' : Colors.primaryColor;
        return (
            <View style={[styles.statusBar, { backgroundColor }]}>
                <StatusBar translucent backgroundColor={backgroundColor} />
            </View>
        );
    }
}

const mapStateToProps = ({ UI }) => ({
    UI
});

export default connect(mapStateToProps)(MainStatusBarColor);
