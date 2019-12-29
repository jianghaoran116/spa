/**
 * @file 404页
 * @author haoran
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
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
          404-page
        </div>
        <div styleName="foot">
          <a
            target="_blank"
            href="http://beian.miit.gov.cn"
          >
            京ICP备19003478号-1
          </a>
        </div>
      </div>
    );
  }
}

export default NoMatch;
