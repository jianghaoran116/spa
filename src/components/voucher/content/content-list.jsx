/**
 * @file voucher content list
 * @author haoran
 */

import React, { Component } from 'react';
import utils from '../../../utils/index';
import './content-list.styl';

class DetailContent extends Component {
  render() {
    return (
      <div styleName={`content-list ${this.props.data.debit_org !== 0 ? 'jie' : 'dai'}`}>
        <div styleName="top">
          <div styleName="type">
            {this.props.data.debit_org !== 0 ? '借' : '贷'}
          </div>
          <div styleName="content">
            <div styleName="title">{this.props.data.accsubject}</div>
            <div styleName="dec">{this.props.data.description}</div>
          </div>
          <div
            styleName="right"
            // role="button"
            // tabIndex="0"
            // onClick={this.showInfo}
            // onKeyDown={() => {}}
          >
            <p>
              {
                this.props.data.debit_org !== 0
                  ? utils.formatCash(this.props.data.debit_org)
                  : utils.formatCash(this.props.data.credit_org)
              }
            </p>
            {/* <div styleName="show-info">
              {
                this.state.visible
                  ? <span className="iconfont">&#xe648;</span>
                  : <span className="iconfont">&#xe644;</span>
              }
            </div> */}
          </div>
        </div>
        {/* <div styleName={`bottom ${!this.state.visible ? 'hidden' : 'show'}`}>
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
        </div> */}
      </div>
    );
  }
}

export default DetailContent;
