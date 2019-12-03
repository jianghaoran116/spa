/**
 * @file 404页
 * @author haoran
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
// import Index from 'components/404/index';
import noMatchImg from 'imagespath/demo.png';
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
    console.log(this.props);
    return (
      <div>
        404
        <img
          src={noMatchImg}
          alt="404"
          title="404"
        />
        <div styleName="no-match">
          404
        </div>
      </div>
    );
  }
}

export default NoMatch;
