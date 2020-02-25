/**
 * @file 课程页面
 * @author haoran
 */

import React, { Component } from 'react';
import CourseList from '../../components/course/list';
// import './index.styl';

class GeniusView extends Component {
  render() {
    return (
      <React.Fragment>
        <CourseList />
      </React.Fragment>
    );
  }
}

export default GeniusView;
