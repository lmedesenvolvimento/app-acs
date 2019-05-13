import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import Spinner from "react-native-loading-spinner-overlay";

import { connect } from 'react-redux';

import { LoadingMapState } from '@redux/modules/Loading/mappers';
import LoadingActions from '@redux/modules/Loading/actions';

import styles from './index.styl'

class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  
  render() {
    let { Loading } = this.props;
    return (
        <View style={styles}>
            <StatusBar hidden={Loading.visible} />
            <Spinner visible={Loading.visible} textContent="Aguarde alguns instantes" textStyle={{color: '#fff'}} />
        </View>
    );
  }
}

export default connect(LoadingMapState, LoadingActions)(Loading);