
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
// import axios from '../base/axios';
import { actions as userAction } from '../../redux/user';

@withRouter
@connect(
  state => ({
    ...state.User.userContent,
  }), {
    ...userAction,
  },
)
class AuthRoute extends Component {
  componentDidMount() {
    const publicList = ['/login', '/register'];
    const { pathname } = this.props.location;
    console.log(publicList.indexOf(pathname));
    if (publicList.indexOf(pathname) <= -1) { // 获取用户信息
      if (!localStorage.getItem('token')) {
        this.props.history.push('/login');
      }
      // axios.get('/api/user/info')
      //   .then((res) => {
      //     if (res.status === 200) {
      //       if (res.data.code === 0) {
      //         // 有登录信息de
      //         this.props.loadData(res.data.data);
      //       } else {
      //         this.props.history.push('/login');
      //       }
      //     }
      //   });
    }
  }

  render() {
    return <React.Fragment />;
  }
}

export default AuthRoute;
