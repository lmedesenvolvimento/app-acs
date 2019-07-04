import React, { Component } from 'react';
import { Button } from 'native-base';

class HeaderLeftButton extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const { props } = this;
        return (
            <Button transparent block style={{ justifyContent: 'flex-start' }} {...props}>
                { props.children }
            </Button>
        );
    }
}

export default HeaderLeftButton;
