import React from 'react';
import { Card } from 'antd';
import styled from 'styled-components';

const CardTitle = styled.b`

`;

const QuestionCard = props => (
  <Card
    loading={props.isLoading}
    noHovering
    title={<CardTitle>{props.question}</CardTitle>}
  >
    <p>{props.answer}</p>
  </Card>
);

export default QuestionCard;
