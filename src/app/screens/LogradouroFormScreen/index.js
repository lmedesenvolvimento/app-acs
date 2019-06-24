import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    Container,
    Text,
    Button,
    Left,
    Icon,
    H1,
    Body
} from 'native-base';

import LightHeader from '@/components/LightHeader';
import actions from '@redux/modules/Logradouros/actions';
import Colors from '@/constants/Colors';

import styles from './index.styl';

class LogradouroFormScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const { props } = this;
        const { navigation } = props;
        return (
            <Container>
                <LightHeader navigation={navigation}>
                    <Left>
                        <Button transparent onPress={this.goBack}>
                            <Icon name="ios-arrow-back" style={{ color: Colors.textColor }} />
                        </Button>
                    </Left>
                    <Body />
                </LightHeader>
                <Container style={styles.container}>
                    <H1>{ navigation.getParam('title') }</H1>
                    <Text>{ navigation.getParam('nome') }</Text>
                    <Text>{ navigation.getParam('bairro_id') }</Text>
                </Container>
            </Container>
        );
    }

    goBack = () => {
        const { navigation } = this.props;
        navigation.goBack();
    }
}

const mapStateToProps = ({ Logradouro }) => ({
    Logradouro
});

export default connect(mapStateToProps, actions)(LogradouroFormScreen);
