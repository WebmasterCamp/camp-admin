import React from 'react';
import { connect } from 'react-redux';
import { compose, withState, withProps } from 'recompose';
import { Input as _Input, Button, Icon } from 'antd';
import styled from 'styled-components';

import { actions as interviewActions } from '../../ducks/interview';
import RegistrantProfile from '../../components/Registrant/RegistrantProfile';
import QuestionCard from '../../components/Registrant/QuestionCard';
import questions from '../grading/questions.json';
import { getPdfPath } from '../../utils/helpers';

const Title = styled.h2`
  margin-bottom: 10px;
`;

const Input = styled(_Input)`
  width: 200px;
  margin-right: 10px;
`;

const Container = styled.div`
  margin-bottom: 20px;
`;

const QuestionContainer = styled.div`
  padding: 10px 0;
`;

const enhance = compose(
  connect(
    state => ({
      isLoading: state.interview.isLoading,
      isError: state.interview.isError,
      interviewer: state.interview.interviewer,
    }),
    { ...interviewActions }
  ),
  withState('refID', 'setRefID', ''),
  withProps(
    props => ({
      onSearch: () => props.getInterviewer(props.refID.toUpperCase())
        .then(() => props.setRefID(''))
    })
  )
);

const Interviewer = props => {
  const { refID, interviewer, isLoading, isError } = props;
  return (
    <div>
      <Container>
        <Title>Search Interviewer by RefID</Title>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            props.onSearch()
          }}
        >
          <Input value={refID} onChange={e => props.setRefID(e.target.value)} placeholder="REF ID ex. D01" />
          <Button icon="search" onClick={() => props.onSearch()}>Search</Button>
        </form>
      </Container>
      {isLoading && <Icon type="loading" />}
      {!isLoading && (
        <div>
          {isError && <p>User Not found.</p>}
          {!isError && interviewer && (
            <div>
              <RegistrantProfile {...interviewer} showFacebook />
              <QuestionContainer>
                <Title>คำถามกลาง</Title>
                {interviewer.questions.generalQuestions.map((answer, idx) => (
                  <QuestionCard
                    key={answer._id}
                    question={questions.generalQuestions[idx]}
                    answer={answer.answer}
                  />
                ))}
              </QuestionContainer>
              <QuestionContainer>
                <Title>คำถามสาขา</Title>
                {interviewer.questions.specialQuestions[interviewer.major].map((answer, idx) => (
                  <QuestionCard
                    key={answer._id}
                    question={questions.specialQuestions[interviewer.major][idx]}
                    answer={answer.answer}
                  />
                ))}
                {interviewer.major === 'design' && (
                  <div>
                    <Title>Porfolio</Title>
                    {interviewer.designPortfolio ?
                      <a href={getPdfPath(interviewer.designPortfolio)} target="_blank">ดู Portfolio</a> :
                      'ไม่มี Portfolio'
                    }
                  </div>
                )}
              </QuestionContainer>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default enhance(Interviewer);
