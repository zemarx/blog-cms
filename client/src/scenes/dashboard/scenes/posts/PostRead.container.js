// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Block, Col } from 'jsxstyle';

import { fetchPostsIfNeededAction } from 'redux-local/posts/actions';
import Button from 'components/Button';

import type { Match, RouterHistory } from 'react-router-dom';
import type { Post, Dispatch } from 'redux-local/posts/actions';
import type { ReduxState } from 'redux-local';


type State = {
    post: Post | Object
};

type Props = {
    postList: Array<any>,
    match: Match,
    history: RouterHistory,
    dispatch: Dispatch
};

class PostRead extends Component<Props, State> {
    constructor(props) {
        super(props);

        this.state = {
            post: {}
        }
    }

    componentWillMount () {
        this.props.dispatch(fetchPostsIfNeededAction());        
    }

    render () {
        const post = this.props.postList.find(post => post._id === this.props.match.params.id);
        let content = null;
        
        if (post) {
            content = (
                <Col flex={'1 1 auto'} alignItems="center">
                    <Block
                        width="100%"
                        margin={'15px 0 15px 40px'}>
                        <Button onClick={() => { this.props.history.push('/dashboard/posts')}}>Back</Button>
                        <Button onClick={() => { this.props.history.push(`${post._id}/edit`)}}>Edit post</Button>
                        <Button onClick={() => console.log('delete post')}>Delete post</Button>
                    </Block>

                    <Block
                        width="60%"
                        //margin={'15px auto 15px auto'}
                        >
                        <Block>{ post.title }</Block>
                    </Block>
                    <Block
                        width="60%"
                        //margin={'0 0 10px 150px'}
                        >
                        <Block>by <i>{ post.author_name }</i></Block>
                    </Block>
                    <Block
                        width="60%"
                        //margin={'0 0 30px 150px'}
                        >

                        <div dangerouslySetInnerHTML={{ __html: post.content }} />

                        {/* <Block width="60%">{ post.content }</Block> */}
                    </Block>
                </Col>
            );
        } else {
            content = (
                <Col flex={'1 1 auto'} alignItems="center" justifyContent="center">
                    <Block>
                        Loading...
                    </Block>
                </Col>
            );
        }

        return content;
    }
}

const mapStateToProps = (state: ReduxState) => {
    const { postList } = state.posts;

    return { postList };
};

export default withRouter(connect(mapStateToProps)(PostRead));
