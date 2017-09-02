import React from 'react';
import styled from 'styled-components';
import { Button, Popconfirm, message } from 'antd';
import { compose, lifecycle, withProps } from 'recompose';
import { connect } from 'react-redux';

import AffiliateTable from '../../components/Affiliate/AffiliateTable';
import { actions as affiliateActions } from '../../ducks/affiliate';

const SectionTitle = styled.h2`
  margin-bottom: 10px;
`;

const TableSection = styled.div`
  padding: 10px 0;
`;

const ActionSpan = styled.span`
  > * {
    margin-right: 10px;
  }
`;

const enhance = compose(
  connect(
    state => ({
      approvedAffiliate: state.affiliate.approvedAffiliate,
      unapprovedAffiliate: state.affiliate.unapprovedAffiliate,
      isLoading: state.affiliate.isLoading
    }),
    {...affiliateActions}
  ),
  withProps(
    ownProps => ({
      approvedAffiliate: ownProps.approvedAffiliate.map((item) => ({
        key: item._id,
        id: item._id,
        name: item.name,
        url: item.url
      })),
      unapprovedAffiliate: ownProps.unapprovedAffiliate.map((item) => ({
        key: item._id,
        id: item._id,
        name: item.name,
        url: item.url
      }))
    })
  ),
  lifecycle({
    componentDidMount() {
      this.props.getAffiliate();
    }
  }),
);

const approvedTableAction = (props) => ({
  title: 'Action',
  key: 'action',
  width: 250,
  render: (text, item) => (
    <ActionSpan>
      <Popconfirm
        title="Are you sure?"
        onConfirm={() => props.approveAffiliateItem(item.id)}
        okText="Yes"
        cancelText="No"
      >
        <Button type="primary" icon="check">Approved</Button>
      </Popconfirm>
      <Popconfirm
        title="Are you sure?"
        onConfirm={() => console.log(props)}
        okText="Yes"
        cancelText="No"
      >
        <Button type="danger" icon="delete">Delete</Button>
      </Popconfirm>
    </ActionSpan>
  )
});

const unapprovedTableAction = (props) => ({
  title: 'Action',
  key: 'action',
  width: 250,
  render: () => (
    <ActionSpan>
      <Popconfirm
        title="Are you sure?"
        onConfirm={() => console.log(props)}
        okText="Yes"
        cancelText="No"
      >
        <Button type="danger" icon="close">Unapproved</Button>
      </Popconfirm>
      <Popconfirm
        title="Are you sure?"
        onConfirm={() => console.log(props)}
        okText="Yes"
        cancelText="No"
      >
        <Button type="danger" icon="delete">Delete</Button>
      </Popconfirm>
    </ActionSpan>
  )
});


const Affiliate = props => (
  <div>
    <h1>Affiliate</h1>
    <TableSection>
      <SectionTitle>Unapproved Affiliate</SectionTitle>
      <AffiliateTable pagination={false} loading={props.isLoading} data={props.unapprovedAffiliate} action={approvedTableAction(props)} />
    </TableSection>
    <TableSection>
      <SectionTitle>Approved Affiliate</SectionTitle>
      <AffiliateTable pagination={false} loading={props.isLoading} data={props.approvedAffiliate} action={unapprovedTableAction(props)} />
    </TableSection>
  </div>
);

export default enhance(Affiliate);
