// @flow

import 'whatwg-fetch';

// -----------------------------------TYPES------------------------------------
export type Post = {
    _id: string,
    author_name: string,
    title: string,
    content: string,
    last_time_edited: Date | null,
    date_created: Date | null,
    likes: { count: number },
    comments: { count: number },
    views: { count: number },
    tags: Array<Object>,
    category: string,
    status: string // draft | publish | trash
};

export type ReduxState = {
    +isFetchingPosts: boolean,
    +isPostCreating: boolean,
    +isPostCreated: boolean,
    +isPostCreatingFailed: boolean,
    +postList: Array<Post>,
    +lastCreatedPost?: Post,
    +selectedPost?: Post,
    +lastTimePostsFetched: Date | null
};

export type Dispatch = (any) => any;

export type BasicRequestAction = () => { type: string };
export type BasicFailureAction = (err: string) => { type: string, err: string };
export type FetchPostsSuccessAction = (json: Object) => { type: string, postList: Array<Post>, receivedAt: Date };
export type FetchPostsAction = () => (dispatch: Dispatch) => Promise<any>;
export type CreatePostSuccessAction = (json: Object) => { type: string, post: Post };
export type CreatePostAction = (post: Post) => (dispatch: Dispatch) => Promise<any>;
export type UpdatePostSuccessAction = (json: Object) => { type: string, post: Post };
export type UpdatePostAction = (post: Post) => (dispatch: Dispatch) => Promise<any>;
export type DeletePostSuccessAction = (json: Object) => { type: string, post: Post };
export type DeletePostAction = (id: string) => (dispatch: Dispatch) => Promise<any>;


//-----------------------------------ACTIONS---------------------------------------

export const FETCH_POSTS_REQUEST: string = 'FETCH_POSTS_REQUEST';
export const FETCH_POSTS_SUCCESS: string = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_FAILURE: string = 'FETCH_POSTS_FAILURE';

export const CREATE_POST_REQUEST: string = 'CREATE_POST_REQUEST';
export const CREATE_POST_SUCCESS: string = 'CREATE_POST_SUCCESS';
export const CREATE_POST_FAILURE: string = 'CREATE_POST_FAILURE';
export const CREATE_POST_RESET_STATUS: string = 'CREATE_POST_RESET_STATUS';

export const UPDATE_POST_REQUEST: string = 'UPDATE_POST_REQUEST';
export const UPDATE_POST_SUCCESS: string = 'UPDATE_POST_SUCCESS';
export const UPDATE_POST_FAILURE: string = 'UPDATE_POST_FAILURE';

export const DELETE_POST_REQUEST: string = 'DELETE_POST_REQUEST';
export const DELETE_POST_SUCCESS: string = 'DELETE_POST_SUCCESS';
export const DELETE_POST_FAILURE: string = 'DELETE_POST_FAILURE';

export const SELECT_POST_TO_READ: string = 'SELECT_POST_TO_READ';



// --------------------------- UTILS ---------------------------------
const isResponseOk = (res) => {
    if (res.status > 200 && res.status < 300) {
        return true;
    }

    return false;
};

// Headers for requests, TODO: add more headers if necessary(eg. cors, gzip)
const HEADERS = {
    'Content-Type': 'application/json'
}

const API_URL = 'http://localhost:3000/api/private/posts';


// ----------------- FETCH POSTS ACTIONS CREATORS --------------------
const fethPostsRequest: BasicRequestAction = () => ({
    type: FETCH_POSTS_REQUEST    
});

const fetchPostsSuccess: FetchPostsSuccessAction = json => ({
    type: FETCH_POSTS_SUCCESS,
    postList: json.data, // TODO: change to json.data
    receivedAt: new Date()
});

const fetchPostsFailure: BasicFailureAction = err => ({
    type: FETCH_POSTS_FAILURE,
    err: err
});

