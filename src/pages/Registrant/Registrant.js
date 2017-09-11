import React from 'react';
import { compose, withProps, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import { Tabs, Icon } from 'antd';
import styled from 'styled-components';

import { actions as registrantActions } from '../../ducks/registrant';
import RegistrantProfile from '../../components/Registrant/RegistrantProfile';
import QuestionCard from '../../components/Registrant/QuestionCard';
import questions from '../grading/questions.json';
import { majorAsText, getPdfPath } from '../../utils/helpers';

const TabPane = Tabs.TabPane;
const { generalQuestions, specialQuestions } = questions;

const enhance = compose(
  connect(
    state => ({
      registrant: state.registrant.registrant,
      isLoading: state.registrant.isRegistrantLoading
    }),
    { ...registrantActions }
  ),
  withProps(
    ownProps => ({
      userId: ownProps.match.params.id,
      completedMajor: ownProps.registrant.major
    })
  ),
  lifecycle({
    componentDidMount() {
      this.props.getRegistrant(this.props.userId);
    }
  })
);

const MajorTitle = styled.h2`
  margin-bottom: 15px;
`;

const Registrant = props => {
  const { isLoading, completedMajor } = props;
  if (isLoading) return <Icon type="loading" />;
  const { generalQuestions: generalAnswers, specialQuestions: majorAnswers } = props.registrant.questions;
  return (
    <div>
      <Tabs>
        <TabPane tab="Profile" key="1">
          <RegistrantProfile {...props.registrant} loading={props.isLoading} />
        </TabPane>
        <TabPane tab="คำถามทั่วไป" key="2">
          {generalAnswers.map((answer, idx) => (
            <QuestionCard key={answer._id} question={generalQuestions[idx]} answer={answer.answer} loading={props.isLoading} />
          ))}
          {generalAnswers.length === 0 && <h2>ยังไม่ได้ตอบคำถามส่วนกลาง</h2>}
        </TabPane>
        <TabPane tab="คำถามสาขา" key="3">
          {completedMajor && <MajorTitle>{majorAsText(completedMajor)}</MajorTitle>}
          {completedMajor && majorAnswers[completedMajor].map((answer, idx) => (
            <QuestionCard key={answer._id} question={specialQuestions[completedMajor][idx]} answer={answer.answer} loading={props.isLoading} />
          ))}
          {completedMajor === 'design' && (
            <div>
              <h2>Porfolio</h2>
              {props.registrant.designPortfolio ?
                <a href={getPdfPath(props.registrant.designPortfolio)} target="_blank">ดู Portfolio</a> :
                'ไม่มี Portfolio'
              }
            </div>
          )}
          {!completedMajor && <h2>ยังไม่ได้ตอบคำถามสาขา</h2>}
        </TabPane>
      </Tabs>
    </div>
  );
};

export default enhance(Registrant);
