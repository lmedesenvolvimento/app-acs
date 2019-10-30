import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { DrawerActions } from 'react-navigation';
import { connect } from 'react-redux';

import {
    Text,
    Title,
    ListItem,
    Header,
    Left,
    Right,
    Body,
    Icon,
} from 'native-base';

import DrawerNavigation from '@/services/DrawerNavigation';
import MicroAreaActions from '@redux/modules/MicroAreas/actions';

import SafeView from '@/components/SafeView';
import HeaderLeftButton from '@/components/HeaderLeftButton';

class MicroAreaScreen extends Component {
    static navigationOptions = {
        title: 'Micro Areas Screen',
    };

    constructor(props) {
        super(props);
        this.state = {
            areas: [],
        };
    }

    componentDidMount() {
        const { getMicroAreas } = this.props;

        this.setState({
            areas: getMicroAreas()
        });
    }

    render() {
        const { state, props } = this;
        return (
            <SafeView navigation={props.navigation}>
                <Header noShadow>
                    <Left>
                        <HeaderLeftButton icon onPress={this.onPressMenu.bind(this)}>
                            <Icon name="menu" />
                        </HeaderLeftButton>
                    </Left>
                    <Body>
                        <Title>Microáreas</Title>
                    </Body>
                    <Right />
                </Header>
                <FlatList
                    data={state.areas}
                    renderItem={this.renderItem.bind(this)}
                />
            </SafeView>
        );
    }

    renderItem({ item }) {
        return (
            <ListItem iconLeft onPress={this.onPressItem.bind(this, item)}>
                <Icon name="street-view" type="FontAwesome" />
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
                microarea_key: item.key,
                microarea_nome: item.nome,
            });
        }, 200);
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
