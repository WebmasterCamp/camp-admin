import React from 'react';
import { connect } from 'react-redux';
import { compose, lifecycle, withProps, withState } from 'recompose';
import { Button, Input } from 'antd';
import styled from 'styled-components';
import { push } from 'react-router-redux';

import { actions as gradingActions } from '../../../ducks/grading';
import AnswerItem from '../../../components/Grading/AnswerItem';
import questions from '../questions.json';

const { generalQuestions } = questions;

const enhance = compose(
  connect(
    state => ({
      answers: state.grading.answers,
      graderNote: state.grading.note
    }),
    { ...gradingActions, push }
  ),
  withProps(
    ownProps => ({
      userId: ownProps.match.params.id
    })
  ),
  withProps(
    ownProps => ({
      onPass: (pass, note) => {
        ownProps.gradeStageOneItem(ownProps.userId, pass, note)
          .then(() => ownProps.push('/grading'))
      }
    })
  ),
  withState('note', 'setNote', ''),
  lifecycle({
    componentDidMount() {
      this.props.getStageOneItem(this.props.userId);
    },
    componentWillReceiveProps(nextProps) {
      if (!this.props.graderNote && nextProps.graderNote) {
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

const NoteInput = styled(Input)`
  margin-top: 10px;
`;

const StageOneGrading = props => {
  const { answers, note, setNote } = props;
  console.log(props);
  return (
    <div>
      <h1>ID: {props.match.params.id}</h1>
      {answers.map((answer, idx) => <AnswerItem answer={answer.answer} question={generalQuestions[idx]} />)}
      <Label>Note</Label>
      <NoteInput onChange={e => setNote(e.target.value)} value={note} />
      <ActionSpan>
        <Button type="primary" icon="check-circle" onClick={() => props.onPass(true, note)}>Yes</Button>
        <Button type="danger" icon="close-circle" onClick={() => props.onPass(false, note)}>Nope</Button>
      </ActionSpan>
    </div>
  );
}

export default enhance(StageOneGrading);
