/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List, Badge } from 'antd-mobile';
import { createSelector } from 'reselect';

const selector1 = createSelector(
  [
    state => state.User.userContent,
    state => state.Chat.chat,
  ],
  (user, chat) => {
    // console.log(user,chat)
    const msgGroup = {};
    chat.chatmsg.forEach((v) => {
      msgGroup[v.chatid] = msgGroup[v.chatid] || [];
      msgGroup[v.chatid].push(v);
    });
    const getLast = arr => [arr.length - 1];
    const chatList = Object.values(msgGroup).sort((a, b) => {
      const alast = getLast(a).create_time;
      const blast = getLast(b).create_time;
      return blast - alast;
    });
    return { user, chatList, users: chat.users };
  },
);

@connect(
  // state=>state
  state => selector1(state),
)

class Msg extends Component {
  getLast = arr => arr[arr.length - 1];

  render() {
    const { Item } = List;
    const { Brief } = Item;
    const userid = this.props.user._id;
    const userinfo = this.props.users;
    // console.log(this.props)
    // const msgGroup = {}
    // this.props.chat.chatmsg.forEach(v=>{
    //   msgGroup[v.chatid] = msgGroup[v.chatid] || []
    //   msgGroup[v.chatid].push(v)
    // })

    // const chatList = Object.values(msgGroup).sort((a,b)=>{
    //   const a_last = this.getLast(a).create_time
    //   const b_last = this.getLast(b).create_time
    //   return b_last - a_last
    // })

    return (
      <div>
        {this.props.chatList.map((v) => {
          const lastItem = this.getLast(v);
          // console.log(9)
          const targetId = v[0].from === userid ? v[0].to : v[0].from;
          const unreadNum = v.filter(item => !item.read && item.to === userid).length;
          if (!userinfo[targetId]) {
            return null;
          }
          // const name = userinfo[targetId]?userinfo[targetId].name:''
          // const avatar = userinfo[targetId]?userinfo[targetId].avatar:''
          return (
            <List key={lastItem._id}>
              <Item
                extra={<Badge text={unreadNum} />}
                // thumb={require(`../img/${userinfo[targetId].avatar}.png`)}
                arrow="horizontal"
                onClick={() => {
                  this.props.history.push(`/chat/${targetId}`);
                }}
              >
                {lastItem.content}
                <Brief>{userinfo[targetId].name}</Brief>
              </Item>
            </List>
          );
        })}
      </div>
    );
  }
}

export default Msg;
