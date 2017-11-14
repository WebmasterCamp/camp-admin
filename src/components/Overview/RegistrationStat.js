import React from 'react';
import { Col, Row, Card } from 'antd';
import styled from 'styled-components';

const MajorCard = styled(Card)`
  text-align: center;
`;

const MajorTitle = styled.h3`
  font-size: 16px;
`;

const MajorCount = styled.h3`
  font-size: 40px;
`;

const RegistrationStat = props => {
  return (
    <div>
      <Row gutter={16} style={{ marginBottom: 20 }}>
        <Col span={6}>
          <MajorCard>
            <MajorTitle>Content</MajorTitle>
            <MajorCount>{props.stat.content}</MajorCount>
          </MajorCard>
        </Col>
        <Col span={6}>
          <MajorCard>
            <MajorTitle>Design</MajorTitle>
            <MajorCount>{props.stat.design}</MajorCount>
          </MajorCard>
        </Col>
        <Col span={6}>
          <MajorCard>
            <MajorTitle>Marketing</MajorTitle>
            <MajorCount>{props.stat.marketing}</MajorCount>
          </MajorCard>
        </Col>
        <Col span={6}>
          <MajorCard>
            <MajorTitle>Programming</MajorTitle>
            <MajorCount>{props.stat.programming}</MajorCount>
          </MajorCard>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={6}>
          <MajorCard>
            <MajorTitle>Pending</MajorTitle>
            <MajorCount>{props.stat.pending}</MajorCount>
          </MajorCard>
        </Col>
        <Col span={6}>
          <MajorCard>
            <MajorTitle>Not Confirm</MajorTitle>
            <MajorCount>{props.stat.notConfirm}</MajorCount>
          </MajorCard>
        </Col>
      </Row>
    </div>
  );
};

export default RegistrationStat;
