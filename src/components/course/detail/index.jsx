/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-array-index-key */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Skeleton,
  Form,
  Input,
  Button,
  Icon,
  Upload,
  Transfer,
  message,
  Row,
  Col,
  InputNumber,
} from 'antd';
import * as actions from './index-redux';
import './index.styl';
// import './index.styl';

const { TextArea } = Input;

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
      selectSummaryIdx: -1,
      selectDetailIdx: -1,
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

  componentDidMount() {
    console.log(1);
  }

  componentWillUnmount() {
    console.log(2);
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

  updateSummary = (type) => {
    const { selectSummaryIdx } = this.state;
    this.props.addSummary(selectSummaryIdx, type);
  }

  deleteSummary = (idx) => {
    this.props.deleteSummary(idx);
  }

  summaryChagne = (item, e, idx) => {
    this.props.summaryChagne(item, e.target.value, idx);
  }

  summaryClick = (idx) => {
    this.setState({
      selectSummaryIdx: idx,
    });
  }

  updateDetail = (type) => {
    const { selectDetailIdx } = this.state;
    this.props.addDetail(selectDetailIdx, type);
  }

  detailClick = (idx) => {
    this.setState({
      selectDetailIdx: idx,
    });
  }

  detailChagne = (item, keyName, e, idx) => {
    this.props.detailChagne(item, keyName, e.target.value, idx);
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

  handleChange = (info, type, idx) => {
    const { response } = info.file;

    if (info.file.status === 'uploading') {
      this.setState({ uploadLoading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      this.getBase64(info.file.originFileObj, () => (
        this.setState({
          uploadLoading: false,
        })
      ));
    }
    if (response.status === 200) {
      this.props.updateImageUrl(response.data, type, idx);
      message.success(response.msg ? response.msg : '上传成功');
    } else {
      message.err(response.msg ? response.msg : '上传失败');
    }
  };

  onChange = (key, e, subkey) => {
    if (key === 'seats' || key === 'setting' || key === 'age') {
      const seats = { ...this.props.courseDetail[key] };
      if (e.target) {
        seats[subkey] = e.target.value;
      } else {
        seats[subkey] = e;
      }
      this.props.onChangeInfo(key, seats);
    } else {
      this.props.onChangeInfo(key, e.target.value);
    }
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

    const editorStyle = {
      width: '600px',
      maxHeight: '500px',
      overflow: 'auto',
    };

    const {
      name = '',
      setting = {},
      cover = '',
      teachers = [],
      time = '',
      address = '',
      age = {},
      seats = {},
    } = this.props.courseDetail;

    const {
      uploadUri,
      teacherList,
      summary,
      detail,
    } = this.props;

    const {
      times = 0,
      everytime = 0,
      duration = '',
    } = setting;

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
                  onChange={(e) => { this.onChange('name', e); }}
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
                  onChange={(info) => { this.handleChange(info, 'cover'); }}
                  headers={{ 'x-auth-token': '2985d904-8830-4517-85b4-dac5b4a5301a' }}
                >
                  {cover ? <img src={cover} alt="avatar" style={{ width: '375px' }} /> : uploadButton}
                </Upload>
              </Form.Item>
              <Form.Item label="上课时间">
                <Input
                  onChange={(e) => { this.onChange('time', e); }}
                  value={time}
                />
              </Form.Item>
              <Form.Item label="课程设置">
                <Row>
                  <Col span={2}>
                    课时:
                  </Col>
                  <Col span={22}>
                    <Row>
                      <Col span={6}>
                        <InputNumber
                          onChange={(e) => { this.onChange('setting', e, 'duration'); }}
                          value={duration}
                        />
                        <span>节课/学年</span>
                      </Col>
                      <Col span={6}>
                        <span>每节课为</span>
                        <InputNumber
                          onChange={(e) => { this.onChange('setting', e, 'everytime'); }}
                          value={everytime}
                        />
                        <span>课时</span>
                      </Col>
                      <Col span={6}>
                        <InputNumber
                          onChange={(e) => { this.onChange('setting', e, 'times'); }}
                          value={times}
                        />
                        <span>分钟/节课</span>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <Col span={2}>
                    授课对象:
                  </Col>
                  <Col span={6}>
                    <InputNumber
                      onChange={(e) => { this.onChange('age', e, 'min'); }}
                      value={age.min}
                    />
                    -
                    <InputNumber
                      onChange={(e) => { this.onChange('age', e, 'max'); }}
                      value={age.max}
                    />
                    <Input
                      onChange={(e) => { this.onChange('age', e, 'tips'); }}
                      value={age.tips}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col span={2}>
                    班级容量:
                  </Col>
                  <Col span={6}>
                    <InputNumber
                      onChange={(e) => { this.onChange('seats', e, 'min'); }}
                      value={seats.min}
                    />
                    -
                    <InputNumber
                      onChange={(e) => { this.onChange('seats', e, 'max'); }}
                      value={seats.max}
                    />
                    <Input
                      onChange={(e) => { this.onChange('seats', e, 'tips'); }}
                      value={seats.tips}
                    />
                  </Col>
                </Row>
              </Form.Item>
              <Form.Item label="地址">
                <Input
                  onChange={(e) => { this.onChange('address', e); }}
                  value={address}
                />
              </Form.Item>
              <Form.Item label="教师">
                <Transfer
                  styleName="teacher-list"
                  titles={['', '本课程教师']}
                  dataSource={teacherList}
                  listStyle={{
                    width: 400,
                    height: 400,
                  }}
                  targetKeys={transferTargetKeys}
                  onChange={this.onSelectTeacherChange}
                  render={this.renderTeacherItem}
                />
              </Form.Item>
              <Form.Item label="课程简介">
                <Row>
                  <Col span={6}>
                    <Button
                      onClick={() => this.updateSummary.call(this, 1)}
                    >
                      插入内容
                    </Button>
                    <Button
                      onClick={() => this.updateSummary.call(this, 4)}
                    >
                      插入图片
                    </Button>
                  </Col>
                  <Col span={18}>
                    <div
                      style={editorStyle}
                    >
                      {
                        summary.map((item, idx) => {
                          const contentArr = />(.+)</.exec(item.content);
                          let contentStr = '';
                          if (contentArr) {
                            contentStr = contentArr[1];
                          }
                          if (item.type === 1) {
                            return (
                              <div
                                styleName="summary-wrap"
                                key={`summary-${idx}`}
                              >
                                <Icon
                                  type="close-circle"
                                  key="edit"
                                  style={{ fontSize: '14px', color: '#ff4d4f' }}
                                  onClick={() => { this.deleteSummary(idx); }}
                                />
                                <TextArea
                                  onChange={(e) => { this.summaryChagne(item, e, idx); }}
                                  value={contentStr}
                                  onClick={() => { this.summaryClick(idx); }}
                                  autoSize
                                />
                              </div>
                            );
                          }
                          if (item.type === 4) {
                            const imageUrl = item.content && item.content.url ? item.content.url : '';
                            return (
                              <div
                                styleName="summary-wrap"
                                key={`summary-${idx}`}
                              >
                                <Icon
                                  type="close-circle"
                                  key="edit"
                                  style={{ fontSize: '14px', color: '#ff4d4f' }}
                                  onClick={() => { this.deleteSummary(idx); }}
                                />
                                <Upload
                                  name="img"
                                  listType={`summary-${idx}-card`}
                                  className="avatar-uploader"
                                  showUploadList={false}
                                  action={uploadUri}
                                  method="post"
                                  beforeUpload={this.beforeUpload}
                                  onChange={(info) => { this.handleChange(info, 'summary', idx); }}
                                  headers={{ 'x-auth-token': '2985d904-8830-4517-85b4-dac5b4a5301a' }}
                                >
                                  {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '375px' }} /> : uploadButton}
                                </Upload>
                              </div>
                            );
                          }
                          return null;
                        })
                      }
                    </div>
                  </Col>
                </Row>
              </Form.Item>
              <Form.Item label="课程详解">
                <Row>
                  <Col span={6}>
                    <Button
                      onClick={() => this.updateDetail.call(this, 1)}
                    >
                      插入内容
                    </Button>
                  </Col>
                  <Col span={18}>
                    <div
                      style={editorStyle}
                    >
                      {
                        detail.map((item, idx) => {
                          if (item.type === 1) {
                            const detailContent = item.content.split("<div class='course-explain-content'>");
                            let title = '';
                            const titleArr = /<span>(.*?)<\/span>/g.exec(detailContent[0]);
                            let content = '';
                            const contentArr = /<span>(.*?)<\/span>/g.exec(detailContent[1]);
                            if (titleArr) {
                              title = titleArr[1];
                            }
                            if (contentArr) {
                              content = contentArr[1];
                            }

                            return (
                              <div
                                styleName="detail-wrap"
                                key={`detail-${idx}`}
                                onClick={() => { this.detailClick(idx); }}
                              >
                                <Icon
                                  type="close-circle"
                                  key="edit"
                                  style={{ fontSize: '14px', color: '#ff4d4f' }}
                                  onClick={() => { this.deleteDetail(idx); }}
                                />
                                <Input
                                  onChange={(e) => { this.detailChagne(item, 'title', e, idx); }}
                                  value={title}
                                />
                                <TextArea
                                  onChange={(e) => { this.detailChagne(item, 'content', e, idx); }}
                                  value={content}
                                  autoSize
                                />
                              </div>
                            );
                          }
                          // console.log(detailArr);
                          // const contentArr = /<span>(.*?)<\/span>/g.exec(item.content);
                          // console.log(contentArr);
                          // let contentStr = '';
                          // if (contentArr) {
                          //   contentStr = contentArr[1];
                          // }
                          // console.log('------');
                          // console.log(contentStr);
                          return null;
                        })
                      }
                    </div>
                  </Col>
                </Row>
              </Form.Item>
            </Form>
          </React.Fragment>
        )
    );
  }
}

export default CourseDetail;
