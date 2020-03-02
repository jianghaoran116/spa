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
} from 'antd';
import * as actions from './index-redux';
// import './index.styl';

@connect(
  state => ({
    ...state.Teacher.list,
    ...state.Teacher.detail,
  }), {
    ...actions,
  },
)
class TeacherDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imageUrl: '',
      uploadLoading: false,
    };

    this.props.getTeacherDetailTask()
      .then(() => {
        if (this.props.selectedTeacher) {
          this.props.setTeacherDetail(this.props.selectedTeacher);
        }
        if (this.props.selectedTeacher && this.props.selectedTeacher.description) {
          this.props.addDescription(this.props.selectedTeacher.description);
        }
        this.props.loadTeacherPage(false);
      })
      .catch(err => console.log(err));
  }

  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt10M = file.size / 1024 / 1024 < 10;
    if (!isLt10M) {
      message.error('Image must smaller than 10MB!');
    }
    return isJpgOrPng && isLt10M;
  }

  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ uploadLoading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      this.getBase64(info.file.originFileObj, imageUrl => (
        this.setState({
          imageUrl,
          uploadLoading: false,
        })
      ));
    }
  };

  addDescription = () => {
    this.props.addDescriptionTask();
  }

  deleteDescription = (item, idx) => {
    this.props.deleteDescriptionTask(item, idx);
  }

  descriptionContentChange = (e, item, idx) => {
    this.props.descriptionContentChange(e.target.value, item, idx);
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

    const { teacherDescription, uploadUri } = this.props;
    const { imageUrl, uploadLoading } = this.state;
    console.log(uploadUri);
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
              <Form.Item label="姓名">
                <Input />
              </Form.Item>
              <Form.Item label="头像">
                <Upload
                  name="img"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  action={uploadUri}
                  method="post"
                  beforeUpload={this.beforeUpload}
                  onChange={this.handleChange}
                  headers={{ 'x-auth-token': '86d3456d-e927-4411-99f3-9f8337626533' }}
                >
                  {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                </Upload>
              </Form.Item>
              <Form.Item label="简介">
                {
                  teacherDescription.length > 0
                    ? teacherDescription.map((item, idx) => (
                      <div
                        key={item.content}
                      >
                        <Input
                          onChange={(e) => { this.descriptionContentChange(e, item, idx); }}
                          value={item.content ? item.content : ''}
                        />
                        <Icon
                          type="close-circle"
                          onClick={() => { this.deleteDescription(item, idx); }}
                        />
                      </div>
                    ))
                    : '暂无简介'
                }
              </Form.Item>
              <Button
                onClick={this.addDescription}
              >
                添加简介
              </Button>
            </Form>
          </React.Fragment>
        )
    );
  }
}

export default TeacherDetail;
