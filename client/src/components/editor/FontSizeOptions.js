// @flow

import React, { Component } from 'react';
import { Block, Row } from 'jsxstyle';

import Icon from 'components/Icon';
import Dropdown from 'components/Dropdown';

const fontSizeStyleMap = {
    'font-size-10': {
        fontSize: 10
    },
    'font-size-11': {
        fontSize: 11
    },
    'font-size-12': {
        fontSize: 12
    },
    'font-size-13': {
        fontSize: 13
    },
    'font-size-23': {
        fontSize: 23
    }
};


const dropdownItems = Object.keys(fontSizeStyleMap).map((key, index) => {
    return {
        key: key,
        value: fontSizeStyleMap[key].fontSize
    }
});


type State = {
    selectedFont: Object
};

class FontSizeOptions extends Component<any, State> {
    constructor (props) {
        super(props);

        this.state = {
            selectedFont: dropdownItems[3]
        }
    }

    render () {
        return (
            <Block
                margin="0 3px"
            >
                <Dropdown
                    items={dropdownItems}
                    selectedItem={this.state.selectedFont}
                    onSelect={this.onFontSelect}
                    width="55px"
                    height="28px"
                />
            </Block>
        )
    }

    onFontSelect = (fontItem) => {
        this.setState({
            selectedFont: fontItem
        });

        this.props.onToggle(fontItem.key);
    }
}

export {
    fontSizeStyleMap
}

export default FontSizeOptions;
