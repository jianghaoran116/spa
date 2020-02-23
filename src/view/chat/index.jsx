/* eslint-disable jsx-a11y/accessible-emoji */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable arrow-body-style */
/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import {
  List,
  InputItem,
  NavBar,
  Icon,
  Grid,
} from 'antd-mobile';
// import io from 'socket.io-client'
import { connect } from 'react-redux';
import QueueAnim from 'rc-queue-anim';
import { actions } from './redux';
import { getChatId } from '../../utils';

import './index.styl';
// const socket = io('ws://localhost:9093')

// $('#test').find('img')
// $('#test img')

@connect(
  state => state,
  {
    ...actions,
  },
)
class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }

  componentDidMount() {
    if (!this.props.Chat.chat.chatmsg.length) {
      this.props.getMsgList();
      this.props.recvMsg();
    }
  }

  componentWillUnmount() {
    const to = this.props.match.params.user;
    this.props.readMsg(to);
  }

  // fixCarousel() {
  //   setTimeout(function(){
  //     window.dispatchEvent(new Event('resize'))
  //   },0);
  // }

  handleSubmit() {
    // socket.emit('sendmsg',{text:this.state.text})
    // this.setState({text:''})
    const from = this.props.User.userContent._id;
    const to = this.props.match.params.user;
    const msg = this.state.text;
    this.props.sendMsg({ from, to, msg });
    this.setState({
      text: '',
      showEmoji: false,
    });
  }

  render() {
    const emoji = '😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐 😷 🤒 🤕 😈 👿 👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 👍 👎 👊 ✊ 🤘 👌 👈 👉 👆 👇 ✋  🖐 🖖 👋  💪 🖕 ✍️  💅 🖖 💄 💋 👄 👅 👂 👃 👁 👀 '
      .split(' ')
      .filter(v => v)
      .map(v => ({ text: v }));

    console.log(this.props);
    const userid = this.props.match.params.user;
    const { Item } = List;
    const { users } = this.props.Chat.chat;
    if (!users[userid]) {
      return null;
    }
    const chatid = getChatId(userid, this.props.User.userContent._id);
    const chatmsgs = this.props.Chat.chat.chatmsg.filter(v => v.chatid === chatid);
    return (
      <div styleName="chat-page">
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => {
            this.props.history.goBack();
          }}
        >
          {users[userid].name}
        </NavBar>

        <QueueAnim delay={50}>
          {chatmsgs.map((v) => {
            console.log(v);
            console.log(userid);
            return v.from === userid
              ? (
                <List key={v._id}>
                  <Item>
                    {v.content}
                  </Item>
                </List>
              )
              : (
                <List key={v._id}>
                  <Item
                    // extra={<img alt='头像' src={avatar} />}
                    styleName="chat-me"
                  >
                    {v.content}
                  </Item>
                </List>
              );
          })}
        </QueueAnim>

        <div styleName="stick-footer">
          <List>
            <InputItem
              placeholder="请输入"
              value={this.state.text}
              onChange={(v) => {
                this.setState({ text: v });
              }}
              extra={(
                <div>
                  <span
                    role="img"
                    style={{ marginRight: '15' }}
                    onClick={() => {
                      this.setState({
                        // eslint-disable-next-line react/no-access-state-in-setstate
                        showEmoji: !this.state.showEmoji,
                      });
                      // this.fixCarousel();
                    }}
                  >
                    😃
                  </span>
                  <span
                    onClick={() => this.handleSubmit()}
                  >
                    发送
                  </span>
                </div>
              )}
            />
          </List>

          {
            this.state.showEmoji
              ? (
                <Grid
                  data={emoji}
                  columnNum={9}
                  carouselMaxRow={4}
                  isCarousel
                  onClick={(el) => {
                    this.setState({
                      // eslint-disable-next-line react/no-access-state-in-setstate
                      text: this.state.text + el.text,
                    });
                  }}
                />
              )
              : null
          }
        </div>
      </div>
    );
  }
}

export default Chat;
