import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
import { compose, withProps, lifecycle } from 'recompose';
import styled from 'styled-components';
import _ from 'lodash';

import { actions as queueActions } from '../../ducks/queue';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
`;

const Title = styled.h2`

`;

const Queue = styled.h2`
  font-size: 60px;
`;

const Description = styled.p`
  color: #e41111;
  font-weight: bold;
  font-size: 20px;
  text-align: center;
  margin-bottom: 10px;
`;

const enhance = compose(
  connect(
    state => ({
      user: state.auth.user,
      order: state.queue.order,
      isLoadingQueue: state.queue.isLoading,
      isIncreasingQueue: state.queue.isIncreasing
    }),
    { ...queueActions }
  ),
  withProps(
    props => ({
      major: props.user.username.split('queue-')[1],
    })
  ),
  withProps(
    props => ({
      onProceedQueue: () => props.increaseQueue(props.major)
        .then(() => props.getQueue(props.major))
    })
  ),
  lifecycle({
    componentDidMount() {
      this.props.getQueue(this.props.major);
    }
  })
);

const IncreaseButton = styled(Button)`
  margin-bottom: 10px;
`;

const QueuePage = props => {
  const { major, isIncreasingQueue, order } = props;
  return (
    <Container>
      <Title>Current Queue</Title>
      <Queue>{major[0].toUpperCase()}{_.padStart(order, 2, '0')}</Queue>
      <IncreaseButton type="primary" loading={isIncreasingQueue} onClick={() => props.onProceedQueue()}>เพิ่มเลขคิว</IncreaseButton>
      <Description>กดเพิ่มเลขคิว เมื่อน้องเข้าห้องสัมแล้ว</Description>
      <Description>อย่ากดเบิ้ล!!!!!! กดทีละครั้ง เลขเปลี่ยนค่อยกด</Description>
      <Description>ขอโทษที่บน Mobile หน้าตามันเละๆ 555</Description>
    </Container>
  );
};

export default enhance(QueuePage);
