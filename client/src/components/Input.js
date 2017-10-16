
import React from 'react';
import { Block } from 'jsxstyle';

const TextInput = ({type, placeholder, value, onChange, ...props}) => (
    <Block
        fontSize={16}
        lineHeight="20px"
        fontWeight={400}
        color="#444"
        placeholderColor="#999"
        backgroundColor="#FFF"
        padding="4px 6px"
        marginBottom={10}
        borderRadius={3}
        borderWidth="1px"
        borderColor="#BBB"
        activeBorderColor="#999"
        borderStyle="solid"
        {...props}
        component="input"
        props={{ type, placeholder, value, onChange }}
    />
);

export {
    TextInput
}
