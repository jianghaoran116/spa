/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Skeleton,
  Table,
  Button,
  Modal,
  message,
  Popconfirm,
} from 'antd';
import CourseDetail from '../detail';
import * as actions from './index-redux';
import * as detailActions from '../detail/index-redux';
// import './index.styl';

@connect(
  state => ({
    ...state.Course.list,
    ...state.Course.detail,
  }), {
    ...actions,
    ...detailActions,
  },
)
class CourseList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
    };

    this.props.getCourseListTask()
      .then((data) => {
        this.props.loadCoursePage(false);
        this.props.setCourseList(data);
      })
      .catch(err => console.log(err));
  }

  updateCourse = (record) => {
    if (record.teachers) {
      record.teachers.forEach(item => item.key = item.id);
    }
    this.props.setOriginalCourseDetail({ ...record });
    this.props.setCourseDetail({ ...record });
    this.props.setSummary([...(record.summary)]);
    this.props.setDetail([...(record.detail)]);
    this.setState({
      visible: true,
    });
  }

  handleOk = async () => {
    const data = await this.props.updateDetail();
    if (data.status === 200) {
      this.setState({
        visible: false,
      });
      this.props.getCourseListTask()
        .then((res) => {
          this.props.loadCoursePage(false);
          this.props.setCourseList(res);
        })
        .catch(err => console.log(err));
    } else {
      message.error(data.message);
    }
  }

  deleteCourse = async (id) => {
    const data = await this.props.deleteCourse(id);
    if (data.status === 200) {
      this.setState({
        visible: false,
      });
      this.props.getCourseListTask()
        .then((res) => {
          this.props.loadCoursePage(false);
          this.props.setCourseList(res);
        })
        .catch(err => console.log(err));
    } else {
      message.error(data.message);
    }
  }

  handleCancel = () => {
    this.props.setCourseDetail({});
    this.setState({
      visible: false,
    });
  }

  render() {
    return (
      this.props.loading
        ? <Skeleton active />
        : (
          <React.Fragment>
            <div>
              课程列表

              <Button
                style={{ float: 'right' }}
                type="primary"
                onClick={() => this.updateCourse({ summary: [], detail: [] })}
              >
                添加课程
              </Button>
            </div>
            <Table
              rowKey="id"
              columns={
                [
                  {
                    title: '课程名称',
                    dataIndex: 'name',
                    key: 'name',
                    render: text => (
                      <span>{text}</span>
                    ),
                  },
                  {
                    title: '',
                    dataIndex: 'cover',
                    key: 'cover',
                    render: (item, record) => (
                      <img style={{ width: '160px' }} src={item} alt={record.name} />
                    ),
                  },
                  {
                    title: '等级',
                    dataIndex: 'level',
                    key: 'level',
                    render: text => (
                      <span>{text}</span>
                    ),
                  },
                  {
                    title: '类型',
                    dataIndex: 'type',
                    key: 'type',
                    render: text => (
                      <span>{text}</span>
                    ),
                  },
                  {
                    title: '操作',
                    width: 260,
                    dataIndex: 'id',
                    key: 'id',
                    render: (item, record) => (
                      <React.Fragment>
                        <Button
                          style={{ margin: '0 20px 0 0' }}
                          type="primary"
                          onClick={() => this.updateCourse(record)}
                        >
                          编辑
                        </Button>
                        <Popconfirm
                          title="确定要删除吗?"
                          onConfirm={() => this.deleteCourse(record.id)}
                          okText="Yes"
                          cancelText="No"
                        >
                          <Button
                            type="danger"
                          >
                            删除
                          </Button>
                        </Popconfirm>
                      </React.Fragment>
                    ),
                  },
                ]
              }
              dataSource={this.props.courseList}
              pagination={false}
            />
            <Modal
              title="课程详情"
              width={1200}
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
            >
              <CourseDetail />
            </Modal>
          </React.Fragment>
        )
    );
  }
}

export default CourseList;
