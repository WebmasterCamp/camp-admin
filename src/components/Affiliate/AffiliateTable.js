import React from 'react';
import { Table } from 'antd';
import { compose } from 'recompose';

const columns = [{
  title: 'Site Name',
  dataIndex: 'name',
  key: 'name',
  render: text => <p>{text}</p>,
}, {
  title: 'URL',
  dataIndex: 'url',
  key: 'url',
  render: text => <a href={text} target="_blank">{text}</a>
}];

const enhance = compose(
  
)

const AffiliateTable = props => (
  <Table
    {...props}
    size="middle"
    bordered
    pagination={false}
    columns={[...columns, props.action]}
    dataSource={props.data}
    locale={{ emptyText: 'No Affiliate Data to display.' }}
  />
);

export default enhance(AffiliateTable);
