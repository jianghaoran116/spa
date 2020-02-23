/**
 * @file 详情页header
 * @author haoran
 */

import React, { Component } from 'react';
import './index.styl';

class DetailHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: true,
    };

    this.showContent = this.showContent.bind(this);
  }

  showContent() {
    this.setState((prevState) => {
      console.log(prevState);
      return {
        visible: !prevState.visible,
      };
    });
  }

  render() {
    return (
      <div styleName="wrap">
        <div styleName="top">
          <div styleName="top-content">
            <div styleName="left">
              其他应收
            </div>
            <div styleName="right">
              OARar19123912391293
            </div>
          </div>
          <div styleName="top-content">
            <div styleName="left">
              客户
            </div>
            <div styleName="right">
              格力电器股份有限公司
            </div>
          </div>
          <div styleName="top-content">
            <div styleName="left">
              客户
            </div>
            <div styleName="right">
              格力电器股份有限公司
            </div>
          </div>
          <div styleName="top-content">
            <div styleName="left">
              客户
            </div>
            <div styleName="right">
              格力电器股份有限公司格力电器股份有限公司格力电器股份有限公司格力电器股份有限公司格力电器股份有限公司
            </div>
          </div>
          <div styleName="top-content">
            <div styleName="left">
              客户
            </div>
            <div styleName="right">
              格力电器股份有限公司
            </div>
          </div>
          <div styleName="top-content" style={this.state.visible ? { display: 'none' } : { display: 'flex' }}>
            <div styleName="left">
              客户
            </div>
            <div styleName="right">
              格力电器股份有限公司
            </div>
          </div>
          <div styleName="top-content" style={this.state.visible ? { display: 'none' } : { display: 'flex' }}>
            <div styleName="left">
              客户
            </div>
            <div styleName="right">
              格力电器股份有限公司
            </div>
          </div>
          <div styleName="top-content" style={this.state.visible ? { display: 'none' } : { display: 'flex' }}>
            <div styleName="left">
              客户
            </div>
            <div styleName="right">
              格力电器股份有限公司
            </div>
          </div>
          <div styleName="top-content" style={this.state.visible ? { display: 'none' } : { display: 'flex' }}>
            <div styleName="left">
              客户
            </div>
            <div styleName="right">
              格力电器股份有限公司
            </div>
          </div>
          <div styleName="top-content" style={this.state.visible ? { display: 'none' } : { display: 'flex' }}>
            <div styleName="left">
              客户
            </div>
            <div styleName="right">
              格力电器股份有限公司
            </div>
          </div>
          <div styleName="top-content" style={this.state.visible ? { display: 'none' } : { display: 'flex' }}>
            <div styleName="left">
              客户
            </div>
            <div styleName="right">
              格力电器股份有限公司
            </div>
          </div>
          <div styleName="top-content" style={this.state.visible ? { display: 'none' } : { display: 'flex' }}>
            <div styleName="left">
              客户
            </div>
            <div styleName="right">
              格力电器股份有限公司
            </div>
          </div>
          <div styleName="top-content" style={this.state.visible ? { display: 'none' } : { display: 'flex' }}>
            <div styleName="left">
              客户
            </div>
            <div styleName="right">
              格力电器股份有限公司
            </div>
          </div>
          <div styleName="top-content" style={this.state.visible ? { display: 'none' } : { display: 'flex' }}>
            <div styleName="left">
              客户
            </div>
            <div styleName="right">
              格力电器股份有限公司
            </div>
          </div>
          <div styleName="top-content" style={this.state.visible ? { display: 'none' } : { display: 'flex' }}>
            <div styleName="left">
              客户
            </div>
            <div styleName="right">
              格力电器股份有限公司
            </div>
          </div>
          <div styleName="top-content" style={this.state.visible ? { display: 'none' } : { display: 'flex' }}>
            <div styleName="left">
              客户
            </div>
            <div styleName="right">
              格力电器股份有限公司
            </div>
          </div>
          <div styleName="top-content" style={this.state.visible ? { display: 'none' } : { display: 'flex' }}>
            <div styleName="left">
              客户
            </div>
            <div styleName="right">
              格力电器股份有限公司
            </div>
          </div>
          <div styleName="top-content" style={this.state.visible ? { display: 'none' } : { display: 'flex' }}>
            <div styleName="left">
              客户
            </div>
            <div styleName="right">
              格力电器股份有限公司
            </div>
          </div>
          <div styleName="top-content" style={this.state.visible ? { display: 'none' } : { display: 'flex' }}>
            <div styleName="left">
              客户
            </div>
            <div styleName="right">
              格力电器股份有限公司
            </div>
          </div>
          <div styleName="top-content" style={this.state.visible ? { display: 'none' } : { display: 'flex' }}>
            <div styleName="left">
              客户
            </div>
            <div styleName="right">
              格力电器股份有限公司
            </div>
          </div>
          <div styleName="top-content" style={this.state.visible ? { display: 'none' } : { display: 'flex' }}>
            <div styleName="left">
              客户
            </div>
            <div styleName="right">
              格力电器股份有限公司
            </div>
          </div>
          <div styleName="top-content" style={this.state.visible ? { display: 'none' } : { display: 'flex' }}>
            <div styleName="left">
              客户
            </div>
            <div styleName="right">
              格力电器股份有限公司
            </div>
          </div>
          <div styleName="top-content" style={this.state.visible ? { display: 'none' } : { display: 'flex' }}>
            <div styleName="left">
              客户
            </div>
            <div styleName="right">
              格力电器股份有限公司
            </div>
          </div>
          <div styleName="top-content" style={this.state.visible ? { display: 'none' } : { display: 'flex' }}>
            <div styleName="left">
              客户
            </div>
            <div styleName="right">
              格力电器股份有限公司
            </div>
          </div>
          <div styleName="top-content" style={this.state.visible ? { display: 'none' } : { display: 'flex' }}>
            <div styleName="left">
              客户
            </div>
            <div styleName="right">
              格力电器股份有限公司
            </div>
          </div>
          <div styleName="top-content" style={this.state.visible ? { display: 'none' } : { display: 'flex' }}>
            <div styleName="left">
              客户
            </div>
            <div styleName="right">
              格力电器股份有限公司
            </div>
          </div>
          <div styleName="top-content" style={this.state.visible ? { display: 'none' } : { display: 'flex' }}>
            <div styleName="left">
              客户
            </div>
            <div styleName="right">
              格力电器股份有限公司
            </div>
          </div>
        </div>
        <div styleName="middle">
          <div styleName="left" />
          <div styleName="hash-line" />
          <div styleName="right" />
        </div>
        <div
          styleName="bottom"
          role="button"
          tabIndex="0"
          onClick={this.showContent}
          onKeyDown={() => {}}
        >
          <p>
            展开更多
          </p>
        </div>
      </div>
    );
  }
}

export default DetailHeader;
