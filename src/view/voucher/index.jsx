/**
 * @file 查看凭证
 * @author haoran
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Toast } from 'antd-mobile';
import { actions } from './redux';
import SkeletonPage from '../skeleton/voucher/index';
import VoucherHeader from '../../components/voucher/header/index';
import VoucherContent from '../../components/voucher/content/index';
import './index.styl';

@connect(
  state => ({
    ...state.Voucher.voucherContent,
  }), {
    ...actions,
  },
)
class Voucher extends Component {
  constructor(props) {
    super(props);

    document.title = '查看凭证';

    Promise.all([
      this.props.getContent(),
    ]).then(() => {
      this.props.setLoadState(false);
    }).catch((err) => {
      Toast.loading('获取数据失败，请稍后重试', 2);
      console.log(err);
    });
  }

  render() {
    return (
      this.props.loading
        ? (
          <SkeletonPage />
        )
        : (
          <div styleName="voucher-container">
            <VoucherHeader data={this.props.content.total} {...this.props} />
            <VoucherContent data={this.props.content.details} />
          </div>
        )
    );
  }
}

export default Voucher;
