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


import PublicAreasActions from '@redux/modules/PublicAreas/actions';

class PublicAreas extends Component {
    static navigationOptions = {
        title: 'PublicAreas',
    };

    constructor(props) {
        super(props);
        this.state = {
            fieldGroupId: null
        };
    }

    componentDidMount() {
        const { navigation } = this.props;
        const fieldGroupId = navigation.state.params.fieldGroup;
        this.setState({ fieldGroupId });
    }

    render() {
        const { getPublicAreas } = this.props;
        const { fieldGroupId } = this.state;
        const areas = getPublicAreas(fieldGroupId);
        return (
            <Container>
                <Content padder>
                    <Content>
                        <FlatList
                            data={areas}
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
                    <Text>{item.address}</Text>
                </Body>
            </ListItem>
        );
    }
}

export default connect(null, PublicAreasActions)(PublicAreas);
