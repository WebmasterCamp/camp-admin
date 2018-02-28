import React from 'react'
import { Table } from 'antd'
import moment from 'moment'

const byDayStatColumns = [
  {
    title: 'Date (Day/Month/Year)',
    dataIndex: '_id',
    render: text => <p>{moment(text, 'YYYY-MM-DD').format('DD/MM/YYYY')}</p>,
  },
  {
    title: 'Count',
    dataIndex: 'count',
    render: text => <p>{text}</p>,
  },
]

const ByDateRegistrationStat = props => {
  const { byDayStat } = props
  return (
    <Table
      dataSource={byDayStat}
      columns={byDayStatColumns}
      bordered
      rowKey="_id"
      size="middle"
      pagination={{ defaultPageSize: 5 }}
    />
  )
}

export default ByDateRegistrationStat
