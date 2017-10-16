// @flow

import React from 'react';
import { Route, Link, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Block, Row } from 'jsxstyle';
import HomeContainer from './scenes/home/Home';
import AboutContainer from './scenes/about/About';
import DashboardContainer from './scenes/dashboard/Dashboard';
import LoginContainer from './scenes/auth/LoginContainer';


const PrivateRoute = ({ component: Component, isLoggedIn, ...rest }) => (
    <Route
        {...rest}
        render={props => {
            if (isLoggedIn) {
                return <Component {...props}/>
            } else {
                return <Redirect to={'/login'}/>
            }
        }}
    />
);

const NavBar = () => (
    <Row width="100%" height="10%" alignItems="center" backgroundColor="cyan">
        <Block marginLeft="20px"><Link to="/">Home</Link></Block>
        <Block marginLeft="20px"><Link to="/about">About</Link></Block>
    </Row>
);

const App = ({ location, isLoggedIn }) => {
    let isDashboardView = location && location.pathname.startsWith('/dashboard');
    let isLoginView = location && location.pathname.startsWith('/login');

    return (
        <Block>
            { (isDashboardView || isLoginView) ? null : <NavBar /> }

            <Route exact path="/" component={HomeContainer} />
            <Route path="/about" component={AboutContainer} />
            <Route path="/login" component={LoginContainer} />
            <PrivateRoute path="/dashboard" component={DashboardContainer} isLoggedIn={isLoggedIn} />
        </Block>
    )
};

const mapStateToProps = (state: ReduxState) => {
    const { isLoggedIn } = state.auth;
    return { isLoggedIn }
};


export default withRouter(connect(mapStateToProps)(App));
