/**
 * @file 查看凭证
 * @author haoran
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
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
      this.props.showSek(),
    ]).then(() => {
      this.props.setLoadState(false);
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
            <VoucherHeader />
            <VoucherContent />
          </div>
        )
    );
  }
}

export default Voucher;
