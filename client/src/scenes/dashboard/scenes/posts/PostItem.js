// @flow

import React from 'react';
import { Block, Col, Row } from 'jsxstyle';

import type { Post } from 'redux-local/posts/actions';

type Props = {
    post: Post,
    editPost: () => any,
    readPost: () => any,
    deletePost: () => any
};

const PostItem = ({ post, editPost, readPost, deletePost }: Props) => (
    <Row
        borderBottom={'1px solid grey'}
        //boxShadow="2px 1px 5px #888888"
        margin="6px 10px  0px 10px">
        <Row width="100%" justifyContent="space-between" alignItems="center" padding="15px 10px">
            <Col width="35%">
                <Block fontSize="32px">{ post.title }</Block>
                <Row>
                    <Block marginRight="10px">by <i>{ post.author_name }</i></Block>
                    <Block>{ post.date_created && post.date_created.toString().slice(0, 10) }</Block>
                </Row>
            </Col>

            <Col width="35%">
                <Block>Views: { post.views.count }</Block>
                <Block>Likes: { post.likes.count }</Block>
                <Block>Comments: { post.comments.count }</Block>
            </Col>

            <Row width="20%">
                <Row props={{ onClick: readPost }}>Icon read post</Row>
                <Row props={{ onClick: editPost }}>Icon edit post</Row>
                <Row props={{ onClick: deletePost }}>Icon delete post</Row>
            </Row>
        </Row>
    </Row>
);


export default PostItem;
