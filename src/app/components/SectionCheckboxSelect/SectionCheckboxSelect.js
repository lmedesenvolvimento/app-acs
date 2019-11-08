import React, { useState, useEffect } from 'react';

import {
    SectionList
} from 'react-native';

import {
    ListItem,
    CheckBox,
    Body,
    Text
} from 'native-base';

import {
    cloneDeep,
    isArray,
    findIndex,
    flatten
} from 'lodash';

import Colors from '@/constants/Colors';

const SectionCheckboxSelect = (props) => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const value = cloneDeep(props.sections).map((section) => {
            section.data.map((item) => {
                item.checked = isArray(props.default)
                    ? props.default.includes(item.key)
                    : false;

                return item;
            });

            return section;
        });

        setItems(value);
    }, [props.sections, props.default]);

    const renderItem = ({ item, index, section }) => (
        <ListItem onPress={() => onSelectItem(item, index, section)} last noBorder>
            <CheckBox
                checked={item.checked}
                onPress={() => onSelectItem(item, index, section)}
                color={Colors.primaryColor}
            />
            <Body>
                <Text>{item.text}</Text>
            </Body>
        </ListItem>
    );

    const renderSectionHeader = ({ section: { title, data } }) => {
        if (data.length) {
            return (
                <Text style={{ marginVertical: 16, marginHorizontal: 8 }} note>{title}</Text>
            );
        }
        return null;
    };

    const onSelectItem = (item, index, section) => {
        const cloneItems = cloneDeep(items);
        const sectionIndex = findIndex(items, { title: section.title });

        section.data[index].checked = !item.checked;
        cloneItems[sectionIndex] = section;

        setItems(cloneItems);

        const mergeSection = items.map(({ data }) => data);
        const result = flatten(mergeSection)
            .filter(({ checked }) => checked)
            .map(({ key }) => key);

        props.onChangeValue(result);
    };

    return (
        <SectionList
            sections={items}
            extraData={props.default}
            renderItem={renderItem}
            renderSectionHeader={renderSectionHeader}
        />
    );
};

export default SectionCheckboxSelect;
