// @flow

// -----------------------------------TYPES--------------------------------------

export type ReduxState = {
    +isLoginRequest: boolean,
    +isLoggedIn: boolean,
    +isLoginError: boolean
};

//-----------------------------------ACTIONS---------------------------------------

export const LOGIN_REQUEST: string = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS: string = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE: string = 'LOGIN_FAILURE';
export const LOGOUT_SUCCESS: string = 'LOGOUT_SUCCESS';

const API_URL = 'http://localhost:3000/api/login';

const loginRequest = () => ({
    type: LOGIN_REQUEST
});

const loginSuccess = (token) => ({
    type: LOGIN_SUCCESS,
    id_token: token
});

const loginFailure = (err) => ({
    type: LOGIN_FAILURE,
    message: err
});

const loginAction = (username: string, password: string) => {
    let options = {
        method: 'POST',
        headers: { 'Content-Type':'application/x-www-form-urlencoded' },
        body: `username=${username}&password=${password}`
      }

    return (dispatch: Dispatch) => {
        dispatch(loginRequest());
        
        return fetch(API_URL, options)
            .then(res => res.json())
            .then(json => dispatch(loginSuccess(json)))
            .catch(err => dispatch(loginFailure(err)));                        
    }  
}


export {
    loginRequest,
    loginSuccess,
    loginFailure,
    loginAction
}
