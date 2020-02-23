import React, { Component } from 'react';
import { Layout, Icon } from 'antd';

import LeftMenu from './left-menu';
import PageContent from './page-content';

import './index.styl';

const { Header, Content, Sider } = Layout;

class LayoutWrap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: false,
    };
  }

  toggle = () => {
    this.setState(prevState => ({
      collapsed: prevState.collapsed,
    }));
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
          <Header style={{ background: '#fff', padding: '0 20px 0 0' }}>
            <Icon
              // styleName="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
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
