import React from 'react';
import { connect } from 'react-redux';
import { compose, lifecycle, withProps, withState } from 'recompose';
import { Button, Input } from 'antd';
import styled from 'styled-components';

import { actions as gradingActions } from '../../../ducks/grading';
import AnswerItem from '../../../components/Grading/AnswerItem';
import { RedButton, GreenButton } from '../../../components/Core/Buttons';
import questions from '../questions.json';

const { generalQuestions } = questions;

const enhance = compose(
  connect(
    state => ({
      answers: state.grading.answers,
      graderNote: state.grading.note,
      isLoadingItem: state.grading.isLoadingItem,      
    }),
    { ...gradingActions }
  ),
  // withProps(
  //   ownProps => ({
  //     userId: ownProps.match.params.id
  //   })
  // ),
  withProps(
    ownProps => ({
      onPass: (pass, note) => {
        ownProps.gradeStageOneItem(ownProps.userId, pass, note)
          .then(() => ownProps.doneGrading())
      }
    })
  ),
  withState('note', 'setNote', ownProps => ownProps.graderNote),
  lifecycle({
    // componentDidMount() {
    //   this.props.getStageOneItem(this.props.userId);
    // },
    componentWillReceiveProps(nextProps) {
      if (this.props.graderNote !== nextProps.graderNote) {
        this.props.setNote(nextProps.graderNote);
      }
    }
  })
);

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

const StageOneGrading = props => {
  const { answers, note, setNote } = props;
  console.log(props);
  if (props.isLoadingItem) return <h1>Loading...</h1>
  return (
    <div>
      <p>ID: {props.userId}</p>
      {answers.map((answer, idx) => <AnswerItem answer={answer.answer} question={generalQuestions[idx]} />)}
      <Label>Note</Label>
      <NoteInput rows={3} onChange={e => setNote(e.target.value)} value={note} />
      <ActionSpan>
        <GreenButton icon="check-circle" onClick={() => props.onPass(true, note)}>Yes</GreenButton>
        <RedButton icon="close-circle" onClick={() => props.onPass(false, note)}>Nope</RedButton>
      </ActionSpan>
    </div>
  );
}

export default enhance(StageOneGrading);

// export default StageOneGrading;
