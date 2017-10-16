// @flow

import { combineReducers } from 'redux';
import posts from './posts/reducers';
import auth from './auth/reducers';

import type { ReduxState as PostsReduxState } from './posts/actions';
import type { ReduxState as AuthReduxState } from './auth/actions';

export type ReduxState = {
    posts: PostsReduxState,
    auth: AuthReduxState
};

const combinedReducers = combineReducers({
    posts,
    auth
});

export default combinedReducers;
