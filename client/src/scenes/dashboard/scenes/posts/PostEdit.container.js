// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Block, Col, Row } from 'jsxstyle';

import { updatePostAction, fetchPostsIfNeededAction } from 'redux-local/posts/actions';
import Button from 'components/Button';

import type { Post } from 'redux-local/posts/actions';
import type { Match } from 'react-router-dom';


type State = {
    postId: string,
    title: string,
    authorName: string,
    editorState: string,
    category: string,
    status: string,    
    tags: Array<any>,
    post: ?Object // Post
};

type Props = {
    dispatch: Dispatch,
    history: Object,
    match: Match,
    postList: Array<Post> // TODO: properly type
};

class PostEdit extends Component<Props, State> {
    setPostData: (any) => any;
    handlePostUpdate: () => any;
    cancelPostUpdate: () => any;
    onEditorChange: (any) => any;
    
    constructor(props) {
        super(props);

        this.state = {
            postId: '',
            authorName: '',
            title: '',
            category: '',
            status: '',
            tags: [],
            editorState: '',
            post: null
        };
    }

    componentWillMount () {
        this.props.dispatch(fetchPostsIfNeededAction());        
        this.setPostData(this.props);
    }

    componentWillReceiveProps (nextProps) {
        this.setPostData(nextProps);
    }

    render () {
        if (!this.state.post) {
            return (
                <Col flex={'1 1 auto'} alignItems="center" justifyContent="center">
                    <Block>Loading...</Block>
                </Col>
            )
        }

        return (
            <Col flex={'1 1 auto'} alignItems="center">
                <h1>Edit post post</h1>

                <Block>STATUS: {this.state.status}</Block>

                <Col width="90%" margin="10px 0 0 10px">
                    <Block
                        component="input"
                        props={{
                            type: 'text',
                            value: this.state.authorName,
                            onChange: event => this.setState({ authorName: event.target.value }),
                            placeholder: 'Author'
                        }}
                    />
                    <Block
                        component="input"
                        props={{
                            type: 'text',
                            value: this.state.title,
                            onChange: event => this.setState({ title: event.target.value }),
                            placeholder: 'Title'
                        }}
                    />
                </Col>

                <Block width="90%" margin="10px 0 0 10px">
                </Block>

                <Col width="90%" margin="10px 0 0 10px" border={'1px dashed #dedede'}>
                    <Block margin="10px 0 0 10px" height="50px">
                        Choose category
                    </Block>
                    <Block margin="10px 0 0 10px" height="50px">
                        Tags
                    </Block>
                </Col>

                <Row width="90%" margin="10px 0 0 10px">
                    <Button onClick={this.handlePostUpdate}>Save</Button>
                    <Button onClick={this.cancelPostUpdate}>Cancel</Button>
                </Row>
            </Col>
        )
    }

    setPostData = (props) => {
        const post = props.postList.find(post => post._id === props.match.params.id);
        
        if (post) {
            this.setState({
                postId: post._id,
                authorName: post.author_name,
                title: post.title,
                category: post.category,
                tags: post.tags,
                status: post.status,
                editorState: post.content,
                post: post
            })
        }
    }

    onEditorChange = (e) => {
        this.setState({
            editorState: e.target.getContent()
        })
    }

    handlePostUpdate = () => {
        this.props.history.push('posts');
        this.props.dispatch(updatePostAction({
            _id: this.state.postId,
            author_name: this.state.authorName,
            title: this.state.title,
            content: this.state.editorState,
            status: 'publish',
            tags: this.state.tags,
            category: this.state.category,
            date_created: new Date(),
            last_time_edited: null,
            likes: { count: 0 },
            comments: { count: 0},
            views: { count: 0 }
        }));
    }

    cancelPostUpdate = () => {
        // TODO: implement 
        this.props.history.push('/dashboard/posts');
    }
}


const mapStateToProps = (state) => {
    const { postList } = state.posts;

    return { postList };
};

export default withRouter(connect(mapStateToProps)(PostEdit));
