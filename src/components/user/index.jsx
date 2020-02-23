import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Result,
  List,
  WhiteSpace,
  Modal,
} from 'antd-mobile';
import browserCookie from 'browser-cookies';
import { Redirect } from 'react-router-dom';
import { actions as userAction } from '../../redux/user';
// import { logoutSubmit } from '../../redux/user';

@connect(
  state => ({
    ...state.User.userContent,
  }),
  { ...userAction },
)
class User extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout() {
    const { alert } = Modal;

    alert('注销', '确认退出登录吗???', [
      { text: '取消', onPress: () => console.log('cancel') },
      {
        text: '确认',
        onPress: () => {
          browserCookie.erase('userid');
          console.log(this.props);
          this.props.logoutSubmit();
        },
      },
    ]);
  }

  render() {
    const { props } = this;
    const { Item } = List;
    const { Brief } = Item;

    return props.user
      ? (
        <div>
          <Result
            // img={<img src={require(`../img/${props.avatar}.png`)} style={{width:50}} alt="" />}
            title={props.user}
            message={props.type === 'boss' ? props.company : null}
          />

          <List renderHeader={() => '简介'}>
            <Item
              multipleLine
            >
              {props.title && props.title}
              {props.desc && props.desc.split('\n').map(v => <Brief key={v}>{v}</Brief>)}
              {props.money
                ? (
                  <Brief>
                    薪资:
                    {props.money}
                  </Brief>
                )
                : null
              }
            </Item>

          </List>
          <WhiteSpace />
          <List>
            <Item onClick={this.logout}>退出登录</Item>
          </List>
        </div>
      )
      : <Redirect to={props.redirectTo} />;
  }
}


export default User;
