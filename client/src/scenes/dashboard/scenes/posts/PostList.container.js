// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Col, Block } from 'jsxstyle';

import PostList from './PostList';
import { fetchPostsAction, fetchPostsIfNeededAction, deletePostAction } from 'redux-local/posts/actions';

import type { RouterHistory } from 'react-router-dom';
import type { Dispatch, Post } from 'redux-local/posts/actions';
import type { ReduxState } from 'redux-local';


const postSearchFilter = (post: Post, filterValue, searchValue) => {
    let filterCheck = false;
    let searchCheck = false;

    // check filter value
    if (filterValue === 'all' || filterValue === post.status) {
        filterCheck = true;
    }

    // check search value
    if (searchValue === '') {
        searchCheck = true;
    } else if (
        post.title.toLowerCase().indexOf(searchValue) !== -1 ||
        post.content.toLowerCase().indexOf(searchValue) !== -1 ||
        post.author_name.toLowerCase().indexOf(searchValue) !== -1
    ) {
        searchCheck = true;
    } else {
        searchCheck = false;
    }

    return filterCheck && searchCheck;
};


type State = {
    searchValue: string,
    filterValue: string,
    allFilters: Array<string>,
    filteredSearchedPosts: Array<Post>
};

type Props = {
    dispatch: Dispatch => any,
    history: RouterHistory,
    postList: Array<Post>,
    isFetchingPosts: boolean
};

class PostsContainer extends Component<Props, State> {
    setSearchValue: (any) => any;
    setFilterValue: (any) => any;
    applySearchFilter: (any) => any;
    deletePost: (id: string) => void;

    constructor(props) {
        super(props);

        this.state = {
            searchValue: '',
            filterValue: 'all',
            allFilters: ['all', 'published', 'drafts', 'trash'],
            filteredSearchedPosts: []
        };
    }

    componentDidMount () {
        if (this.props.postList) {
            this.setState({filteredSearchedPosts: this.props.postList});
        }

        this.props.dispatch(fetchPostsIfNeededAction());
    }

    componentWillReceiveProps (nextProps) {
        this.setState({filteredSearchedPosts: nextProps.postList});
    }

    render () {
        return (
            <PostList
                newPost={() => this.props.history.push('posts/new')}
                setSearchValue={this.setSearchValue}
                searchValue={this.state.searchValue}
                setFilterValue={this.setFilterValue}
                filterValue={this.state.filterValue}
                updatePosts={() => this.props.dispatch(fetchPostsAction())}
                isFetchingPosts={this.props.isFetchingPosts}
                filteredSearchedPosts={this.state.filteredSearchedPosts}
                editPost={post => this.props.history.push(`posts/${post._id}/edit`)}
                readPost={post => this.props.history.push(`posts/${post._id}`)}
                deletePost={post => this.deletePost(post._id)}
            />
        )
    }

    setSearchValue = (event: SyntheticInputEvent<any>) => {
        let value = event ? (event.target.value || '') : '';
        if (value.trim() !== '') value = value.trim();

        this.setState({searchValue: value});
        this.applySearchFilter(value, this.state.filterValue);
    }

    setFilterValue = (filterValue: string) => {
        this.setState({filterValue: filterValue});
        this.applySearchFilter(this.state.searchValue, filterValue);
    }

    applySearchFilter = (searchValue, filterValue) => {
        this.setState({
            filteredSearchedPosts: this.props.postList.filter((post: Post) => postSearchFilter(post, filterValue, searchValue))
        });
    }

    deletePost = (id: string) => {
        const deleteConfirmed = confirm('Are you sure you want to delete this post');

        if (deleteConfirmed) {
            this.props.dispatch(deletePostAction(id));
        }
    }
}

const mapStateToProps = (state: ReduxState) => {
    const { isFetchingPosts, lastTimePostsFetched, postList } = state.posts;

    return {
        postList,
        isFetchingPosts,
        lastTimePostsFetched
    }
};


export default withRouter(connect(mapStateToProps)(PostsContainer));
