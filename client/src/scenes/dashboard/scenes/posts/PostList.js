// @flow

import React from 'react';
import { Col, Row, Block } from 'jsxstyle';

import PostSearch from './components/PostSearch';
import PostFilter from './components/PostFilter';
import PostSort from './components/PostSort';
import PostItem from './PostItem';
import Button from 'components/Button';
import Icon from 'components/Icon';


const PostList = ({
    searchValue,
    setSearchValue,
    setFilterValue,
    filterValue,
    newPost,
    editPost,
    readPost,
    deletePost,
    updatePosts,
    isFetchingPosts,
    filteredSearchedPosts
}: any) => (
    <Block margin="15px 10px 0px 10px">
        <Col width="65%">
            <Block margin="0 0 5px 8px">
                <Button onClick={newPost}>Create Post</Button>
            </Block>

            <Col>
                <PostFilter setFilterValue={setFilterValue} filterValue={filterValue}/>

                <Row
                    margin="0 0 10px 10px"
                    height={40}
                    alignItems="center"
                >
                    <PostSearch setSearchValue={setSearchValue} searchValue={searchValue} />
                    <PostSort />
                    <Icon
                        width={28}
                        height={30}
                        backgroundRepeat="no-repeat"
                        cursor="pointer"
                        props={{ onClick: () => updatePosts()}}
                        name="refresh"
                    />
                </Row>
            </Col>
            
            { 
                isFetchingPosts ?
                    <div>Loading...</div>
                :
                    <Col
                        overflowY="auto"
                        overflowX="hidden"
                        height="62vh"
                        boxShadow="2px 1px 5px #888888"
                        margin="10px 0 0 10px">
                        {
                            filteredSearchedPosts.map(post => (
                                <PostItem
                                    editPost={() => editPost(post)}
                                    readPost={() => readPost(post)}
                                    deletePost={() => deletePost(post)}
                                    key={post._id}
                                    post={post}
                                />
                            ))
                        }
                    </Col>
            }
        </Col>
    </Block>
);

export default PostList;
