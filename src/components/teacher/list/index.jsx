import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Skeleton,
  Table,
  Button,
  Modal,
  Row,
  Col,
} from 'antd';
import TeacherDetail from '../detail';
import * as actions from './index-redux';
// import './index.styl';

@connect(
  state => ({
    ...state.Teacher.list,
  }), {
    ...actions,
  },
)
class TeacherList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
    };

    this.props.getTeacherListTask()
      .then((data) => {
        this.props.loadTeacherPage(false);
        this.props.setTeacherList(data);
      })
      .catch(err => console.log(err));
  }

  updateTecher = (record) => {
    this.props.setSelectedTeacher(record);
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
            <Row gutter={[16, 16]}>
              <Col className="gutter-row" span={6}>
                <div className="gutter-box">
                  <p>教师列表</p>
                </div>
              </Col>
              <Col className="gutter-row" span={6} />
              <Col className="gutter-row" span={6} />
              <Col className="gutter-row" span={6}>
                <div className="gutter-box" style={{ textAlign: 'right' }}>
                  <Button
                    type="primary"
                    onClick={() => this.updateTecher()}
                  >
                    新增
                  </Button>
                </div>
              </Col>
            </Row>
            <Table
              rowKey="id"
              columns={
                [
                  {
                    title: '教师名称',
                    dataIndex: 'name',
                    key: 'name',
                    render: text => (
                      <span>{text}</span>
                    ),
                  },
                ]
              }
              dataSource={this.props.teacherList}
            />
            <Modal
              title="教师详情"
              width={1200}
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
            >
              <TeacherDetail />
            </Modal>
          </React.Fragment>
        )
    );
  }
}

export default TeacherList;
