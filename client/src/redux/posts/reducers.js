// @flow

import {
    FETCH_POSTS_REQUEST,
    FETCH_POSTS_SUCCESS,
    FETCH_POSTS_FAILURE,

    CREATE_POST_REQUEST,
    CREATE_POST_SUCCESS,
    CREATE_POST_FAILURE,

    UPDATE_POST_REQUEST,
    UPDATE_POST_SUCCESS,
    UPDATE_POST_FAILURE,

    DELETE_POST_REQUEST,
    DELETE_POST_SUCCESS,
    DELETE_POST_FAILURE,

    CREATE_POST_RESET_STATUS

} from './actions';

import type { ReduxState } from './actions';

// default post
const post = {
    _id: '',
    author_name: '',
    title: '',
    content: '',
    last_time_edited: null,
    date_created: null,
    tags: [],
    category: '',
    status: 'publish',
    likes: { count: 0 },
    comments: { count: 0 },
    views: { count: 0 }
}

const initialState = {
    isFetchingPosts: false,
    isPostCreating: false,
    isPostCreated: false,
    isPostCreatingFailed: false,
    postList: [],
    lastCreatedPost: post,
    selectedPost: post,
    lastTimePostsFetched: null
};


const posts = (state: ReduxState = initialState, action: any): ReduxState => {
    switch (action.type) {
        case FETCH_POSTS_REQUEST:
            return{
                ...state,
                isFetchingPosts: true
            };
        case FETCH_POSTS_SUCCESS:
            return {
                ...state, 
                isFetchingPosts: false,
                postList: action.postList,
                lastUpdated: action.receivedAt
            };
        case FETCH_POSTS_FAILURE:
            return {
                ...state,
                isFetchingPosts: false,
                // TODO: some error
            };
        case CREATE_POST_REQUEST:
            return {
                ...state,
                isPostCreating: true,
                isPostCreated: false                
            };
        case CREATE_POST_SUCCESS:
            return {
                ...state,
                isPostCreating: false,
                post: action.post,
                isPostCreated: true
            };
        case CREATE_POST_FAILURE:
            return {
                ...state,
                isPostCreating: false,
                isPostCreated: false,
                isPostCreatingFailed: true            
            };

        case CREATE_POST_RESET_STATUS:
            return {
                ...state,
                isPostCreating: false,
                isPostCreated: false
            }
        default:
            return state
    }
}

export default posts;


















// ------------ FUTURE STATE --------------

// add 'commentsEnabled' property to post

// const initState = {
//     data: {
//         categories: [],
//         tags: [],
//         posts: [],
//         galleries: {
//             animals: [],
//             people: []
//         }
//     },

//     appearance: {
//         selected_theme: 'default_theme',

//         themes: {
//             default_theme: {
//                 primary_color: '#acb1b1',
//                 secondary_color: '#ffffff',
//                 body_color: '#acb1b1',
//                 nav_color: '#acb1b1',
//                 home_layout: ''
//             },
//             theme1: {},
//             theme2: {},
//             theme3: {}
//         }
//     },

//     settings: {
//         subscription: {
//             emails: []
//         }
//     }
// };
