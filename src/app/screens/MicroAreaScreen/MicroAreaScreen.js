import React, { Component } from 'react';
import { Alert, BackHandler, FlatList } from 'react-native';
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

import { orderBy } from 'lodash';

import DrawerNavigation from '@/services/DrawerNavigation';
import MicroAreaActions from '@redux/modules/MicroAreas/actions';

import SafeView from '@/components/SafeView';
import HeaderLeftButton from '@/components/HeaderLeftButton';

class MicroAreaScreen extends Component {
    static navigationOptions = {
        title: 'Micro Areas Screen',
    };

    componentDidMount() {
        const { navigation } = this.props;

        navigation.addListener('didFocus', () => {
            BackHandler.addEventListener(
                'hardwareBackPress',
                this.onBackButtonPressAndroid
            );
        });

        navigation.addListener('willBlur', () => {
            BackHandler.removeEventListener(
                'hardwareBackPress',
                this.onBackButtonPressAndroid
            );
        });
    }

    render() {
        const { state, props } = this;
        const { MicroAreas } = props;
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
                    data={this.orderMicroAreas(MicroAreas.data)}
                    extraData={state}
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
                    <Text note>{item.posto.nome}</Text>
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

    onBackButtonPressAndroid = () => {
        Alert.alert(
            'Confirmação',
            'Você deseja realmente sair do Aplicativo',
            [
                { text: 'Não', style: 'cancel' },
                { text: 'Sim', style: 'destructive', onPress: () => BackHandler.exitApp() }
            ]
        );

        return true;
    };

    orderMicroAreas = (data) => {
        return orderBy(data, ['nome']);
    }
}

const mapState = (state) => {
    const { MicroAreas } = state;
    return { MicroAreas };
};

export default connect(mapState, MicroAreaActions)(MicroAreaScreen);
