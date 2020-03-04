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
  Popconfirm,
  Pagination,
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

  queryTeacherList = () => {
    this.props.loadTeacherPage(true);
    this.props.getTeacherListTask()
      .then((data) => {
        this.props.loadTeacherPage(false);
        this.props.setTeacherList(data);
      })
      .catch(err => console.log(err));
  }

  addTecher = () => {
    this.props.setTeacherDetail({});
    this.props.initTeacherData();
    this.setState({
      visible: true,
    });
  }

  handleOk = async () => {
    const data = await this.props.updateTeacherDetailTask();

    if (data.status === 200) {
      this.queryTeacherList();
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

  updateTeacher = (obj) => {
    this.props.setTeacherDetail(obj);
    this.props.initTeacherData();
    this.setState({
      visible: true,
    });
  }

  onPopCancel = () => {

  }

  onPopConfirm = async (id) => {
    try {
      await this.props.deleteTeacherTask(id);
      message.success('删除成功');
      this.queryTeacherList();
    } catch (err) {
      console.log(err);
    }
  }

  onPageChange = (page, pageSize) => {
    console.log(page, pageSize);
    this.props.setLimit(page);
    this.props.setOffset(pageSize);

    this.queryTeacherList();
  }

  onPageSizeChange = (current, size) => {
    console.log(current, size);
    this.props.setLimit(current);
    this.props.setOffset(size);

    this.queryTeacherList();
  }

  render() {
    const { total, limit, offset } = this.props;

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
                    onClick={() => this.addTecher()}
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
                        <Icon type="edit" key="edit" onClick={() => { this.updateTeacher(item); }} />,
                        <Popconfirm
                          title={`确定要删除老师 ${item.name} 吗?`}
                          okText="确定"
                          cancelText="取消"
                          onCancel={() => { this.onPopCancel(); }}
                          onConfirm={() => { this.onPopConfirm(item.id); }}
                        >
                          <Icon type="delete" key="delete" />
                        </Popconfirm>,
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
            <div style={{ textAlign: 'right' }}>
              <Pagination
                total={total}
                current={limit}
                pageSize={offset}
                showSizeChanger
                showQuickJumper
                onChange={(page, pageSize) => { this.onPageChange(page, pageSize); }}
                onShowSizeChange={(current, size) => { this.onPageSizeChange(current, size); }}
              />
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
