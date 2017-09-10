import React from 'react';
import { Link } from 'react-router-dom';
import { Table, Icon } from 'antd';
import { compose } from 'recompose';
import { Tag } from 'antd';

const columns = [{
  title: 'ID',
  dataIndex: 'id',
  key: 'id',
  width: 70,
  render: (text, item) => <Link to={`/registrant/${item.id}`}>{text.substring(0, 3)}{text.substring(text.length - 3)}</Link>,
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
},];

const RegistrantTable = props => {
  console.log(props);
  return (
    <Table {...props}
      size="middle"
      bordered 
      columns={columns} 
      dataSource={props.data} 
      locale={{ emptyText: 'No Registrant Data to display.' }}
    />
  );
}

export default RegistrantTable;
