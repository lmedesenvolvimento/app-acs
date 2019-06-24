import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { Header } from 'native-base';
import { connect } from 'react-redux';

import actions from '@redux/modules/UI/actions';

import styles from './index.styl';

class LightHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        const { props } = this;
        props.defineStatusBarContentToLight(true);
        props.navigation.addListener('willBlur', () => {
            props.defineStatusBarContentToDark();
        });
    }

    render() {
        const { props } = this;
        return (
            <Header style={styles.lightHeader} {...props} androidStatusBarColor="#fff">
                <StatusBar barStyle="dark-content" />
                {props.children}
            </Header>
        );
    }
}

const mapStateToProps = ({ UI }) => ({
    UI
});

export default connect(mapStateToProps, actions)(LightHeader);
