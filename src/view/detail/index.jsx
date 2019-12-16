/**
 * @file 详情页
 * @author haoran
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from './redux';
import './index.styl';

@connect(
  state => ({
    ...state.Detail.detailContent,
  }), {
    ...actions,
  },
)
class Detail extends Component {
  constructor(props) {
    super(props);

    Promise.all([
      this.props.getContent(),
      this.props.showSek(),
    ]).then(() => {
      this.props.setLoadState(false);
    });
  }

  onChange = (val) => {
    console.log(val);
  }

  render() {
    return (
      this.props.loading
        ? (
          <div styleName="skeleton">
            <div styleName="skeleton-head" />
            <div styleName="skeleton-body">
              <div styleName="skeleton-title" />
              <div styleName="skeleton-content" />
            </div>
          </div>
        )
        : (
          <div>
            {
              this.props.content.map(item => <div key={item.title}>{item.title}</div>)
            }
          </div>
        )
    );
  }
}

export default Detail;
