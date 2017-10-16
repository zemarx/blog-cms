// @flow

import React from 'react';
import { connect } from 'react-redux';
import { Block } from 'jsxstyle';


const AboutContainer = ({ todos }) => (
    <Block height="90%" backgroundColor="grey">
        TODOS:
    </Block>
);

const mapStateToProps = (state) => ({
    todos: state.todos
});

export default connect(mapStateToProps)(AboutContainer);
