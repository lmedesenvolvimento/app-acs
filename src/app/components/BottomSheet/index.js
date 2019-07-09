import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import ModalBox from 'react-native-modalbox';

class BottomSheet extends Component {
    constructor(props) {
        super(props);
        this.modal = null;
        this.state = {};
    }
    render() {
        const { props } = this;
        const modalHeight = 260;
        return (
            <ModalBox
                ref={modal => this.modal = modal}
                style={{ height: modalHeight, marginTop: StatusBar.currentHeight }}
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
