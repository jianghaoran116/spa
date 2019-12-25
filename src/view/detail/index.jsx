/**
 * @file 详情页
 * @author haoran
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Toast } from 'antd-mobile';
import { actions } from './redux';
import SkeletonPage from '../skeleton/detail/index';
import DetailHeader from '../../components/detail/header/index';
import DetailContent from '../../components/detail/content/index';
import DetailFooter from '../../components/detail/footer/index';
import './index.styl';

@connect(
  state => ({
    ...state.Detail.detailContent,
  }), {
    ...actions,
  },
)
class Detail extends Component {
  constructor(props) {
    super(props);

    document.title = '应收单';

    Promise.all([
      this.props.getContent(),
    ]).then(() => {
      this.props.setLoadState(false);
    }).catch((err) => {
      Toast.loading('获取数据失败，请稍后重试', 2);
      console.log(err);
    });
  }

  onChange = (val) => {
    console.log(val);
  }

  render() {
    return (
      this.props.loading
        ? (
          <SkeletonPage />
        )
        : (
          <div styleName="detail-container">
            <DetailHeader data={this.props.content.total} />
            <DetailContent data={this.props.content.details} />
            <DetailFooter data={this.props.content} />
          </div>
        )
    );
  }
}

export default Detail;
