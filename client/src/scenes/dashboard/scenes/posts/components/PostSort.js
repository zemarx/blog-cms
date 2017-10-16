// @flow

import React from 'react';
import { Block, Inline } from 'jsxstyle';

const PostSort = () => (
    <Block
        margin="0 10px 0 10px"
        height={28}
        borderRadius={30}
        border="1px solid #dedede"
        padding="2px 7px 2px 7px"
    >
        <Inline marginRight="4px" fontSize="17px">Sort by ▽</Inline>
        {/*<select value={sortByValue} onChange={sortBy}>*/}
            {/*<option value="date">Date</option>*/}
            {/*<option value="lime">Num of comments</option>*/}
            {/*<option value="lime">Num of views</option>*/}
            {/*<option value="lime">Num of likes</option>*/}
        {/*</select>*/}
    </Block>
);

export default PostSort;
