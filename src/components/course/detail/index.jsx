import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Skeleton,
  Form,
  Input,
  // Button,
  Icon,
  Upload,
  // message,
  // Row,
  // Col,
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

    // const tailFormItemLayout = {
    //   wrapperCol: {
    //     xs: {
    //       span: 24,
    //       offset: 0,
    //     },
    //     sm: {
    //       span: 20,
    //       offset: 4,
    //     },
    //   },
    // };

    const {
      name,
      uploadUri,
    } = this.props.selectedCourse;
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
            <Form {...formItemLayout}>
              <Form.Item label="课程名称">
                <Input
                  // onChange={(e) => { this.onNameChange(e); }}
                  value={name}
                />
              </Form.Item>
              <Form.Item label="课程头图">
                <Upload
                  name="img"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  action={uploadUri}
                  method="post"
                  beforeUpload={this.beforeUpload}
                  onChange={this.handleChange}
                  headers={{ 'x-auth-token': '2985d904-8830-4517-85b4-dac5b4a5301a' }}
                >
                  {uploadButton}
                </Upload>
              </Form.Item>
            </Form>
          </React.Fragment>
        )
    );
  }
}

export default CourseDetail;
