import React, { Component } from 'react';
import { Footer, FooterTab } from 'native-base';


import styles from './index.styl';

class LightFooter extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { props } = this;
        return (
            <Footer style={styles.lightFooter}>
                <FooterTab style={styles.lightFooterTabs}>
                    { props.children }
                </FooterTab>
            </Footer>
        );
    }
}

export default LightFooter;
