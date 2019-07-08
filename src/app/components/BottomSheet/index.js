import React, { Component } from 'react';
import { StatusBar, Dimensions } from 'react-native';
import ModalBox from 'react-native-modalbox';

class BottomSheet extends Component {
    constructor(props) {
        super(props);
        this.modal = null;
        this.state = {};
    }
    render() {
        const { props } = this;
        return (
            <ModalBox
                ref={modal => this.modal = modal}
                style={{ flex: 0.33, marginTop: StatusBar.currentHeight }}
                position="bottom"
                {...props}
            >
                { props.children }
            </ModalBox>
        );
    }

    open() {
        this.modal.open();
    }

    close() {
        this.modal.close();
    }
}

export default BottomSheet;
