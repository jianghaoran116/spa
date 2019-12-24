/**
 * @file 详情页footer
 * @author haoran
 */

import React, { Component } from 'react';
import './index.styl';
import utils from '../../../utils/index';

class DetailContent extends Component {
  render() {
    const { data } = this.props;
    return (
      <div styleName="wrap">
        <div styleName="title">
          <p>
            <span className="iconfont" styleName="iconfont">&#xe8ae;</span>
            明细
            <span>{`(${data.length})`}</span>
          </p>
        </div>
        <div styleName="content">
          {
            data.map(item => (
              <div key={`${item.material}-${item.oriTaxUnitPrice}`} styleName="content-list">
                <div styleName="top">
                  <div styleName="left">
                    {item.material}
                  </div>
                  <div styleName="right">
                    {utils.formatCash(item.oriSum)}
                  </div>
                </div>
                <div styleName="bottom">
                  {`${item.oriTaxUnitPrice} * ${item.priceQty}`}
                </div>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

export default DetailContent;
