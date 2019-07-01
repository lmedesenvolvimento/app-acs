/* eslint-disable max-len */
import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { DrawerActions } from 'react-navigation';
import { connect } from 'react-redux';

import {
    Text,
    Title,
    Container,
    ListItem,
    Header,
    Left,
    Right,
    Body,
    Button,
    Icon,
} from 'native-base';

import DrawerNavigation from '@/services/DrawerNavigation';
import MicroAreaActions from '@redux/modules/MicroAreas/actions';

import Overlay from 'app/components/OverlayScene';

class MicroAreaScreen extends Component {
    static navigationOptions = {
        title: 'Micro Areas Screen',
    };

    constructor(props) {
        super(props);
        this.state = {
            areas: [],
            isOverlay: false
        };
    }

    componentDidMount() {
        const { getMicroAreas, navigation } = this.props;

        navigation.addListener('willFocus', () => this.setState({ isOverlay: false }));

        this.setState({
            areas: getMicroAreas()
        });
    }

    render() {
        const { state } = this;
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={this.onPressMenu.bind(this)}>
                            <Icon name="menu" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Microáreas</Title>
                    </Body>
                    <Right />
                </Header>
                <FlatList
                    data={state.areas}
                    keyExtractor={item => `microarea-${item.id}`}
                    renderItem={this.renderItem.bind(this)}
                />
                <Overlay visible={state.isOverlay} />
            </Container>
        );
    }

    renderItem({ item }) {
        return (
            <ListItem onPress={this.onPressItem.bind(this, item)}>
                <Body>
                    <Text>{item.nome}</Text>
                    <Text note>{`Posto ID: ${item.posto.nome}`}</Text>
                </Body>
            </ListItem>
        );
    }

    onPressItem(item) {
        const { navigation } = this.props;

        setTimeout(() => {
            navigation.navigate('Quadras', {
                microarea_id: item.key,
                microarea_nome: item.nome,
            });

            this.setState({
                isOverlay: true
            });
        }, 400);
    }

    onPressMenu() {
        DrawerNavigation.getDrawerNavigator().dispatch(DrawerActions.toggleDrawer());
    }
}

const mapState = (state) => {
    const { MicroAreas } = state;
    return { MicroAreas };
};

export default connect(mapState, MicroAreaActions)(MicroAreaScreen);
