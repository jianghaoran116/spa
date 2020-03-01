/**
 * @file 教师页面
 * @author haoran
 */

import React, { Component } from 'react';
import TeacherList from '../../components/teacher/list';
// import './index.styl';

class TeacherView extends Component {
  render() {
    return (
      <React.Fragment>
        <TeacherList />
      </React.Fragment>
    );
  }
}

export default TeacherView;
