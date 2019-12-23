/**
 * @file 详情页骨架屏
 * @author haoran
 */

import React, { Component } from 'react';
import './index.styl';

class DetailSkeleton extends Component {
  render() {
    return (
      <div styleName="detail-skeleton">
        <div styleName="detail-top-wrap">
          <div styleName="top">
            <div styleName="top-content">
              <div styleName="left">
                <div styleName="skeleton-content" />
              </div>
              <div styleName="right">
                <div styleName="skeleton-content" />
              </div>
            </div>
            <div styleName="top-content">
              <div styleName="left">
                <div styleName="skeleton-content" />
              </div>
              <div styleName="right">
                <div styleName="skeleton-content" />
              </div>
            </div>
          </div>
          <div styleName="middle">
            <div styleName="left" />
            <div styleName="hash-line" />
            <div styleName="right" />
          </div>
          <div styleName="bottom">
            <div>
              <div styleName="skeleton-content" />
            </div>
          </div>
        </div>

        <div styleName="detail-content-wrap">
          <div styleName="title">
            <div>
              <div styleName="skeleton-content" />
            </div>
          </div>
          <div styleName="content">
            <div styleName="content-list">
              <div styleName="top">
                <div styleName="left">
                  <div styleName="skeleton-content" />
                </div>
                <div styleName="right">
                  <div styleName="skeleton-content" />
                </div>
              </div>
              <div styleName="bottom">
                <div styleName="skeleton-content" />
              </div>
            </div>
            <div styleName="content-list">
              <div styleName="top">
                <div styleName="left">
                  <div styleName="skeleton-content" />
                </div>
                <div styleName="right">
                  <div styleName="skeleton-content" />
                </div>
              </div>
              <div styleName="bottom">
                <div styleName="skeleton-content" />
              </div>
            </div>
          </div>
        </div>

        <div styleName="detail-footer-wrap">
          <div styleName="list">
            <div styleName="type">
              <div styleName="skeleton-content" />
            </div>
            <div styleName="name">
              <div styleName="skeleton-content" />
            </div>
            <div styleName="time">
              <div styleName="skeleton-content" />
            </div>
          </div>
          <div styleName="list">
            <div styleName="type">
              <div styleName="skeleton-content" />
            </div>
            <div styleName="name">
              <div styleName="skeleton-content" />
            </div>
            <div styleName="time">
              <div styleName="skeleton-content" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DetailSkeleton;
