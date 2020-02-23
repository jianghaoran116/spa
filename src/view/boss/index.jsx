/**
 * @file 牛人页面
 * @author haoran
 */

import React, { Component } from 'react';
import {
  NavBar,
  InputItem,
  TextareaItem,
  Button,
} from 'antd-mobile';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions as userAction } from '../../redux/user';
// import './index.styl';

@connect(
  state => ({
    ...state.User.userContent,
  }), {
    ...userAction,
  },
)
class BossView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      desc: '',
      company: '',
      money: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(key, e) {
    this.setState({
      [key]: e,
    });
  }

  render() {
    const {
      title, desc, company, money,
    } = this.state;
    const path = this.props.location.pathname;
    const redirect = this.props.redirectTo;
    return (
      <React.Fragment>
        {
          redirect && redirect !== path
            ? <Redirect to={this.props.redirectTo} />
            : null
        }
        <NavBar mode="dark">BOSS完善信息页</NavBar>
        {/* <AvatarSelector
          selectAvatar={(imgname) => {
            this.setState({
              avatar: imgname,
            });
          }}
        /> */}
        <InputItem
          value={title}
          onChange={args => this.handleChange('title', args)}
        >
          招聘职位
        </InputItem>
        <InputItem
          value={company}
          onChange={args => this.handleChange('company', args)}
        >
          公司名称
        </InputItem>
        <InputItem
          value={money}
          onChange={args => this.handleChange('money', args)}
        >
          职位薪资
        </InputItem>
        <TextareaItem
          value={desc}
          onChange={args => this.handleChange('desc', args)}
          rows={3}
          autoHeight
          title="职位要求"
        />
        <Button
          onClick={() => this.props.update(this.state)}
          type="primary"
        >
          保存
        </Button>
      </React.Fragment>
    );
  }
}

export default BossView;
