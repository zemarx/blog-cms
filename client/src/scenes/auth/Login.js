// @flow

import React from 'react';
import { Block, Col } from 'jsxstyle';

import Button from 'components/Button';


const Input = ({ value, placeholder, onInputChange }) => (
    <Block
        component="input"
        outline="none"
        border="none"
        margin={'15px 0 10px 0'}
        height={30}
        fontSize={17}
        props={{
            type: 'text',
            value: value,
            onChange: onInputChange,
            placeholder: placeholder
        }}
    />
);

const LoginLoader = () => (
    <Block>
        Logging in
    </Block>
);

const Login = ({ onEmailChange, onPasswordChange, onLoginClick, isLoginRequest }) => (
    <Col
        width={'100%'}
        height={'100%'}
        backgroundColor={'#c1c2c3'}
        alignItems="center"
        justifyContent="center"
    >
        <Col
            width={500}
            height={500}
            alignItems="center"
            justifyContent="center"
            boxShadow={'2px 2px 5px #000111'}
        >
            <Input placeholder={'Email'} onInputChange={onEmailChange} />
            <Input placeholder={'Password'} onInputChange={onPasswordChange} />
            
            { isLoginRequest ? <LoginLoader /> : <Button onClick={onLoginClick}>Login</Button> }
        </Col>
    </Col>
)

export default Login;
