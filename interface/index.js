import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Overview from './components/Overview';
import Trainer from './components/Trainer';
import Classifier from './components/Classifier';
import Browser from './components/Browser';

import { render } from 'react-dom'
import { Router, IndexRoute, Route, Link } from 'react-router'

import {  useRouterHistory } from 'react-router'
import { createHashHistory } from 'history'


render((
  <Router history={useRouterHistory(createHashHistory)({queryKey: false})}>
    <Route path="/" component={App}>
      <IndexRoute name="overview" component={Overview} />
      <Route path="/train" name="train" component={Trainer} />
      <Route path="/classify" name="classify" component={Classifier} />
      <Route path="/browse" name="browse" component={Browser} />
    </Route>
  </Router>
), document.getElementById('root'));