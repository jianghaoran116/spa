import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Skeleton,
  Form,
  Input,
  Button,
  Icon,
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

    const { teacherDescription } = this.props;

    return (
      this.props.loading
        ? <Skeleton active />
        : (
          <React.Fragment>
            <Form {...formItemLayout}>
              <Form.Item label="姓名">
                <Input />
              </Form.Item>
              <Form.Item label="简介">
                {
                  teacherDescription.length > 0
                    ? teacherDescription.map((item, idx) => (
                      <div
                        key={item.content ? item.content : idx}
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
