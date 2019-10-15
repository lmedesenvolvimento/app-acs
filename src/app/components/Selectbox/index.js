import React, { useState } from 'react';
import { Picker, Icon } from 'native-base';

import { isObject, map } from 'lodash';

const SelectBox = (props) => {
    const [value, setValue] = useState(props.default || undefined);
    const onValueChange = (val) => {
        setValue(val);
        props.onValueChange(val);
    };

    const PickerItems = () => {
        if (isObject(props.data)) {
            return map(props.data, (label, key) => (
                <Picker.Item key={key} label={label} value={key} />
            ));
        }

        return props.data.map(({ key, label }) => (
            <Picker.Item key={key} label={label} value={label} />
        ));
    };

    return (
        <Picker
            note={!value}
            mode="dropdown"
            style={{ width: undefined }}
            iosIcon={<Icon name="arrow-down" />}
            placeholder={props.placeholder}
            placeholderIconColor="#007aff"
            selectedValue={value}
            onValueChange={val => onValueChange(val)}
        >
            <Picker.Item label={props.placeholder || 'Selecione um'} value={undefined} />
            { PickerItems() }
        </Picker>
    );
};

export default SelectBox;
