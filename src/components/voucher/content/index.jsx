/* eslint-disable react/no-array-index-key */
/**
 * @file voucher content
 * @author haoran
 */

import React, { Component } from 'react';
import ContentList from './content-list';
import './index.styl';

class DetailContent extends Component {
  render() {
    return (
      <div styleName="wrap">
        {this.props.data.map((item, idx) => <ContentList key={`${item.accsubject}-${idx}`} data={item} />)}
      </div>
    );
  }
}

export default DetailContent;
