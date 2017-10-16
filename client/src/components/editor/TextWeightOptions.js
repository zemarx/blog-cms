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
    { label: 'bold', style: 'BOLD' },
    { label: 'italic', style: 'ITALIC' },
    { label: 'underline', style: 'UNDERLINE' }
];

const TextWeightOptions = ({editorState, onToggle}) => {
    const currentStyle = editorState.getCurrentInlineStyle();

    return STYLES.map(type =>
        <OptionIcon
            key={type.label}
            isActive={currentStyle.has(type.style)}
            label={type.label}
            onToggle={onToggle}
            style={type.style}
        />
    )
}

export default TextWeightOptions;
