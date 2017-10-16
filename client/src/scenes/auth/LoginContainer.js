// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';

import Login from './Login';
import { loginAction } from '../../redux/auth/actions';

type Props = {
    dispatch: any,
    isLoginRequest: boolean,
    isLoggedIn: boolean
};

type State = {
    email: string,
    password: string
};

class LoginContainer extends Component<Props, State> {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }
    }

    render () {
        const { isLoginRequest, isLoggedIn } = this.props;

        if (isLoggedIn) {
            return (
                <Redirect to={'/dashboard/posts'}/>
            )
        } else {
            return (
                <Login
                    onEmailChange={this.onEmailChange}
                    onPasswordChange={this.onPasswordChange}
                    onLoginClick={this.onLoginClick}
                    isLoginRequest={isLoginRequest}
                />
            )
        }
    }

    onEmailChange = (event) => {
        this.setState({ email: event.target.value })
    }

    onPasswordChange = (event) => {
        this.setState({ password: event.target.value })
    }

    onLoginClick = () => {
        this.props.dispatch(loginAction(this.state.email, this.state.password))
    }
}

const mapStateToProps = (state: ReduxState) => {
    const { isLoginRequest, isLoggedIn, isLoginError } = state.auth;

    return {
        isLoginRequest,
        isLoggedIn,
        isLoginError
    }
};

export default withRouter(connect(mapStateToProps)(LoginContainer));
