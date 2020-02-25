import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Skeleton } from 'antd';
import * as actions from './index-redux';
// import './index.styl';

@connect(
  state => ({
    ...state.Course.list,
  }), {
    ...actions,
  },
)
class CourseList extends Component {
  constructor(props) {
    super(props);

    this.props.getCourseListTask()
      .then(() => {
        this.props.loadCoursePage(true);
      })
      .catch(err => console.log(err));
  }

  render() {
    console.log(this.props);
    return (
      this.props.loading
        ? <Skeleton active />
        : (
          <React.Fragment>
            课程列表
          </React.Fragment>
        )
    );
  }
}

export default CourseList;
