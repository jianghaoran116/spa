/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Skeleton,
  Table,
  Button,
  Modal,
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
    this.setState({
      visible: true,
    });
  }

  handleOk = () => {
    this.setState({
      visible: false,
    });
  }

  handleCancel = () => {
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
                          type="primary"
                          onClick={() => this.updateCourse(record)}
                        >
                          编辑
                        </Button>
                        {/* <Button type="danger">删除</Button> */}
                      </React.Fragment>
                    ),
                  },
                ]
              }
              dataSource={this.props.courseList}
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
