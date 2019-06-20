import React, { Component } from 'react';
// import { connect } from 'react-redux';
import { Container, Header, Content, Text, Left, Title, Body } from 'native-base';

export default class LogradouroFormScreen extends Component {
    state = { payload: {} }
    render() {
        const { props } = this;
        const { navigation } = props;
        return (
            <Container>
                <Header>
                    <Body>
                        <Title>{ navigation.state.params.title }</Title>
                    </Body>
                </Header>
                <Content padder>
                    <Text>FormLogradouro</Text>
                    <Text>{navigation.state.params.logradouro.nome }</Text>
                    <Text>{navigation.state.params.logradouro.bairro_id }</Text>
                </Content>
            </Container>
        );
    }
}

// export default connect()(LogradouroFormScreen);