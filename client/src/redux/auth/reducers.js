// @flow

import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_SUCCESS
} from './actions';

import type { ReduxState } from './actions';

const initialState = {
    isLoginRequest: false,
    isLoggedIn: false,
    isLoginError: false
}

console.log('reducers');

const auth = (state: ReduxState = initialState, action: any): ReduxState => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                isLoginRequest: true
            };
        case LOGIN_SUCCESS:
            return {
                ...state, 
                isLoggedIn: true,
                isLoginRequest: false
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                isLoginError: true,
                isLoggedIn: false,
                isLoginRequest: false
            };
        case LOGOUT_SUCCESS:
            return {
                ...state,
                isLoginError: false,                
                isLoggedIn: false,
                isLoginRequest: false                
            };
        default:
            return state
    }
}

export default auth;
