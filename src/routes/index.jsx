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
import Loading from 'view/loading/';

const Detail = lazy(() => import(/* webpackChunkName:'detail-chunk' */'view/detail/'));
const Spa = lazy(() => import(/* webpackChunkName:'spa-chunk' */'view/spa/'));
const NoMatch = lazy(() => import(/* webpackChunkName:'404-chunk' */'view/404/'));

class Index extends Component {
  render() {
    return (
      <Router>
        <Suspense
          fallback={<Loading />}
        >
          <Switch>
            <Route path="/detail" component={Detail} />
            <Route path="/spa" component={Spa} />
            <Route path="*" component={NoMatch} />
          </Switch>
        </Suspense>
      </Router>
    );
  }
}

export default Index;
