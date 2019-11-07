import React from 'react';
import { Button } from 'native-base';

const HeaderLeftButton = (props) => {
    return (
        <Button transparent block style={{ justifyContent: 'flex-start' }} {...props}>
            { props.children }
        </Button>
    );
};

export default HeaderLeftButton;
