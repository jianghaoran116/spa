/**
 * @file 详情页面入口
 * @author haoran
 */

import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './redux/configureStore';
import DevTools from './containers/dev-tools';
import Index from './routes/index';

import './styles/reset.styl';
import './styles/app.styl';

const store = configureStore();
console.log(store);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Index />
        <DevTools />
      </Provider>
    );
  }
}

ReactDom.render(<App />, document.getElementById('app'));
