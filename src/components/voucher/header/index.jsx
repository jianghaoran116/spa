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
            2019-12
          </div>
          <div styleName="title">
            记账凭证-01记账凭证-01记账凭证-01记账凭证-01记账凭证-01记账凭证-01记账凭证-01记账凭证-01记账凭证-01记账凭证-01记账凭证-01
          </div>
        </div>
        <div styleName="right">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.baidu.com"
          >
            <div className="iconfont" styleName="iconfont">&#xe611;</div>
            (附件2)
          </a>
        </div>
      </div>
    );
  }
}

export default DetailHeader;
