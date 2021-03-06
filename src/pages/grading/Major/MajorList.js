import React from 'react';
import { connect } from 'react-redux';
import { compose, withProps, withState, lifecycle } from 'recompose';
import { Table, Tag, Col, Row, Radio, Progress } from 'antd';
import _ from 'lodash';
import styled from 'styled-components';

import { actions as gradingActions } from '../../../ducks/grading';
import MajorGrading from './MajorGrading';

const enhance = compose(
  connect(
    state => ({
      user: state.auth.user,
      lists: state.grading.lists,
      isLoadingList: state.grading.isLoadingList,
      isLoadingItem: state.grading.isLoadingItem,
      answers: state.grading.answers,
      graderNote: state.grading.note,
      activities: state.grading.activities,
      academicYear: state.grading.academicYear,
      faculty: state.grading.faculty,
      department: state.grading.department,
      university: state.grading.university,
      candidateCount: state.grading.candidateCount
    }),
    {...gradingActions}
  ),
  withState('currentId', 'setCurrentId', ''),
  withState('filter', 'setFilter', 'off'),
  withProps(
    ownProps => ({
      lists: ownProps.lists
        .map((item) => ({
          key: item._id,
          id: item._id,
          status: _.isEmpty(item.questions.stageThree) ? '-' : item.questions.stageThree.isPass ? 'Pass' : 'Fail',
          note: _.isEmpty(item.questions.stageThree) ? '' : item.questions.stageThree.note
        }))
        .filter(item => {
          if (ownProps.filter === 'off') return true;
          return item.status === ownProps.filter
        }),
      loadGradingItem: id => ownProps.getMajorItem(ownProps.user.role, id).then(() => ownProps.setCurrentId(id)),
      getCandidateCount: () => ownProps.getCandidateCount(ownProps.user.role),
      gradedCount: ownProps.lists.filter(item => !_.isEmpty(item.questions.stageThree)).length,
      allCount: ownProps.lists.length
    })
  ),
  lifecycle({
    componentDidMount() {
      this.props.getMajorList(this.props.user.role);
      this.props.getCandidateCount();
    }
  })
);

const columns = props => [{
  title: 'ID',
  dataIndex: 'id',
  key: 'id',
  width: '100px',
  render: (text, item, idx) => <a onClick={() => props.loadGradingItem(item.id)}>{text.substring(text.length - 5)}</a>,
}, {
  title: 'Status',
  dataIndex: 'status',
  key: 'status',
  width: '100px',  
  render: (text, record) => {
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

const CandidateTitle = styled.h2`
  margin-bottom: 10px;
`;

const CandidateCount = styled.span`
  ${props => props.exceed && `color: red; font-weight: bold;`}
`;

const Label = styled.div`
  margin-bottom: 5px;
  font-weight: bold;
`;

const FilterContainer = styled.div`
  margin-bottom: 10px;
  font-size: 14px;
`;

const ProgressContainer = styled.div`
  margin-bottom: 10px;
  ${CandidateTitle} {
    margin-bottom: 5px;
  }
`;

const MajorList = props => {
  return (
    <div>
      <h1>Grading</h1>
      <CandidateTitle>Pass: <CandidateCount exceed={props.candidateCount > 60}>{props.candidateCount}</CandidateCount>/60</CandidateTitle>
      <ProgressContainer>
        <Row>
          <Col span={8}>
            <CandidateTitle>Grading Progress</CandidateTitle>
            <Progress percent={(props.gradedCount / props.allCount) * 100} format={() => `${props.gradedCount}/${props.allCount}`} />
          </Col>
        </Row>
      </ProgressContainer>
      <FilterContainer>
        <Label>Filter</Label>
        <Radio.Group onChange={e => props.setFilter(e.target.value)} value={props.filter}>
          <Radio.Button value="Pass">Pass</Radio.Button>
          <Radio.Button value="Fail">Nope</Radio.Button>
          <Radio.Button value="-">Not Graded</Radio.Button>
          <Radio.Button value="off">Off</Radio.Button>
        </Radio.Group>
      </FilterContainer>
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
              <MajorGrading
                major={props.user.role}
                userId={props.currentId}
                answers={props.answers}
                activities={props.activities}
                doneGrading={() => props.getMajorList(props.user.role).then(() => props.getCandidateCount()).then(() => props.setCurrentId(''))}
                academicYear={props.academicYear}
                faculty={props.faculty}
                department={props.department}
                university={props.university}
              />
            </GradingContainer>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default enhance(MajorList);
