import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserList } from '../usercard/index-redux';
import UserCard from '../usercard';

@connect(
  state => state.chatuser,
  { getUserList },
)
class Boss extends Component {
  componentDidMount() {
    this.props.getUserList('genius');
  }

  render() {
    return (
      <React.Fragment>
        <UserCard userlist={this.props.userlist} />
      </React.Fragment>
    );
  }
}

export default Boss;
