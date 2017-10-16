// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Block, Row, Col } from 'jsxstyle';
import { EditorState } from 'draft-js';

import Button from 'components/Button';
import Editor from 'components/editor/Editor';
import { createPostAction, resetCreatedPostStatusAction } from 'redux-local/posts/actions';

import type { ReduxState } from 'redux-local';
import type { Dispatch } from 'redux-local/posts/actions';
import type { RouterHistory } from 'react-router-dom';


type State = {
    title: string,
    authorName: string,
    editorState: string,
    category: string,
    tags: Array<any>
};

type Props = {
    dispatch: Dispatch,
    history: RouterHistory,
    isPostCreating: boolean,
    isPostCreated: boolean,
    isPostCreatingFailed: boolean
};

class PostCreate extends Component<Props, State> {
    constructor(props) {
        super(props);

        this.state = {
            authorName: '',
            title: '',
            category: '',
            editorState: EditorState.createEmpty(),
            tags: []            
        };
    }

    componentWillMount () {
        this.props.dispatch(resetCreatedPostStatusAction())
    }

    render () {
        const { isPostCreating, isPostCreated, isPostCreatingFailed } = this.props;

        if (isPostCreating) {
            return (
                <Col flex={'1 1 auto'} alignItems="center" justifyContent="center">
                    Saving post...
                    <Block
                        width={100}
                        height={100}
                        border={'1px solid #ffffff'}
                        borderRadius="50%"
                        >
                    </Block>
                </Col>
            )
        } else if (isPostCreated) {
            return (
                <Col flex={'1 1 auto'} alignItems="center" justifyContent="center">
                    Post is created successfully!
                    <Col width="90%" margin="10px 0 0 10px" justifyContent="center">
                        <Button onClick={this.resetPostCreate}>Create new</Button>
                        <Button onClick={this.cancelPostCreate}>Back to posts</Button>
                    </Col>
                </Col>
            )
        } else {
            return (
                <Col flex={'1 1 auto'} alignItems="center">
                    <h1>Create new post</h1>

                    { isPostCreatingFailed && <Block>Post creation failed :(</Block> }
    
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
                        <Editor
                            onChange={this.onEditorChange}
                            editorState={this.state.editorState}
                        />

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
                        <Button onClick={() => this.handlePostCreate('publish')}>Save and Publish</Button>
                        <Button onClick={() => this.handlePostCreate('draft')}>Save as draft</Button>
                        <Button onClick={this.cancelPostCreate}>Cancel</Button>
                    </Row>
                </Col>
            )
        }
    }

    onEditorChange = (editorState) => {
        this.setState({ editorState: editorState })
    }

    handlePostCreate = (status: string) => {
        this.props.dispatch(createPostAction({
            _id: '',
            author_name: this.state.authorName,
            title: this.state.title,
            content: this.state.editorState,
            tags: this.state.tags,
            category: this.state.category,
            date_created: new Date(),
            status: status,
            last_time_edited: null,
            likes: { count: 0 },
            comments: { count: 0},
            views: { count: 0 }
        }));
    }

    resetPostCreate = () => {
        this.setState({
            authorName: '',
            title: '',
            editorState: '',
            category: '',
            tags: []
        })

        this.props.dispatch(resetCreatedPostStatusAction())
    }

    cancelPostCreate = () => {
        this.props.history.push('/dashboard/posts')        
        this.props.dispatch(resetCreatedPostStatusAction());
    }
}

const mapStateToProps = (state: ReduxState) => {
    const { isPostCreating, isPostCreated, isPostCreatingFailed } = state.posts;

    return {
        isPostCreating,
        isPostCreated,
        isPostCreatingFailed
    }
};

export default withRouter(connect(mapStateToProps)(PostCreate));
