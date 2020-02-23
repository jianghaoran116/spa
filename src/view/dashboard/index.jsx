/**
 * @file dashboard页面
 * @author haoran
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { NavBar } from 'antd-mobile';
// import { Switch, Route } from 'react-router-dom';
// import NavLinkBar from '../../components/navlink';
// import Boss from '../../components/boss';
// import Genius from '../../components/genius';
// import User from '../../components/user';
// import Msg from '../../components/msg';
import Layout from '../../layout';

import { actions } from '../chat/redux';

@connect(
  state => state,
  {
    ...actions,
  },
)
class Dashboard extends Component {
  componentDidMount() {
    if (!this.props.Chat.chat.chatmsg.length) {
      this.props.getMsgList();
      this.props.recvMsg();
    }
  }

  render() {
    // const { pathname } = this.props.location;
    // const { userContent: user } = this.props.User;
    // const navList = [
    //   {
    //     path: '/boss',
    //     text: '牛人',
    //     icon: 'boss',
    //     title: '牛人列表',
    //     component: Boss,
    //     hide: user.type === 'genius',
    //   },
    //   {
    //     path: '/genius',
    //     text: 'boss',
    //     icon: 'job',
    //     title: 'BOSS列表',
    //     component: Genius,
    //     hide: user.type === 'boss',
    //   },
    //   {
    //     path: '/msg',
    //     text: '消息',
    //     icon: 'msg',
    //     title: '消息列表',
    //     component: Msg,
    //   },
    //   {
    //     path: '/me',
    //     text: '我',
    //     icon: 'user',
    //     title: '个人中心',
    //     component: User,
    //   },
    // ];

    return (
      <Layout />
    );
  }
}

export default Dashboard;
