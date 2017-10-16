// @flow

import React from 'react';
import { Row, Block } from 'jsxstyle';


type FilterProps = {
    filterValueName: string,
    name: string,
    onClick: () => any
};

const Filter = ({ filterValueName, name, onClick, ...props }: FilterProps) => (
    <Block
        backgroundColor={filterValueName === name ? '#5ebaba' : 'transparent'}
        border={'1px solid rgb(94, 186, 186)'}
        borderRadius={30}
        color={'#564c4c'}
        padding={'3px 8px'}
        cursor="pointer"
        margin="15px 0 15px 10px"
        textTransform="capitalize"
        fontSize="17px"
        {...props}
        props={{ onClick: onClick }}>
        { name }
    </Block>
);

type PostFiltersProps = {
    setFilterValue: string => any,
    filterValue: string
};

const PostFilters = ({ setFilterValue, filterValue }: PostFiltersProps) => (
    <Row alignItems="center" justifyContent="flex-start" backgroundColor="#ffffff">
        <Filter filterValueName={filterValue} name="all" onClick={() => setFilterValue('all')}/>
        <Filter filterValueName={filterValue} name="published" onClick={() => setFilterValue('published')}/>
        <Filter filterValueName={filterValue} name="drafts" onClick={() => setFilterValue('drafts')}/>
        <Filter filterValueName={filterValue} name="trash" onClick={() => setFilterValue('trash')}/>
    </Row>
);

export default PostFilters;
