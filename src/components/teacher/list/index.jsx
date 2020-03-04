import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Skeleton,
  // Table,
  Button,
  Modal,
  Row,
  Col,
  message,
  Card,
  Avatar,
  Icon,
} from 'antd';
import TeacherDetail from '../detail';
import * as listActions from './index-redux';
import * as detailActions from '../detail/index-redux';
import './index.styl';

const { Meta } = Card;

@connect(
  state => ({
    ...state.Teacher.list,
    ...state.Teacher.detail,
  }), {
    ...listActions,
    ...detailActions,
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

  handleOk = async () => {
    const data = await this.props.updateTeacherDetailTask();

    if (data.status === 200) {
      this.setState({
        visible: false,
      });
    } else {
      message.error(data.msg ? data.msg : '保存失败');
    }
  }

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  }

  editTeacher = (obj) => {
    this.props.setTeacherDetail(obj);
    this.props.initTeacherData();
    this.setState({
      visible: true,
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
            <div styleName="list-wrap">
              {
                this.props.teacherList.map(item => (
                  <div
                    key={item.id}
                  >
                    <Card
                      actions={[
                        <Icon type="edit" key="edit" onClick={() => { this.editTeacher(item); }} />,
                        <Icon type="delete" key="delete" />,
                      ]}
                    >
                      <Meta
                        avatar={
                          <Avatar src={item.icon ? item.icon : ''} />
                        }
                        title={item.name ? item.name : ''}
                        description={item.description[0] && item.description[0].content ? item.description[0].content : ''}
                      />
                    </Card>
                  </div>
                ))
              }
              <div />
            </div>
            {/* <Table
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
            /> */}
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
