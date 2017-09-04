import React from 'react';
import { Table, Icon } from 'antd';
import { compose } from 'recompose';
import { Tag } from 'antd';
import { Progress } from 'antd';

const columns = [{
  title: 'ID',
  dataIndex: 'id',
  key: 'id',
  render: text => <p>{text}</p>,
},
{
  title: 'Fullname',
  dataIndex: 'fullname',
  key: 'fullname',
  render: text => <p>{text}</p>,
}, {
  title: 'Role',
  dataIndex: 'role',
  key: 'role',
},
{
  title: 'Progress',
  key: 'progress',
  render: (text, record) => ( 
    <span>
      <Progress percent={10}  status="active" />
    </span>
  ),
}];

const enhance = compose(
  
)

const UserTable = props => (
  <Table bordered columns={columns} dataSource={props.data} />
);

export default enhance(UserTable);
