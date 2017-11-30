import React from 'react';
import { connect } from 'react-redux';
import { Icon, Collapse, Table } from 'antd';
import { compose, lifecycle, withProps } from 'recompose';
import styled from 'styled-components';

import { actions as slipActions } from '../../ducks/slip';
import { GreenButton, RedButton } from '../../components/Core/Buttons';
import { getImagePath } from '../../utils/helpers';

const SlipImage = styled.img`
  height: 200px;
`;

const columns = (props, withAction = false) => {
  const col = [
    { title: 'Amount', dataIndex: 'transfer_money', width: 100, render: (text) => <b>{text}</b> },
    { title: 'Name', dataIndex: 'name', width: 150 },
    {
      title: 'Slip Image',
      render: (text, item) => (
        <a href={getImagePath(item.file_path)} target="_blank">
          <SlipImage src={getImagePath(item.file_path)} alt="slip" />
        </a>
      )
    },
    
  ];
  if (withAction) {
    return [
      ...col,
      {
        title: 'Action',
        render: (text, item) => (
          <div>
            <GreenButton onClick={() => props.approveSlip(item._id)} icon="check-circle" style={{ marginRight: '10px' }}>Approve</GreenButton>
            <RedButton onClick={() => props.notApproveSlip(item._id)} icon="close-circle">Not Approve</RedButton>
          </div>
        )
      }
    ];
  }
  return col;
} 

const enhance = compose(
  connect(
    state => ({
      slips: state.slip.data,
      loading: state.slip.loading
    }),
    { ...slipActions }
  ),
  withProps(
    props => ({
      approveSlip: (id) => props.updateSlipState(id, true)
        .then(() => props.getSlips()),
      notApproveSlip: (id) => props.updateSlipState(id, false)
        .then(() => props.getSlips()),
    })
  ),
  lifecycle({
    componentDidMount() {
      this.props.getSlips();
    }
  })
);

const SlipPage = props => {
  const { loading } = props;
  if (loading) return <Icon type="loading" />
  const { slips } = props;
  console.log(slips);
  return (
    <Collapse defaultActiveKey={['pending', 'confirm', 'not confirm']}>
      <Collapse.Panel key="pending" header="Pending">
        <Table
          bordered
          columns={columns(props, true)}
          dataSource={slips.filter(slip => slip.status === 'pending')}
        />
      </Collapse.Panel>
      <Collapse.Panel key="confirm" header="Approve">
        <Table
          bordered
          columns={columns()}
          dataSource={slips.filter(slip => slip.status === 'approve').sort((a,b) => {
            if (a.amount > b.amount) return 1;
            else if (a.amount < b.amount) return -1;
            return 0;
          })}
        />
      </Collapse.Panel>
      <Collapse.Panel key="not confirm" header="Not Approve">
        <Table
          bordered
          columns={columns()}
          dataSource={slips.filter(slip => slip.status === 'not approve')}
        />
      </Collapse.Panel>
    </Collapse>
  );
};

export default enhance(SlipPage);
