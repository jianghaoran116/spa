/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import { TabBar } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import './index.styl';

@withRouter
@connect(
  state => state.Chat.chat,
  null,
)
class NavLinkBar extends Component {
  // static propTypes = {
  //   data: PropTypes.array.isRequired
  // }
  render() {
    const navList = this.props.data.filter(v => !v.hide);
    const { pathname } = this.props.location;

    return (
      <div styleName="custom-tab-bar">
        <TabBar>
          {navList.map(v => (
            <TabBar.Item
              badge={v.path === '/msg' ? this.props.unread : 0}
              key={v.path}
              title={v.text}
              icon={{ uri: require(`../../styles/images/${v.icon}.png`) }}
              selectedIcon={{ uri: require(`../../styles/images/${v.icon}-active.png`) }}
              selected={pathname === v.path}
              onPress={() => {
                this.props.history.push(v.path);
              }}
            />
          ))}
        </TabBar>
      </div>
    );
  }
}

export default NavLinkBar;
