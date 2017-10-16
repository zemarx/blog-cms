// @flow

import React from 'react';
import { Row } from 'jsxstyle';
import Icon from 'components/Icon';

export const themeLight = {
    background: {
        primaryColor: '#ffffff',
        secondaryColor: '#c9c9c9',
        iconColor: '#0bc6c6'
    },
    text: {
        primary: 'rgba(0, 0, 0, 0.87)',
        secondary: 'rgba(0, 0, 0, 0.54)',
        disabled: 'rgba(0, 0, 0, 0.38)',
        hint: 'rgba(0, 0, 0, 0.38)',
        icon: 'rgba(0, 0, 0, 0.38)'
    },
    input: {
        bottomLine: 'rgba(0, 0, 0, 0.42)',
        helperText: 'rgba(0, 0, 0, 0.54)',
        labelText: 'rgba(0, 0, 0, 0.54)',
        inputText: 'rgba(0, 0, 0, 0.87)',
        disabled: 'rgba(0, 0, 0, 0.42)',
    }
};

const Theme = {
    primaryColor: '#ffffff',
    secondaryColor: '#c9c9c9',

    primaryTextColor: '#000000',
    secondaryTextColor: '#ffffff',

    iconColor: '#0bc6c6'
};


type PropsButton = {
    onClick: () => void,
    icon?: string,
    children: any
};

const Button = ({ onClick, icon, children, ...props }: PropsButton) => (
    <Row
        alignItems="center"    
        fontFamily="inherit"
        fontSize="12px"
        margin="3px 3px"
        padding="8px 14px"
        textTransform="uppercase"
        cursor="pointer"
        fontWeight={600}
        border="none"
        borderRadius={15}
        color={Theme.primaryTextColor}
        background={Theme.secondaryColor}
        {...props}
        component="button"
        props={{ onClick: onClick }}
    >
        { icon ? <Icon name={icon}/> : null }
        { children }
    </Row>
);

export default Button;
