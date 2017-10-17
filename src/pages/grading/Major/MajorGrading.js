import React from 'react';
import { connect } from 'react-redux';
import { compose, lifecycle, withProps, withState } from 'recompose';
import { Input } from 'antd';
import styled from 'styled-components';

import { actions as gradingActions } from '../../../ducks/grading';
import AnswerItem from '../../../components/Grading/AnswerItem';
import { RedButton, GreenButton } from '../../../components/Core/Buttons';
import questions from '../questions.json';

const { specialQuestions } = questions;

const ActionSpan = styled.div`
  padding-top: 15px;
  > * {
    margin-right: 10px;
  }
`;

const Label = styled.p`
  font-weight: 600;
  padding-top: 10px;
`;

const NoteInput = styled(Input.TextArea)`
  margin-top: 10px;
`;

const enhance = compose(
  connect(
    state => ({
      answers: state.grading.answers,
      graderNote: state.grading.note,
      isLoadingItem: state.grading.isLoadingItem,      
    }),
    { ...gradingActions }
  ),
  withProps(
    ownProps => ({
      onPass: (pass, note) => {
        ownProps.gradeMajorItem(ownProps.major, ownProps.userId, pass, note)
          .then(() => ownProps.doneGrading())
      }
    })
  ),
  withState('note', 'setNote', ownProps => ownProps.graderNote),
  lifecycle({
    componentWillReceiveProps(nextProps) {
      if (this.props.graderNote !== nextProps.graderNote) {
        this.props.setNote(nextProps.graderNote);
      }
    }
  })
);

const MajorGrading = props => {
  const { answers, note, setNote, activities, major } = props;
  console.log(props);
  if (props.isLoadingItem) return <h1>Loading...</h1>
  return (
    <div>
      <p>ID: {props.userId}</p>
      <p><b>ชั้นปี: </b>{props.academicYear}</p>
      <p><b>คณะ: </b>{props.faculty}</p>
      <p><b>สาขา: </b>{props.department}</p>
      <p><b>สถาบัน: </b>{props.university}</p>
      {answers.map((answer, idx) => <AnswerItem answer={answer.answer} question={specialQuestions[major][idx]} key={`answer-${idx}`} isLink={major === 'design' && idx === 3} />)}
      <AnswerItem answer={activities} question="กิจกรรมที่เคยทำ" />
      <Label>Note</Label>
      <NoteInput rows={3} onChange={e => setNote(e.target.value)} value={note} />
      <ActionSpan>
        <GreenButton icon="check-circle" onClick={() => props.onPass(true, note)}>Yes</GreenButton>
        <RedButton icon="close-circle" onClick={() => props.onPass(false, note)}>Nope</RedButton>
      </ActionSpan>
    </div>
  );
};

export default enhance(MajorGrading);
