import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 15px 0;
  border-bottom: 1px solid #ddd;
`;

const Question = styled.h3`
  font-weight: 600;
`;

const Answer = styled.h2`

`;

const AnswerItem = props => (
  <Container>
    <Question>{props.question}</Question>
    <Answer>{props.answer}</Answer>
  </Container>
);

export default AnswerItem;
