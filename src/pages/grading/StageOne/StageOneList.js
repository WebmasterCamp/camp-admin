import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { compose, lifecycle, withProps } from 'recompose';
import _ from 'lodash'
import { Table, Tag } from 'antd';

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
        status: _.isEmpty(item.questions.stageOne) ? '-' : item.questions.stageOne.isPass ? 'Pass' : 'Fail',
        note: _.isEmpty(item.questions.stageOne) ? '-' : item.questions.stageOne.note
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
  width: '100px',
  render: (text, item) => <Link to={`/grading/${item.id}`}>{text.substring(text.length - 5)}</Link>,
}, {
  title: 'Status',
  dataIndex: 'status',
  key: 'status',
  width: '100px',  
  render: (text) => {
    if (text === 'Pass') {
      return <Tag color="#87d068">Pass</Tag>;
    }
    if (text === 'Fail') {
      return <Tag color="#f50">Nope</Tag>
    }
    return <p>-</p>
  }
}, {
  title: 'Note',
  dataIndex: 'note',
  key: 'note',
  render: text => <p>{text}</p>
}];

const StageOneList = props => (
  <div>
    <h1>Grading</h1>
    <Table
      loading={props.isLoadingList}
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
