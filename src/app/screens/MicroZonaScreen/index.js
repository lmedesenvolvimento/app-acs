/* eslint-disable max-len */
import React, { Component } from 'react';
import { SafeAreaView } from 'react-native';
import { connect } from 'react-redux';

import { FlatList } from 'react-native';

import {
    Text,
    Container,
    Content,
    ListItem,
    Body,
} from 'native-base';


import MicroZonaSelector from '@redux/modules/MicroZonas/mappers';
import MicroZonasActions from '@redux/modules/MicroZonas/actions';

class MicroZonaScreen extends Component {
    static navigationOptions = {
        title: 'MicroZona Screen',
    };

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        const { fetchMicroZonas, MicroZonas } = this.props;
        if (MicroZonas.data.length) fetchMicroZonas();
    }

    render() {
        const { getMicroZonas } = this.props;
        return (
            <SafeAreaView>
                <Container>
                    <Content padder>
                        <Content>
                            <FlatList
                                data={getMicroZonas()}
                                renderItem={this.renderItem.bind(this)}
                            />
                        </Content>
                    </Content>
                </Container>
            </SafeAreaView>
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

export default connect(MicroZonaSelector.MappingsMicroZonasState, MicroZonasActions)(MicroZonaScreen);
