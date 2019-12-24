/**
 * @file voucher骨架屏
 * @author haoran
 */

import React, { Component } from 'react';
import './index.styl';

class DetailSkeleton extends Component {
  render() {
    return (
      <div styleName="voucher-skeleton">
        <div styleName="header-wrap">
          <div styleName="left">
            <div styleName="time">
              <div styleName="skeleton-content" />
            </div>
            <div styleName="title">
              <div styleName="skeleton-content" />
            </div>
          </div>
          <div styleName="right">
            <div styleName="skeleton-content" />
          </div>
        </div>

        <div styleName="content-wrap">
          <div styleName="content-list">
            <div styleName="top">
              <div styleName="type">
                <div styleName="skeleton-content" />
              </div>
              <div styleName="content">
                <div styleName="title"><div styleName="skeleton-content" /></div>
                <div styleName="dec"><div styleName="skeleton-content" /></div>
              </div>
              <div styleName="right">
                <div styleName="skeleton-content" />
              </div>
            </div>
          </div>

          <div styleName="content-list">
            <div styleName="top">
              <div styleName="type">
                <div styleName="skeleton-content" />
              </div>
              <div styleName="content">
                <div styleName="title"><div styleName="skeleton-content" /></div>
                <div styleName="dec"><div styleName="skeleton-content" /></div>
              </div>
              <div styleName="right">
                <div styleName="skeleton-content" />
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default DetailSkeleton;
