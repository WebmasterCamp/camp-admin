import React from 'react';
import { Row, Col, Card } from 'antd';
import styled from 'styled-components';

import { majorAsText } from '../../utils/helpers';

const MajorCard = styled(Card)`
  text-align: center;
`;

const MajorTitle = styled.h3`
  font-size: 16px;
`;

const MajorCount = styled.h3`
  font-size: 40px;
`;

const toPassCount = {
  design: 1,
  programming: 3,
  content: 2,
  marketing: 1
};

const getSummation = arr => arr.reduce((prev, curr) => prev + curr, 0);

const InterviewEstimation = props => {
  const { interviewEstimation } = props;
  return (
    <div>
      <Row gutter={16}>
        {['programming', 'design', 'marketing', 'content'].map(role => (
          <Col span={6}>
            <MajorCard>
              <MajorTitle>{majorAsText(role, true)} ({toPassCount[role]})</MajorTitle>
              <MajorCount>{getSummation(interviewEstimation[role].slice(toPassCount[role]))}</MajorCount>
              {interviewEstimation[role]
                .slice(1, toPassCount[role] + 1)
                .map((count, index) => (
                  <p>{getSummation(interviewEstimation[role].slice(index))} candidates for {index} pass</p>
                ))}
            </MajorCard>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default InterviewEstimation;
