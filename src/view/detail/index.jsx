/**
 * @file 详情页
 * @author haoran
 */

import React, { Component } from 'react';
import {
  List,
  Checkbox,
  Flex,
  Picker,
} from 'antd-mobile';

const { CheckboxItem, AgreeItem } = Checkbox;

class Detail extends Component {
  onChange = (val) => {
    console.log(val);
  }

  render() {
    const data = [
      { value: 0, label: 'Ph.D.' },
      { value: 1, label: 'Bachelor' },
      { value: 2, label: 'College diploma' },
    ];
    return (
      <div>
        <p style={{ fontSize: '24px' }}>Detail123</p>
        <Picker
          data={[
            [
              {
                label: '2013',
                value: '2013',
              },
              {
                label: '2014',
                value: '2014',
              },
            ],
            [
              {
                label: '春',
                value: '春',
              },
              {
                label: '夏',
                value: '夏',
              },
            ],
          ]}
          title="选择季节"
          cascade={false}
          extra="请选择(可选)"
          // value={this.state.sValue}
          // onChange={v => this.setState({ sValue: v })}
          // onOk={v => this.setState({ sValue: v })}
        >
          <List.Item arrow="horizontal">Multiple</List.Item>
        </Picker>
        <List renderHeader={() => 'Detail Form eg'}>
          {data.map(i => (
            <CheckboxItem key={i.value} onChange={() => this.onChange(i.value)}>
              {i.label}
            </CheckboxItem>
          ))}
          <CheckboxItem key="disabled" data-seed="logId" disabled defaultChecked multipleLine>
            Undergraduate
            <List.Item.Brief>Auxiliary text</List.Item.Brief>
          </CheckboxItem>
        </List>

        <Flex>
          <Flex.Item>
            <AgreeItem data-seed="logId" onChange={e => console.log('checkbox', e)}>
              Agree
            </AgreeItem>
          </Flex.Item>
        </Flex>
      </div>
    );
  }
}

export default Detail;
