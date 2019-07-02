import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { Header, Body, Title } from 'native-base';
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
        props.navigation.addListener('willFocus', () => {
            props.defineStatusBarContentToLight(true);
        });
        props.navigation.addListener('willBlur', () => {
            setTimeout(() => props.defineStatusBarContentToDark(), 220);
        });
    }

    render() {
        const { props } = this;
        return (
            <Header style={styles.lightHeader} {...props} androidStatusBarColor="#fff" noShadow>
                <StatusBar barStyle="dark-content" />
                {props.children}
                {
                    props.title ? (
                        <Body>
                            <Title style={styles.lightHeaderTitle}>{props.title}</Title>
                        </Body>
                    ) : null
                }
            </Header>
        );
    }
}

const mapStateToProps = ({ UI }) => ({
    UI
});

export default connect(mapStateToProps, actions)(LightHeader);
