import React from 'react';
import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Card, Col, Row } from 'antd';

import { redirectIfNotLoggedIn } from '../utils/redirect';
import { actions as overviewActions } from '../ducks/overview';

const enhance = compose(
  redirectIfNotLoggedIn,
  connect(
    state => ({
      stat: state.overview.stat
    }),
    { ...overviewActions }
  ),
  lifecycle({
    componentDidMount() {
      this.props.getRegisterStat();
    }
  }) 
);

const OverviewTitle = styled.h1`
  margin-bottom: 10px;
`;

const SectionContainer = styled.div`

`;

const SectionTitle = styled.h2`
  margin-bottom: 10px;
`;

const MajorCard = styled(Card)`
  text-align: center;
`;

const MajorTitle = styled.h3`
  font-size: 16px;
`;

const MajorCount = styled.h3`
  font-size: 40px;
`;

const Overview = props => (
  <div>
    <OverviewTitle>Overview</OverviewTitle>
    <SectionContainer>
      <SectionTitle>Register Statatistics</SectionTitle>
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
    </SectionContainer>
  </div>
);

export default enhance(Overview);
