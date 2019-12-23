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
        <ContentList />
        <ContentList />
        <ContentList />
        <ContentList />
        <ContentList />
      </div>
    );
  }
}

export default DetailContent;
