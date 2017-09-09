import React from 'react';
import { Table, Icon } from 'antd';
import { compose } from 'recompose';
import { Tag } from 'antd';

const columns = [{
  title: 'ID',
  dataIndex: 'id',
  key: 'id',
  render: text => <p>{text}</p>,
},
{
  title: 'Facebook ID',
  dataIndex: 'facebook',
  key: 'facebook',
  render: text => <p>{text}</p>,
},
{
  title: 'Fullname',
  dataIndex: 'fullname',
  key: 'fullname',
  render: text => <p>{text}</p>,
}, {
  title: 'Email',
  dataIndex: 'email',
  key: 'email',
},
{
  title: 'Status',
  key: 'status',
  render: (text, record) => ( 
    <span>
      <Tag color="#87d068">Done</Tag>
    </span>
  ),
},
   {
  title: 'Action',
  key: 'action',
  render: (text, record) => (
    <span>
      <a href="/registrant/">Detail</a>
    </span>
    // <span>
    //   <a href="#">Action 一 {record.name}</a>
    //   <span className="ant-divider" />
    //   <a href="#">Delete</a>
    //   <span className="ant-divider" />
    //   <a href="#" className="ant-dropdown-link">
    //     More actions <Icon type="down" />
    //   </a>
    // </span>
  ),
}];

const enhance = compose(
  
)

const RegistrantTable = props => (
  <Table {...props} 
    size="middle"
    bordered 
    columns={columns} 
    dataSource={props.data} 
    locale={{ emptyText: 'No Registrant Data to display.' }}/>
);

export default enhance(RegistrantTable);
