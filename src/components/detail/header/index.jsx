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
    const { data } = this.props;

    return (
      <div styleName="wrap">
        <div styleName="top">
          {
            data.map((item, idx) => {
              if (idx < 4) {
                return (
                  <div key={item.name} styleName="top-content">
                    <div styleName="left">
                      {item.name}
                    </div>
                    <div styleName="right">
                      {item.value}
                    </div>
                  </div>
                );
              }
              return (
                <div styleName="top-content" key={item.name} style={this.state.visible ? { display: 'none' } : { display: 'flex' }}>
                  <div styleName="left">
                    {item.name}
                  </div>
                  <div styleName="right">
                    {item.value}
                  </div>
                </div>
              );
            })
          }
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
            {
              // eslint-disable-next-line no-nested-ternary
              data.length < 5
                ? '暂无更多'
                : this.state.visible
                  ? '展开更多'
                  : '收起更多'
            }
          </p>
        </div>
      </div>
    );
  }
}

export default DetailHeader;
