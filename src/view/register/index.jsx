/**
 * @file 注册页
 * @author haoran
 */

import React, { Component } from 'react';
import {
  List,
  InputItem,
  Radio,
  // WingBlank,
  WhiteSpace,
  Button,
} from 'antd-mobile';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { actions } from './redux';
import { actions as userAction } from '../../redux/user';
// import './index.styl';

const { RadioItem } = Radio;

@connect(
  state => ({
    ...state.User.userContent,
    ...state.Register.registerContent,
  }), {
    ...actions,
    ...userAction,
  },
)
class RegisterView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      pwd: '',
      repeatpwd: '',
      type: 'genius', // 或者boss
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }

  handleChange(key, e) {
    this.setState({
      [key]: e,
    });
  }

  handleRegister() {
    this.props.regisger(this.state);
  }

  render() {
    const {
      user,
      pwd,
      repeatpwd,
      type,
    } = this.state;

    return (
      <React.Fragment>
        {
          this.props.redirectTo
            ? <Redirect to={this.props.redirectTo} />
            : null
        }
        <h2>注册页面</h2>
        {
          this.props.msg
            ? <p className="error-msg">{this.props.msg}</p>
            : null
        }
        <List>
          <InputItem
            placeholder="请输入用户名"
            onChange={args => this.handleChange('user', args)}
            value={user}
          >
            用户名
          </InputItem>
          <WhiteSpace />
          <InputItem
            type="password"
            onChange={args => this.handleChange('pwd', args)}
            value={pwd}
          >
            密码
          </InputItem>
          <WhiteSpace />
          <InputItem
            type="password"
            onChange={args => this.handleChange('repeatpwd', args)}
            value={repeatpwd}
          >
            确认密码
          </InputItem>
          <WhiteSpace />
          <RadioItem
            checked={type === 'genius'}
            onChange={() => this.handleChange('type', 'genius')}
          >
            牛人
          </RadioItem>
          <RadioItem
            checked={type === 'boss'}
            onChange={() => this.handleChange('type', 'boss')}
          >
            BOSS
          </RadioItem>
          <WhiteSpace />
          <Button
            type="primary"
            onClick={this.handleRegister}
          >
            注册
          </Button>
        </List>
      </React.Fragment>
    );
  }
}

export default RegisterView;
