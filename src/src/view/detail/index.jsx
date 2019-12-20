/**
 * @file 详情页
 * @author haoran
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
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

    Promise.all([
      this.props.getContent(),
      this.props.showSek(),
    ]).then(() => {
      this.props.setLoadState(false);
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
            <DetailHeader />
            <DetailContent />
            <DetailFooter />
          </div>
        )
    );
  }
}

export default Detail;
