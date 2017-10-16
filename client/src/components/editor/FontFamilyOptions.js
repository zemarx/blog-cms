// @flow

import React, { Component } from 'react';
import { Block, Row } from 'jsxstyle';

import Icon from 'components/Icon';
import Dropdown from 'components/Dropdown';

const fontFamilyStyleMap = {
    'font-family-arial': {
        fontFamily: 'Arial'
    },
    'font-family-georgia': {
        fontFamily: 'Georgia'
    }
};

const dropdownItems = Object.keys(fontFamilyStyleMap).map((key, index) => {
    return {
        key: key,
        value: fontFamilyStyleMap[key].fontFamily
    }
});

type State = {
    selectedFont: Object
};

class FontFamilyOptions extends Component<any, State> {
    constructor (props) {
        super(props);

        this.state = {
            selectedFont: dropdownItems[0]
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
                    width="90px"
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
    fontFamilyStyleMap
}

export default FontFamilyOptions;

