/**
 * @file 详情页footer
 * @author haoran
 */

import React, { Component } from 'react';
import './index.styl';

class DetailFooter extends Component {
  render() {
    const { data } = this.props;

    return (
      <div styleName="wrap">
        {
          data.creater
            ? (
              <div styleName="list">
                <div styleName="type">
                  <span className="iconfont" styleName="iconfont">&#xe605;</span>
                  创建
                </div>
                <div styleName="name">
                  {data.creater}
                </div>
                <div styleName="time">
                  {data.createTime}
                </div>
              </div>
            )
            : null
        }
        {
          data.auditor
            ? (
              <div styleName="list">
                <div styleName="type">
                  <span className="iconfont" styleName="iconfont">&#xe606;</span>
                  审核
                </div>
                <div styleName="name">
                  {data.auditor}
                </div>
                <div styleName="time">
                  {data.auditTime}
                </div>
              </div>
            )
            : null
        }
      </div>
    );
  }
}

export default DetailFooter;
