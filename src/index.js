
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, useRouterHistory } from 'react-router';
import { createHashHistory } from 'history';
import App from'./pages/app';

import Detail from './pages/details';
import Sample from './pages/sample';
import list from './pages/List';

const appHistory = useRouterHistory(createHashHistory)({ queryKey: false })

ReactDOM.render(
    <Router history={appHistory} onUpdate={() => window.scrollTo(0, 0)}>
        <Route path="/" component={ Detail } />
        <Route path="/detail" component={ Detail } />
        <Route path="/list" component={ list } />
    </Router>,
    document.getElementById('app')
);