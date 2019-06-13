import React, { Component } from 'react';
import { connect } from 'react-redux';

import { FlatList } from 'react-native';

import {
    Text,
    Container,
    Content,
    ListItem,
    Body,
} from 'native-base';


import ZonaSelector from '@redux/modules/Zonas/mappers';
import ZonasActions from '@redux/modules/Zonas/actions';

class ZonaScreen extends Component {
    static navigationOptions = {
        title: 'Zona Screen',
    };

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        const { fetchZonas, Zonas } = this.props;
        if (Zonas.data.length) fetchZonas();
    }

    render() {
        const { getZonas } = this.props;
        return (
            <Container>
                <Content padder>
                    <Content>
                        <FlatList
                            data={getZonas()}
                            renderItem={this.renderItem.bind(this)}
                        />
                    </Content>
                </Content>
            </Container>
        );
    }

    renderItem({ item }) {
        return (
            <ListItem>
                <Body>
                    <Text>{item.nome}</Text>
                    <Text note>{`Posto ID: ${item.posto_id}`}</Text>
                </Body>
            </ListItem>
        );
    }

    // onPressItem(item) {
    //     const { navigation } = this.props;
    //     navigation.navigate('PublicAreas', { fieldGroup: item.id });
    // }
}

export default connect(ZonaSelector.MappingsZonaState, ZonasActions)(ZonaScreen);
