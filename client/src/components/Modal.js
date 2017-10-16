// @flow

import React from 'react';
import { Block } from 'jsxstyle';


const Modal = ({ children }) => (
    <Block
        position="absolute"
        top="50%"
        left="50%"
        zIndex="9999"
        transform="translate(-50%, -50%)"
        background="#dadada"

        height="300px"
        width="300px"
    >
        { children }
    </Block>
);

export default Modal;
