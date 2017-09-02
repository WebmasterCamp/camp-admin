import React from 'react';
import { Table, Icon } from 'antd';
import { compose } from 'recompose';

const columns = [{
  title: 'ID',
  dataIndex: 'id',
  key: 'id',
  render: text => <p>{text}</p>,
}, {
  title: 'Status',
  dataIndex: 'status',
  key: 'status',
}, {
  title: 'Action',
  key: 'action',
  render: (text, record) => (
    <span>
      <a href="#">Action 一 {record.name}</a>
      <span className="ant-divider" />
      <a href="#">Delete</a>
      <span className="ant-divider" />
      <a href="#" className="ant-dropdown-link">
        More actions <Icon type="down" />
      </a>
    </span>
  ),
}];

const enhance = compose(
  
)

const GradingTable = props => (
  <Table bordered columns={columns} dataSource={props.data} />
);

export default enhance(GradingTable);
