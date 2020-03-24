import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Skeleton,
  Form,
  Input,
  Button,
  Icon,
  Upload,
  message,
  Row,
  Col,
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

    this.state = {
      // imageUrl: '',
      uploadLoading: false,
    };
  }

  render() {
    console.log(this.props.courseDetail);

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };

    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 20,
          offset: 4,
        },
      },
    };

    const { uploadLoading } = this.state;

    const uploadButton = (
      <div>
        <Icon type={uploadLoading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    return (
      this.props.loading
        ? <Skeleton active />
        : (
          <React.Fragment>
            <CourseDetail />
          </React.Fragment>
        )
    );
  }
}

export default CourseDetail;
