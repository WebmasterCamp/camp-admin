import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { compose, lifecycle, withProps, withState } from 'recompose';
import _ from 'lodash'
import { Table, Tag, Col, Row } from 'antd';
import styled from 'styled-components';

import StageOneGrading from './StageOneGrading';
import { actions as gradingActions } from '../../../ducks/grading';

const enhance = compose(
  connect(
    state => ({
      isLoadingList: state.grading.isLoadingList,
      lists: state.grading.lists,
      answers: state.grading.answers,
      graderNote: state.grading.note
    }),
    { ...gradingActions }
  ),
  withState('currentId', 'setCurrentId', ''),
  withProps(
    ownProps => ({
      lists: ownProps.lists.map((item) => ({
        key: item._id,
        id: item._id,
        status: _.isEmpty(item.questions.stageOne) ? '-' : item.questions.stageOne.isPass ? 'Pass' : 'Fail',
        note: _.isEmpty(item.questions.stageOne) ? '-' : item.questions.stageOne.note
      })),
      loadGradingItem: id => ownProps.getStageOneItem(id).then(() => ownProps.setCurrentId(id))
    })
  ),
  lifecycle({
    componentDidMount() {
      this.props.getStageOneList();
    }
  })
);

const columns = props => [{
  title: 'ID',
  dataIndex: 'id',
  key: 'id',
  width: '100px',
  render: (text, item) => <a onClick={() => props.loadGradingItem(item.id)}>{text.substring(text.length - 5)}</a>,
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
  render: text => <p>{text.substring(0, 10)}{text.substring(0, 10).length === 0 ? '' : '...'}</p>
}];

const GradingContainer = styled.div`
  max-height: 800px;
  overflow-y: scroll;
  border: 1px solid #d3d3d3;
  border-radius: 5px;
  padding: 15px 20px;
`;

const StageOneList = props => (
  <div>
    <h1>Grading</h1>
    <Row gutter={16}>
      <Col span={8}>
        <Table
          loading={props.isLoadingList}
          size="middle"
          bordered
          columns={columns(props)}
          dataSource={props.lists}
          locale={{ emptyText: 'No Data.' }}
        />
      </Col>
      <Col span={16}>
        {props.currentId && !props.isLoadingItem && (
          <GradingContainer>
            <StageOneGrading
              userId={props.currentId}
              answers={props.answers}
              doneGrading={() => props.getStageOneList().then(() => props.setCurrentId(''))}
            />
          </GradingContainer>
        )}
        {props.isLoadingItem && (
          <h1>Loading...</h1>
        )}
      </Col>
    </Row>
    
  </div>
);

export default enhance(StageOneList);
