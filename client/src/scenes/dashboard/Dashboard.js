// @flow

import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Switch } from 'react-router-dom';

import { Route, NavLink } from 'react-router-dom';
import { Block, Col, Row } from 'jsxstyle';

import PostCreate from './scenes/posts/PostCreate.container';
import PostEdit from './scenes/posts/PostEdit.container';
import PostRead from './scenes/posts/PostRead.container';
import PostList from './scenes/posts/PostList.container';
import Galleries from './scenes/galleries/galleries';

import type { Match } from 'react-router-dom';

type Props = {
    match: Match
};

const DashboardContainer = ({ match }: Props) => (
    <Row height="100%" width="100%">
        {/* Menu*/}
        <Col width="200px" alignItems="center" backgroundColor={'#dadada'}>
            <Block margin={'30px 0 50px 0'}>
                Dashboard
            </Block>

            <NavLink style={{ marginTop: 6 }} to={`${match.url}/posts`}>Posts</NavLink>
            <NavLink style={{ marginTop: 6 }} to={`${match.url}/galleries`}>Galleries</NavLink>
            <NavLink style={{ marginTop: 6 }} to={`${match.url}/settings`}>Settings</NavLink>
        </Col>

        <Col width="100%" height="100%">
            <Row
                justifyContent="flex-end"
                alignItems="center"
                height={'8%'}
                width={'100%'}
                backgroundColor={'#bbb'}>

                <Block>
                    Username
                </Block>

                <Block
                    width={50}
                    height={50}
                    margin="0 20px 0 20px"
                    border={'2px solid #dedede'}
                    borderRadius="50%"
                    background={'url(https://image.freepik.com/free-icon/male-user-shadow_318-34042.jpg)'} // TODO: dynamic image which user can choose
                    backgroundRepeat="no-repeat"
                    backgroundSize="contain"
                />
            </Row>

            <Switch>
                {/* Posts routes */}
                <Route path={`${match.url}/posts/:id/edit`} component={PostEdit}/>
                <Route path={`${match.url}/posts/new`} component={PostCreate}/>
                <Route path={`${match.url}/posts/:id`} component={PostRead}/>
                <Route path={`${match.url}/posts`} component={PostList}/>

                {/* Galleries routes */}
                <Route path={`${match.url}/galleries`} component={Galleries}/>

                {/* Settings routes */}
            </Switch>
        </Col>
    </Row>
)

export default withRouter(connect()(DashboardContainer));
