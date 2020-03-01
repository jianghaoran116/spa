import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Skeleton,
} from 'antd';
import * as actions from './index-redux';
// import './index.styl';

@connect(
  state => ({
    ...state.Course.list,
    ...state.Course.detail,
  }), {
    ...actions,
  },
)
class CourseDetail extends Component {
  constructor(props) {
    super(props);

    this.props.getCourseDetailTask()
      .then(() => {
        this.props.setCourseDetail(this.props.selectedCourse);
        this.props.loadCoursePage(false);
      })
      .catch(err => console.log(err));
  }

  render() {
    console.log(this.props.courseDetail);
    return (
      this.props.loading
        ? <Skeleton active />
        : (
          <React.Fragment>
            课程详情
          </React.Fragment>
        )
    );
  }
}

export default CourseDetail;
