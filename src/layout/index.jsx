/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
import { Layout, Icon } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { actions as userAction } from '../redux/user';

import LeftMenu from './left-menu';
import PageContent from './page-content';

import './index.styl';

const { Header, Content, Sider } = Layout;

@withRouter
@connect(
  state => ({
    ...state.User.userContent,
  }), {
    ...userAction,
  },
)
class LayoutWrap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: false,
    };

    this.handleLogout = this.handleLogout.bind(this);
  }

  // toggle = () => {
  //   this.setState(prevState => ({
  //     collapsed: prevState.collapsed,
  //   }));
  // }

  handleLogout() {
    this.props.logoutSubmit();
    localStorage.setItem('token', '');
    this.props.history.push('/login');
  }

  render() {
    return (
      <Layout>
        <Sider
          // styleName="left-menu"
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
          width="260px"
        >
          <LeftMenu />
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: '0 20px 0 0', textAlign: 'right' }}>
            <span
              onClick={this.handleLogout}
              style={{ cursor: 'pointer' }}
            >
              <Icon
                type="logout"
              />
              退出登录
            </span>
          </Header>
          <Content style={{
            margin: '24px 16px', padding: 24, background: '#fff', minHeight: 400, position: 'relative',
          }}
          >
            <PageContent />
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default LayoutWrap;
