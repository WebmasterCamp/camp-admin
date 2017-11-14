import React from 'react';
import { Col, Row, Progress as _Progress } from 'antd';
import styled from 'styled-components';

const StageTitle = styled.h3`
  margin-bottom: 15px;
`;

const GradingStatusCol = styled(Col)`
  text-align: center;
`;

const GradingStatusRow = styled(Row)`
  margin-bottom: 30px;
`;

const Progress = styled(_Progress)`
  .ant-progress-text {
    font-size: 20px;
  }
`;

const Label = styled.p`
  font-weight: bold;
  padding-top: 10px;
`;

const getPercentage = (stat, key) => (key ? stat.graded[key] : stat.graded) * 100/stat.all;
const getText = (stat, key) => `${key ? stat.graded[key] : stat.graded}/${stat.all}`;

const GradingStatus = props => {
  const { stageOne, stageTwo, programming, design, marketing, content } = props.gradingStat;
  return (
    <div>
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
    </div>
  );
};

export default GradingStatus;