const fetchPostsAction: FetchPostsAction = () => {
    return (dispatch: Dispatch) => {
        dispatch(fethPostsRequest());

        return fetch(API_URL)
            .then(res => res.json())
            .then(json => dispatch(fetchPostsSuccess(json)))
            .catch(err => dispatch(fetchPostsFailure(err)));
    }
};

const shouldFetchPosts = (state: ReduxState) => {
    if (state.posts.postList.length === 0) {
        return true;
    } else if (state.posts.isFetchingPosts) {
        return false;
    } else {
        return false;
    }
}

const fetchPostsIfNeededAction = () => {
    return (dispatch: Dispatch, getState) => {
        if (shouldFetchPosts(getState())) {
          return dispatch(fetchPostsAction())
        } else {
          return Promise.resolve()
        }
      }
}


// -------------------- RESET NEW POST STATUS -----------------------

const resetCreatedPostStatusAction = () => ({
    type: CREATE_POST_RESET_STATUS
})


// ----------------- CREATE POST ACTIONS CREATORS --------------------
const createPostRequest: BasicRequestAction = () => ({
    type: CREATE_POST_REQUEST,
});

const createPostSuccess: CreatePostSuccessAction = json => ({
    type: CREATE_POST_SUCCESS,
    post: json.data
});

const createPostFailure: BasicFailureAction = err => ({
    type: CREATE_POST_SUCCESS,
    err: err
});

const createPostAction: CreatePostAction = (post: Post) => {
    return (dispatch: Dispatch) => {
        dispatch(createPostRequest());

        const options = {
            method: 'POST',
            headers: HEADERS,
            body: JSON.stringify(post)
        };

        return fetch(API_URL, options)
            .then(res => res.json())
            .then(json => {
                dispatch(fetchPostsAction())
                dispatch(createPostSuccess(json))
            })
            .catch(err => dispatch(createPostFailure(err)));
    }  
};


// ----------------- UPDATE POST ACTIONS CREATORS --------------------
const updatePostRequest: BasicRequestAction = () => ({
    type: UPDATE_POST_REQUEST,
});

const updatePostSuccess: UpdatePostSuccessAction = json => ({
    type: UPDATE_POST_SUCCESS,
    post: json.data
});

const updatePostFailure: BasicFailureAction = err => ({
    type: UPDATE_POST_SUCCESS,
    err: err
});

const updatePostAction: UpdatePostAction = (post: Post) => {
    return (dispatch: Dispatch) => {
        dispatch(updatePostRequest());

        const options = {
            method: 'PUT',
            headers: HEADERS,
            body: JSON.stringify(post)
        };

        return fetch(`${API_URL}/${post._id}`, options)
            .then(res => res.json())
            .then(json => {
                dispatch(fetchPostsAction())                
                dispatch(updatePostSuccess(json))
            })
            .catch(err => dispatch(updatePostFailure(err)));                        
    }  
};


// ----------------- DELETE POST ACTIONS CREATORS --------------------
const deletePostRequest: BasicRequestAction = () => ({
    type: DELETE_POST_REQUEST,
});

const deletePostSuccess: DeletePostSuccessAction = json => ({
    type: DELETE_POST_SUCCESS,
    post: json.data
});

const deletePostFailure: BasicFailureAction = err => ({
    type: DELETE_POST_SUCCESS,
    err: err
});

const deletePostAction: DeletePostAction = (id: string) => {
    return (dispatch: Dispatch) => {
        dispatch(deletePostRequest());

        const options = {
            method: 'DELETE',
            // headers: HEADERS,
        };

        return fetch(`${API_URL}/${id}`, options)
            .then(res => res.json())
            .then(json => dispatch(deletePostSuccess(json)))
            .catch(err => dispatch(deletePostFailure(err)));                        
    }  
};


export {
    fetchPostsAction,
    fetchPostsIfNeededAction,
    createPostAction,
    updatePostAction,
    deletePostAction,
    resetCreatedPostStatusAction
};
