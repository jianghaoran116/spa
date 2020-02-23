import React, { Component } from 'react';
import { connect } from 'react-redux';
import Menu from './menu';
import PreLoadComponent from './pre-load-component';

// import { execHandler, setActiveKey, setImportComponent } from '../../redux/leftMenuTree/action';
import { execHandler, setActiveKey, setImportComponent } from '../components/left-menu/index-redux';

@connect(
  state => state.leftMenuTree.toJS(),
  { execHandler, setActiveKey, setImportComponent },
)
class LeftMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      keyField: 'code',
      titleField: 'name',
    };
  }

  onClick = (selectedKeys) => {
    this.props.execHandler(selectedKeys[0]);
    this.props.setActiveKey(selectedKeys[0]);
    this.props.setImportComponent(selectedKeys[0], PreLoadComponent);
  }

  render() {
    return (
      <div>
        <Menu
          trigger="click"
          defaultSelectedKeys={['']}
          titleField={this.state.titleField}
          keyField={this.state.keyField}
          dataSource={this.props.treeData}
          onSelect={this.onClick}
          id={`menu${this.props.id}`}
        />
      </div>
    );
  }
}

export default LeftMenu;
