/**
 * @file 详情页footer
 * @author haoran
 */

import React, { Component } from 'react';
import './index.styl';

class DetailFooter extends Component {
  render() {
    return (
      <div styleName="wrap">
        <div styleName="list">
          <div styleName="type">
            <span className="iconfont" styleName="iconfont">&#xe605;</span>
            创建
          </div>
          <div styleName="name">
            李四
          </div>
          <div styleName="time">
            2019-12-12
          </div>
        </div>
        <div styleName="list">
          <div styleName="type">
            <span className="iconfont" styleName="iconfont">&#xe605;</span>
            创建
          </div>
          <div styleName="name">
            李四
          </div>
          <div styleName="time">
            2019-12-12
          </div>
        </div>
        <div styleName="list">
          <div styleName="type">
            <span className="iconfont" styleName="iconfont">&#xe606;</span>
            审核
          </div>
          <div styleName="name">
            李四
          </div>
          <div styleName="time">
            2019-12-12
          </div>
        </div>
      </div>
    );
  }
}

export default DetailFooter;
