import React from 'react';
import ReactDOM from 'react-dom';
import thunkMiddleware from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider as StoreProvider } from "react-redux";
import { AppContainer as HotLoaderWrapper } from 'react-hot-loader';

import reducers from './redux';
import App from './App';

const store = createStore(
    reducers,
    compose(
        applyMiddleware(thunkMiddleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

const render = (Component) => {
    ReactDOM.render(
        <HotLoaderWrapper>
            <StoreProvider store={store}>
                <BrowserRouter>
                    <Component/>
                </BrowserRouter>
            </StoreProvider>
        </HotLoaderWrapper>,
        document.getElementById('root')
    )
};

render(App);

if (module.hot) {
    module.hot.accept('./App', () => render(App));
}
