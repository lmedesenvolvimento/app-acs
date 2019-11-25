import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';

import {
    Text,
    Title,
    ListItem,
    Header,
    Left,
    Right,
    Body,
    Button,
    Icon,
} from 'native-base';

import DrawerNavigation from '@/services/DrawerNavigation';

import QuadraActions from '@redux/modules/Quadras/actions';

import SafeView from '@/components/SafeView';
import HeaderLeftButton from '@/components/HeaderLeftButton';

class QuadraScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quadras: [],
        };
    }

    componentDidMount() {
        const { getQuadrasByMicroareaID, navigation } = this.props;
        this.setState({
            quadras: getQuadrasByMicroareaID(navigation.getParam('microarea_key'))
        });
    }

    render() {
        const { state, props } = this;
        return (
            <SafeView navigation={props.navigation}>
                <Header noShadow>
                    <Left>
                        <HeaderLeftButton icon onPress={this.onPressBack.bind(this)}>
                            <Icon name="ios-arrow-back" />
                        </HeaderLeftButton>
                    </Left>
                    <Body>
                        <Title>{`Quarteirões - ${props.navigation.getParam('microarea_nome')}`}</Title>
                    </Body>
                    <Right>
                        <Button icon transparent onPress={this.goSync}>
                            <Icon name="md-sync" />
                        </Button>
                    </Right>
                </Header>
                <FlatList
                    data={state.quadras}
                    ListEmptyComponent={this.renderEmptyContent}
                    renderItem={this.renderItem.bind(this)}
                />
            </SafeView>
        );
    }

    renderItem({ item }) {
        return (
            <ListItem iconLeft onPress={() => this.onPressItem(item)}>
                <Icon name="map" type="FontAwesome" />
                <Body>
                    <Text>{item.nome}</Text>
                    <Text note>{item && item.bairro ? item.bairro.nome : ''}</Text>
                </Body>
            </ListItem>
        );
    }

    renderEmptyContent() {
        return (
            <ListItem>
                <Body>
                    <Text>Quadras vazias</Text>
                </Body>
            </ListItem>
        );
    }

    goSync = () => {
        DrawerNavigation.navigate('Sync');
    }

    onPressItem = (item) => {
        const { navigation } = this.props;
        setTimeout(() => {
            navigation.navigate('Logradouros', {
                quadra_key: item.key,
                quadra_nome: item.nome,
                bairro: item.bairro
            });
        }, 200);
    }

    onPressBack() {
        const { navigation } = this.props;
        navigation.goBack();
    }
}

const mapState = (state) => {
    const { Quadras } = state;
    return { Quadras };
};

export default connect(mapState, QuadraActions)(QuadraScreen);
