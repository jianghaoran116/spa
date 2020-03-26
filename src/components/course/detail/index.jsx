/* eslint-disable no-param-reassign */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Skeleton,
  Form,
  Input,
  // Button,
  Icon,
  Upload,
  Transfer,
  // message,
  // Row,
  // Col,
} from 'antd';
import * as actions from './index-redux';
import './index.styl';
// import './index.styl';

@connect(
  state => ({
    ...state.Course.detail,
  }), {
    ...actions,
  },
)
class CourseDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // imageUrl: '',
      uploadLoading: false,
    };

    this.props.getTeacherListTask()
      .then((data) => {
        // eslint-disable-next-line no-param-reassign
        // eslint-disable-next-line no-return-assign
        data.forEach(item => item.key = item.id);
        this.props.setTeacherList(data);
      })
      .catch(err => console.log(err));
  }

  renderTeacherItem = (item) => {
    const customLabel = (
      <span>
        <img src={item.icon} alt="avatar" style={{ width: '64px', height: '64px' }} />
        &nbsp;&nbsp;
        {item.name}
      </span>
    );

    return {
      label: customLabel, // for displayed item
      value: item.name, // for title and filter matching
    };
  }

  onSelectTeacherChange = (targetKeys, direction, moveKeys) => {
    console.log(targetKeys, direction, moveKeys);
    // const { teachers } = this.props.courseDetail;
    const { courseDetail, teacherList } = this.props;
    const rightArr = [];
    targetKeys.forEach((key) => {
      teacherList.forEach((item) => {
        if (item.key === key) {
          rightArr.push(item);
        }
      });
    });
    courseDetail.teachers = rightArr;

    this.props.setCourseDetail({ ...courseDetail });
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

    const {
      name,
      uploadUri,
      cover,
      teachers,
    } = this.props.courseDetail;

    const {
      teacherList,
    } = this.props;

    const { uploadLoading } = this.state;

    const uploadButton = (
      <div>
        <Icon type={uploadLoading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    const transferTargetKeys = teachers.map(item => item.id);

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
                  {cover ? <img src={cover} alt="avatar" style={{ width: '375px' }} /> : uploadButton}
                </Upload>
              </Form.Item>
              <Form.Item label="教师">
                <Transfer
                  styleName="teacher-list"
                  titles={['', '本课程教师']}
                  dataSource={teacherList}
                  listStyle={{
                    width: 300,
                    height: 400,
                  }}
                  targetKeys={transferTargetKeys}
                  onChange={this.onSelectTeacherChange}
                  render={this.renderTeacherItem}
                />
              </Form.Item>
            </Form>
          </React.Fragment>
        )
    );
  }
}

export default CourseDetail;
