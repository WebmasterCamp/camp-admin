import React from 'react';
import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Icon } from 'antd';

import { redirectIfNotLoggedIn } from '../utils/redirect';
import InterviewEstimation from '../components/Overview/InterviewEstimation';
import GradingStatus from '../components/Overview/GradingStatus';
import RegistrationStat from '../components/Overview/RegistrationStat';
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

const SectionContainer = styled.div`
  margin-bottom: 20px;
`;

const SectionTitle = styled.h2`
  ${props => !props.noMargin && 'margin-bottom: 10px;'}
`;

const Description = styled.p`
  margin-bottom: 10px;
`;

const Overview = props => {
  if (props.isLoading) return <Icon type="loading" />
  const { interviewEstimation } = props.gradingStat;
  return (
    <div>
      <SectionContainer>
        <SectionTitle noMargin>Interview Estimation</SectionTitle>
        <Description><b>Note:</b> ในวงเล็บ คือ criteria เดิม / เลขใหญ่ คือคนที่ผ่านด้วย criteria นี้</Description>
        <InterviewEstimation interviewEstimation={interviewEstimation} />
      </SectionContainer>
      <SectionContainer>
        <SectionTitle>Grading Status</SectionTitle>
        <GradingStatus gradingStat={props.gradingStat} />
      </SectionContainer>
      <SectionContainer>
        <SectionTitle>GOOD JOB EVERYONE :)</SectionTitle>
        <RegistrationStat stat={props.stat} />
      </SectionContainer>
    </div>
  );
}

export default enhance(Overview);
