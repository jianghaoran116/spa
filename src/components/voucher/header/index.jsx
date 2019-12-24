/**
 * @file voucher header
 * @author haoran
 */

import React, { Component } from 'react';
import './index.styl';

class DetailHeader extends Component {
  render() {
    return (
      <div styleName="wrap">
        <div styleName="left">
          <div styleName="time">
            {this.props.data.period}
          </div>
          <div styleName="title">
            {this.props.data.billcode}
          </div>
        </div>
        <div styleName="right">
          <div className="iconfont" styleName="iconfont">&#xe611;</div>
          <p>{`(附件${this.props.data.fileurl.length})`}</p>
          {/* <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.baidu.com"
          >
            <div className="iconfont" styleName="iconfont">&#xe611;</div>
            {`(附件${this.props.data.fileurl.length})`}
          </a> */}
        </div>
      </div>
    );
  }
}

export default DetailHeader;
