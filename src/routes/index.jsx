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

const Detail = lazy(() => import(/* webpackChunkName:'detail-chunk' */'../view/detail/'));
const NoMatch = lazy(() => import(/* webpackChunkName:'404-chunk' */'../view/404/'));

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
        <Suspense
          fallback={<Loading />}
        >
          <Switch>
            <Route path="/detail" component={Detail} />
            <Route path="*" component={NoMatch} />
          </Switch>
        </Suspense>
      </Router>
    );
  }
}

export default Index;
