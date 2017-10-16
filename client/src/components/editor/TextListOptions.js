// @flow

import React from 'react';
import { Block, Row } from 'jsxstyle';

import Icon from 'components/Icon';


const OptionIcon = ({label, isActive, style, onToggle, ...props}) => (
    <Block
        width={20}
        height={20}
        padding={4}
        margin={5}
        borderRadius={4}
        boxShadow="0px 1px 4px #888888"
        cursor="pointer"
        backgroundColor={isActive ? '#dedede' : '#ffffff'}
        hoverBackgroundColor="#dedede"
        {...props}
        props={{
            onMouseDown: (e) => {
                e.preventDefault();
                onToggle(style);
            }
        }}
    >
        <Icon name={label}/>
    </Block>
);

const STYLES = [
    {label: 'unordered-list', style: 'unordered-list-item'},
    {label: 'ordered-list', style: 'ordered-list-item'}
];

const TextListOptions = ({editorState, onToggle}) => {
    const selection = editorState.getSelection();
    const blockType = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();

    return STYLES.map(type =>
        <OptionIcon
            key={type.label}
            isActive={type.style === blockType}
            label={type.label}
            onToggle={onToggle}
            style={type.style}
        />
    )
}

export default TextListOptions;

