import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { compose, lifecycle, withProps } from 'recompose';
import { Table, Icon, Button } from 'antd';

import { actions as gradingActions } from '../../../ducks/grading';

const enhance = compose(
  connect(
    state => ({
      isLoadingList: state.grading.isLoadingList,
      lists: state.grading.lists
    }),
    { ...gradingActions }
  ),
  withProps(
    ownProps => ({
      lists: ownProps.lists.map((item) => ({
        key: item._id,
        id: item._id,
        status: item.questions.stageOne
      }))
    })
  ),
  lifecycle({
    componentDidMount() {
      this.props.getStageOneList();
    }
  })
);

const columns = [{
  title: 'ID',
  dataIndex: 'id',
  key: 'id',
  render: (text, item) => <Link to={`/grading/${item.id}`}>{text.substring(text.length - 5)}</Link>,
}, {
  title: 'Status',
  dataIndex: 'status',
  key: 'status',
  render: (text, item) => (
    <p>Status</p>
  )
}, {
  title: 'Action',
  key: 'action',
  render: (text, item) => (
    <span>
      
    </span>
  )
}];
const StageOneList = props => (
  <div>
    <h1>Grading</h1>
    <Table
      size="middle"
      bordered
      pagination={false}
      columns={columns}
      dataSource={props.lists}
      locale={{ emptyText: 'No Data.' }}
    />
  </div>
);

export default enhance(StageOneList);
