import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { Provider } from 'react-redux';
import { store } from './store/store';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory'

const history = createBrowserHistory();

ReactDOM.render(<Provider store={store}>
    <BrowserRouter>
        <Switch>
            <Route path="/" component={App} />
        </Switch>
    </BrowserRouter>
</Provider>, document.getElementById('root'));


