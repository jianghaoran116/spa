/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Card, WhiteSpace, WingBlank } from 'antd-mobile';
import { withRouter } from 'react-router-dom';

@withRouter
class UserCard extends Component {
  // static propTypes = {
  //   userlist: PropTypes.array.isRequired,
  // }

  handleClick = (v) => {
    this.props.history.push(`/chat/${v._id}`);
  }

  render() {
    const { Header, Body } = Card;
    return (
      <WingBlank>
        <WhiteSpace />
        {this.props.userlist.map(v => (
          v._id
            ? (
              <Card
                key={`userlist-${v._id}`}
                onClick={() => this.handleClick(v)}
              >
                <Header
                  title={v.user}
                  // thumb={require(`../img/${v.avatar}.png`)}
                  extra={<span>{v.title}</span>}
                />
                <Body>
                  {
                    v.type === 'boss'
                      ? (
                        <div>
                          公司:
                          {v.company}
                        </div>
                      )
                      : null
                  }

                  {v.desc && v.desc.split('\n').map(d => (
                    <div key={d}>{d}</div>
                  ))}
                  {
                    v.type === 'boss'
                      ? (
                        <div>
                          薪资:
                          {v.money}
                        </div>
                      )
                      : null
                  }
                </Body>
              </Card>
            )
            : null
        ))}
      </WingBlank>
    );
  }
}

export default UserCard;
