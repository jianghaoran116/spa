import React from 'react';
import { Menu } from 'antd';

const { SubMenu } = Menu;
const MenuItem = Menu.Item;

class MenuControl extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mode: props.mode || 'inline',
      theme: props.theme || 'dark',
      dataSource: props.dataSource || [],
      keyField: props.keyField,
      titleField: props.titleField,
      // id: props.id,
      // trigger: props.trigger || 'hover',
      // selectedKeys: props.selectedKeys || '',
    };
    this.subData = [];
  }

  onOpenChange = () => {
  }

  onMenuClick(item) {
    const selectedKeys = [];
    selectedKeys.push(item.key);
    if (this.props.onSelect) {
      this.props.onSelect(selectedKeys, item);
    }
  }

  loopMenu(dataSource) {
    const { keyField, titleField } = this.state;
    const menuData = [];
    const subMenuProps = {};

    if (dataSource.length > 0) {
      dataSource.forEach((element) => {
        const title = <span>{element[titleField]}</span>;
        let ele;
        if (element.children) {
          const subMenuData = this.loopSubMenu(element.children);
          ele = (
            <SubMenu
              {...subMenuProps}
              data={element}
              key={element[keyField]}
              title={title}
            >
              {subMenuData}
            </SubMenu>
          );
        } else {
          ele = (
            <MenuItem
              data={element}
              key={element[keyField]}
            >
              {title}
            </MenuItem>
          );
        }
        menuData.push(ele);
      }, this);
      return menuData;
    }
    return '';
  }

  loopSubMenu(dataSource) {
    const { keyField, titleField } = this.state;
    const menuData = [];

    if (dataSource.length > 0) {
      dataSource.forEach((element) => {
        let ele;
        if (element.children) {
          const subMenuData = this.loopSubMenu(element.children);
          const className = `menu-group-cols-${(element.cols || 3)}`;
          ele = (
            <SubMenu
              className={className}
              // data={element}
              key={element[keyField]}
              title={element[titleField]}
            >
              {subMenuData}
            </SubMenu>
          );
        } else {
          ele = (
            <MenuItem
              data={element}
              key={element[keyField]}
              disabled={element.disabled}
              title={element[titleField]}
            >
              {element[titleField]}
            </MenuItem>
          );
        }
        menuData.push(ele);
      }, this);
      return menuData;
    }
    return '';
  }

  render() {
    const subMenuNodes = this.loopMenu(this.state.dataSource);

    return (
      <Menu
        onOpenChange={this.onOpenChange}
        defaultSelectedKeys={this.props.defaultSelectedKeys}
        theme={this.state.theme}
        onClick={(item, key, keyPath) => this.onMenuClick(item, key, keyPath)}
        mode={this.state.mode}
      >
        {subMenuNodes}
      </Menu>
    );
  }
}
export default MenuControl;
