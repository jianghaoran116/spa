/**
 * @file voucher header
 * @author haoran
 */

import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import './index.styl';

class DetailHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
    };

    this.showInfo = this.showInfo.bind(this);
  }

  showInfo() {
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
          <div styleName="left">
            <div styleName="time">
              {this.props.data.period}
            </div>
            <div styleName="title">
              {this.props.data.billcode}
            </div>
          </div>
          <div
            styleName="right"
            role="button"
            tabIndex="0"
            onClick={this.showInfo}
            onKeyDown={() => {}}
          >
            <div className="iconfont" styleName="iconfont">&#xe611;</div>
            <p>{`(附件${(data.fileurl.data.length + data.bill.data.length)})`}</p>
            {/* <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.baidu.com"
            >
              <div className="iconfont" styleName="iconfont">&#xe611;</div>
              {`(附件${this.props.data.fileurl.length})`}
            </a> */}
          </div>
        </div>

        <div styleName={`bottom ${!this.state.visible ? 'hidden' : 'show'}`}>
          <div styleName="box">

            <div styleName="list">
              <div styleName="left">
                {data.fileurl.title}
              </div>
              <div styleName="right">
                {data.fileurl.data.map(item => (
                  <div key={`${item.url}-${item.urlName}`} styleName="item">
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={item.url}
                    >
                      {item.urlName}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            <div styleName="list">
              <div styleName="left">
                {data.bill.title}
              </div>
              <div styleName="right">
                {data.bill.data.map((item) => {
                  if (item.linksrcbillurl) {
                    return (
                      <div key={item.linksrcbillurl} styleName="item">
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href={item.linksrcbillurl}
                        >
                          {item.outersystem}
                        </a>
                      </div>
                    );
                  }
                  return (
                    <div key={item.billid} styleName="item">
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={`./bill?billid=${item.billid}&billtype=${item.billtype}&tenantId=${this.props.tenantId}&yhtUserId=${this.props.userToken}`}
                      >
                        {item.outersystem}
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>

      </div>
    );
  }
}

export default DetailHeader;
