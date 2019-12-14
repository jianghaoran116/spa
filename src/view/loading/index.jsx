/**
 * @file loading页
 * @author haoran
 */

import React, { Component } from 'react';
import { Toast } from 'antd-mobile';

class Loading extends Component {
  componentDidMount() {
    Toast.loading('Loading...', 30, () => {
      console.log('Load complete !!!');
    });
  }

  componentWillUnmount() {
    Toast.hide();
  }

  render() {
    return (
      <React.Fragment />
    );
  }
}

export default Loading;
