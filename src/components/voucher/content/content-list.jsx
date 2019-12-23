/**
 * @file voucher content list
 * @author haoran
 */

import React, { Component } from 'react';
import './content-list.styl';

class DetailContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      voucherType: false,
    };

    this.showInfo = this.showInfo.bind(this);
  }

  showInfo() {
    this.setState((prevState) => {
      console.log(prevState);
      return {
        visible: !prevState.visible,
      };
    });
  }

  render() {
    return (
      <div styleName={`content-list ${this.state.voucherType ? 'jie' : 'dai'}`}>
        <div styleName="top">
          <div styleName="type">
            {this.state.voucherType ? '借' : '贷'}
          </div>
          <div styleName="content">
            <div styleName="title">创维平板显示器</div>
            <div styleName="dec">销售一部 张三</div>
          </div>
          <div
            styleName="right"
            role="button"
            tabIndex="0"
            onClick={this.showInfo}
            onKeyDown={() => {}}
          >
            <p>2660.54</p>
            <div styleName="show-info">
              {
                this.state.visible
                  ? <span className="iconfont">&#xe648;</span>
                  : <span className="iconfont">&#xe644;</span>
              }
            </div>
          </div>
        </div>
        <div styleName={`bottom ${!this.state.visible ? 'hidden' : 'show'}`}>
          <div styleName="info-list">
            <div styleName="left">
              <p>摘要</p>
            </div>
            <div styleName="right">
              <p>购买办公用品</p>
            </div>
          </div>
          <div styleName="info-list">
            <div styleName="left">
              <p>科目</p>
            </div>
            <div styleName="right">
              <p>应收单据应收单据应收单据应收单据应收单据应收单据应收单据应收单据应收单据</p>
            </div>
          </div>
          <div styleName="info-list">
            <div styleName="left">
              <p>辅助核算</p>
            </div>
            <div styleName="right">
              <p>客户</p>
            </div>
          </div>
          <div styleName="info-list">
            <div styleName="left">
              <p>金额</p>
            </div>
            <div styleName="right">
              <p>2660.54</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DetailContent;
