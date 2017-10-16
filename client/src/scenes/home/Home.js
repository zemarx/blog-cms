// @flow

import React from 'react';
import { Block } from 'jsxstyle';
import { connect } from 'react-redux';


const HomeContainer = ({ dispatch }) => (
    <Block height="90%" backgroundColor={"#dedede"}>


        <Block
            width="100%"
            backgroundColor="#dedede"
        >
            Header
        </Block>


        <Block>Main</Block>



        <Block>Footer</Block>




    </Block>
);

const mapStateToProps = () => {
    // TODO: get posts
};

export default connect()(HomeContainer);
