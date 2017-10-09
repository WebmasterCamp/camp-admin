import React from 'react';
import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Card, Col, Row, Progress, Icon } from 'antd';

import { redirectIfNotLoggedIn } from '../utils/redirect';
import { actions as overviewActions } from '../ducks/overview';
import { actions as gradingActions } from '../ducks/grading';

const enhance = compose(
  redirectIfNotLoggedIn,
  connect(
    state => ({
      stat: state.overview.stat,
      gradingStat: state.grading.stat,
      isLoading: state.grading.isLoadingStat && state.overview.isLoading
    }),
    { ...overviewActions, ...gradingActions }
  ),
  lifecycle({
    componentDidMount() {
      this.props.getRegisterStat();
      this.props.loadGradingStatus();
    }
  }) 
);

const Label = styled.p`
  font-weight: bold;
  padding-top: 10px;
`;

const SectionContainer = styled.div`
  margin-bottom: 20px;
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

const GradingStatusCol = styled(Col)`
  text-align: center;
`;

const GradingStatusRow = styled(Row)`
  margin-bottom: 30px;
`;

const getPercentage = stat => stat.graded * 100/stat.all;
const getText = stat => `${stat.graded}/${stat.all}`

const Overview = props => {
  if (props.isLoading) return <Icon type="loading" />
  const { gradingStat } = props;
  const { stageOne, stageTwo, programming, design, marketing, content } = gradingStat;
  console.log(gradingStat);
  return (
    <div>
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
      <SectionContainer>
        <SectionTitle>Grading Status</SectionTitle>
        <GradingStatusRow gutter={16}>
          <GradingStatusCol span={12}>
            <Progress
              type="circle"
              percent={getPercentage(stageOne)}
              format={() => getText(stageOne)}
            />
            <Label>Stage One</Label>
          </GradingStatusCol>
          <GradingStatusCol span={12}>
            <Progress
              type="circle"
              percent={getPercentage(stageTwo)}
              format={() => getText(stageTwo)}
            />
            <Label>Stage Two</Label>
          </GradingStatusCol>
        </GradingStatusRow>
        <GradingStatusRow gutter={16}>
          <GradingStatusCol span={6}>
            <Progress
              type="circle"
              percent={getPercentage(programming)}
              format={() => getText(programming)}
            />
            <Label>Programming</Label>
          </GradingStatusCol>
          <GradingStatusCol span={6}>
            <Progress
              type="circle"
              percent={getPercentage(design)}
              format={() => getText(design)}
            />
            <Label>Design</Label>
          </GradingStatusCol>
          <GradingStatusCol span={6}>
            <Progress
              type="circle"
              percent={getPercentage(marketing)}
              format={() => getText(marketing)}
            />
            <Label>Marketing</Label>
          </GradingStatusCol>
          <GradingStatusCol span={6}>
            <Progress
              type="circle"
              percent={getPercentage(content)}
              format={() => getText(content)}
            />
            <Label>Content</Label>
          </GradingStatusCol>
        </GradingStatusRow>
      </SectionContainer>
    </div>
  );
}

export default enhance(Overview);
