
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from '../base/axios';
import { loadData } from '../../redux/user';

@withRouter
@connect(
  null,
  { loadData },
)
class AuthRoute extends Component {
  componentDidMount() {
    // 是否登录
    // 现在的url地址  login是不需要跳转的

    // 用户的type 身份是boss还是牛人
    // 用户是否完善信息（选择头像 个人简介）

    const publicList = ['/login', '/register'];
    const { pathname } = this.props.location;
    console.log(publicList.indexOf(pathname));
    if (publicList.indexOf(pathname) <= -1) { // 获取用户信息
      axios.get('/api/user/info')
        .then((res) => {
          if (res.status === 200) {
            if (res.data.code === 0) {
              // 有登录信息de
              this.props.loadData(res.data.data);
            } else {
              this.props.history.push('/login');
            }
          }
        });
    }
  }

  render() {
    return <React.Fragment />;
  }
}

export default AuthRoute;
