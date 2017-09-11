import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  border: 1px solid #d8d8d8;
  border-radius: 5px;
  margin-bottom: 20px;
`;

const CardTitle = styled.div`
  padding: 15px;
  border-bottom: 1px solid #d8d8d8;
  >h3 {
    font-weight: 600;
  }
`;

const CardContent = styled.div`
  padding: 15px;
`;

const QuestionCard = props => (
  <Card>
    <CardTitle>
      <h3>{props.question}</h3>
    </CardTitle>
    <CardContent>
      <h3>{props.answer}</h3>
    </CardContent>
  </Card>
);

export default QuestionCard;
