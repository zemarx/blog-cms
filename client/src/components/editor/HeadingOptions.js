// @flow

import React, { Component } from 'react';
import { Block, Row } from 'jsxstyle';

import Icon from 'components/Icon';
import Dropdown from 'components/Dropdown';


const BLOCK_TYPES = [
    {label: 'H1', style: 'header-one'},
    {label: 'H2', style: 'header-two'},
    {label: 'H3', style: 'header-three'},
    {label: 'H4', style: 'header-four'},
    {label: 'H5', style: 'header-five'},
    {label: 'H6', style: 'header-six'}
];


const dropdownItems = BLOCK_TYPES.map((type, index) => {
    return {
        key: type.style,
        value: type.label
    }
});

type State = {
    selectedHeading: Object
};

class HeadingOptions extends Component<any, State> {
    constructor (props) {
        super(props);

        this.state = {
            selectedHeading: dropdownItems[0]
        }
    }

    render () {
        const { editorState } = this.props;
        const selection = editorState.getSelection();
        const blockType = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();


        return (
            <Block
                margin="0 3px"
            >
                <Dropdown
                    items={dropdownItems}
                    selectedItem={this.state.selectedHeading}
                    onSelect={this.onHeadingSelect}
                    width="60px"
                    height="28px"
                />
            </Block>
        )
    }

    onHeadingSelect = (heading) => {
        this.setState({
            selectedHeading: heading
        });

        this.props.onToggle(heading.key);
    }
}

export default HeadingOptions;


