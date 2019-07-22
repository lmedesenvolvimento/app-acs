import React, { Component } from 'react';

import {
    Text,
    Content,
    Left,
    Icon,
} from 'native-base';

import Colors from '@/constants/Colors';

import SafeView from '@/components/SafeView';
import HeaderLeftButton from '@/components/HeaderLeftButton';
import LightHeader from '@/components/LightHeader';

class DomicilioFormMoradiaModal extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const { props } = this;
        return (
            <SafeView navigation={props.navigation} light={true}>
                <LightHeader navigation={props.navigation} title="Cadastro Domiciliar">
                    <Left>
                        <HeaderLeftButton icon onPress={this.onPressBack}>
                            <Icon name="ios-arrow-back" style={{ color: Colors.textColor }} />
                        </HeaderLeftButton>
                    </Left>
                </LightHeader>
                <Content padder>
                    <Text>Cond. Moradia</Text>
                </Content>
            </SafeView>
        );
    }
    onPressBack = () => {
        const { props } = this;
        props.navigation.goBack();
    }
}

export default DomicilioFormMoradiaModal;
