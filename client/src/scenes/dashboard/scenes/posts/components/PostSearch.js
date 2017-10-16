// @flow

import React from 'react';
import { Row, Block } from 'jsxstyle';

import Icon from 'components/Icon';

type Props = {
    setSearchValue: (any) => any,
    searchValue: string
};

const PostSearch = ({ setSearchValue, searchValue, ...props }: Props) => (
    <Row
        width={240}
        alignItems="center"
        border="1px solid #dedede"
        borderRadius={30}
        padding="2px 4px 2px 10px"
    >
        <Icon name="zoom" />

        <Block
            width={200}
            fontSize={16}
            lineHeight="20px"
            fontWeight={400}
            color="#444"
            placeholderColor="#999"
            backgroundColor="#FFF"
            padding="4px 0"
            border="none"
            outline="none"
            {...props}
            component="input"
            props={{ type: 'text', placeholder: 'Search for posts...', value: searchValue, onChange: setSearchValue }}
        />

        {
            searchValue.length !== 0 && (
                <Icon
                    name="cancel"
                    cursor="pointer"
                    props={{ onClick: () => setSearchValue(null)}}
                />
            )
        }
    </Row>
    
);

export default PostSearch;
