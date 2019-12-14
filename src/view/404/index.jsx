/**
 * @file 404页
 * @author haoran
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
// import Index from 'components/404/index';
import { actions } from './redux';
import './index.styl';

@connect(
  state => ({
    loading: state.NoMatch.list.loading,
  }), {
    ...actions,
  },
)
class NoMatch extends Component {
  render() {
    return (
      <div styleName="no-match">
        <div styleName="no-match-content">
          404page
        </div>
      </div>
    );
  }
}

export default NoMatch;
