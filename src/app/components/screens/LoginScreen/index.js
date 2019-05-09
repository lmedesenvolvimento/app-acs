import React, { Component } from 'react';
import { View, Text } from 'react-native';

class LoginScreen extends Component {
    static navigationOptions = {
        title: 'LoginScreen',
    };
    
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View>
                <Text> textInComponent </Text>
            </View>
        );
    }
}

export default LoginScreen;
