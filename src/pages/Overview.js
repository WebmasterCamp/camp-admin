import React from 'react';
import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Card, Col, Row, Progress, Icon, Table } from 'antd';
import moment from 'moment';

import { redirectIfNotLoggedIn } from '../utils/redirect';
import { actions as overviewActions } from '../ducks/overview';
import { actions as gradingActions } from '../ducks/grading';

const enhance = compose(
  redirectIfNotLoggedIn,
  connect(
    state => ({
      stat: state.overview.stat,
      gradingStat: state.grading.stat,
      byDayStat: state.overview.byDayStat,
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

const StageTitle = styled.h3`
  margin-bottom: 15px;
`;

const byDayStatColumns = [
  {
    title: 'Date (Day/Month/Year)',
    dataIndex: '_id',
    render: text => <p>{moment(text, 'YYYY-MM-DD').format('DD/MM/YYYY')}</p>
  },
  {
    title: 'Count',
    dataIndex: 'count',
    render: text => <p>{text}</p>
  },
]

const getPercentage = (stat, key) => (key ? stat.graded[key] : stat.graded) * 100/stat.all;
const getText = (stat, key) => `${key ? stat.graded[key] : stat.graded}/${stat.all}`

const Overview = props => {
  if (props.isLoading) return <Icon type="loading" />
  const { gradingStat, byDayStat } = props;
  const { stageOne, stageTwo, programming, design, marketing, content } = gradingStat;
  return (
    <div>
      <SectionContainer>
        <SectionTitle>Register Statatistics</SectionTitle>
        <Table
          dataSource={byDayStat}
          columns={byDayStatColumns}
          bordered
          rowKey="_id"
          size="middle"
          pagination={{ defaultPageSize: 5 }}
        />
      </SectionContainer>
      <SectionContainer>
        <SectionTitle>By Registrant Status</SectionTitle>
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
        <StageTitle>Stage One</StageTitle>
        <GradingStatusRow gutter={16}>
          {Object.keys(stageOne.graded).map(grader => (
            <GradingStatusCol key={grader} span={6}>
              <Progress
                type="circle"
                percent={getPercentage(stageOne, grader)}
                format={() => getText(stageOne, grader)}
              />
              <Label>{grader}</Label>
            </GradingStatusCol>
          ))}
        </GradingStatusRow>
        <StageTitle>Stage Two</StageTitle>
        <GradingStatusRow gutter={16}>
          <GradingStatusCol span={6}>
            <Progress
              type="circle"
              percent={getPercentage(stageTwo)}
              format={() => getText(stageTwo)}
            />
            <Label>Stage Two</Label>
          </GradingStatusCol>
        </GradingStatusRow>
        <StageTitle>Programming</StageTitle>
        <GradingStatusRow gutter={16}>
          {Object.keys(programming.graded).map(grader => (
            <GradingStatusCol key={grader} span={6}>
              <Progress
                type="circle"
                percent={getPercentage(programming, grader)}
                format={() => getText(programming, grader)}
              />
              <Label>{grader}</Label>
            </GradingStatusCol>
          ))}
        </GradingStatusRow>
        <StageTitle>Design</StageTitle>
        <GradingStatusRow gutter={16}>
          {Object.keys(design.graded).map(grader => (
            <GradingStatusCol key={grader} span={6}>
              <Progress
                type="circle"
                percent={getPercentage(design, grader)}
                format={() => getText(design, grader)}
              />
              <Label>{grader}</Label>
            </GradingStatusCol>
          ))}
        </GradingStatusRow>
        <StageTitle>Marketing</StageTitle>
        <GradingStatusRow gutter={16}>
          {Object.keys(marketing.graded).map(grader => (
            <GradingStatusCol key={grader} span={6}>
              <Progress
                type="circle"
                percent={getPercentage(marketing, grader)}
                format={() => getText(marketing, grader)}
              />
              <Label>{grader}</Label>
            </GradingStatusCol>
          ))}
        </GradingStatusRow>
        <StageTitle>Content</StageTitle>
        <GradingStatusRow gutter={16}>
          {Object.keys(content.graded).map(grader => (
            <GradingStatusCol key={grader} span={6}>
              <Progress
                type="circle"
                percent={getPercentage(content, grader)}
                format={() => getText(content, grader)}
              />
              <Label>{grader}</Label>
            </GradingStatusCol>
          ))}
        </GradingStatusRow>
      </SectionContainer>
    </div>
  );
}

export default enhance(Overview);
