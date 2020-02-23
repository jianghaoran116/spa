/**
 * @file 路由入口文件
 * @author haoran
 */

import React, { Component, Suspense, lazy } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import Loading from '../view/loading';
import config from '../../config';
import AuthRoute from '../components/auth-route';

// const NoMatch = lazy(() => import(/* webpackChunkName:'404-chunk' */'../view/404'));
const Login = lazy(() => import(/* webpackChunkName:'login-chunk' */'../view/login'));
const Register = lazy(() => import(/* webpackChunkName:'register-chunk' */'../view/register'));
const Genius = lazy(() => import(/* webpackChunkName:'genius-chunk' */'../view/genius'));
const Boss = lazy(() => import(/* webpackChunkName:'boss-chunk' */'../view/boss'));
const Dashboard = lazy(() => import(/* webpackChunkName:'dashboard-chunk' */'../view/dashboard'));
const Chat = lazy(() => import(/* webpackChunkName:'chat-chunk' */'../view/chat'));

let basename = '';
if (process.env.NODE_ENV === 'production') {
  basename = config.base_name_prod;
} else {
  basename = config.base_name_dev;
}

class Index extends Component {
  render() {
    return (
      <Router
        basename={basename}
      >
        <AuthRoute />
        <Suspense
          fallback={<Loading />}
        >
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/geniusinfo" component={Genius} />
            <Route path="/bossinfo" component={Boss} />
            <Route path="/chat/:user" component={Chat} />
            <Route path="*" component={Dashboard} />
          </Switch>
        </Suspense>
      </Router>
    );
  }
}

export default Index;
