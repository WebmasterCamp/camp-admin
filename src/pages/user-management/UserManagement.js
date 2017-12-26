import React from 'react';
import { compose, lifecycle, withProps, withState } from 'recompose';
import { connect } from 'react-redux';
import { Button, Table, Input, Popconfirm, Select } from 'antd';
import styled from 'styled-components';

import { redirectIfNotLoggedIn } from '../../utils/redirect';
import { actions as adminUserActions } from '../../ducks/adminUser';

const enhance = compose(
  redirectIfNotLoggedIn,
  connect(
    state => ({
      isLoading: state.adminUser.isLoading,
      users: state.adminUser.users
    }),
    { ...adminUserActions }
  ),
  withState('username', 'setUsername', ''),
  withState('password', 'setPassword', ''),
  withState('role', 'setRole', ''),
  withProps(
    ownProps => ({
      users: ownProps.users.map(user => ({
        id: user._id,
        key: user._id,
        username: user.username,
        role: user.role
      })),
      clearForm: () => {
        ownProps.setUsername('');
        ownProps.setPassword('');
        ownProps.setRole('');
      }
    })
  ),
  lifecycle({
    componentDidMount() {
      this.props.getAdminUser();
    }
  })
)

const Title = styled.h1`
  margin-bottom: 10px;
`;

const ActionSpan = styled.div`
  margin-bottom: 10px;
  display: flex;
  > * {
    margin-right: 10px;
    &:last-child {
      margin-right: 0px;
    }
  }
`;

const createColumns = (props) => [{
  title: 'Username',
  dataIndex: 'username',
  key: 'username',
}, {
  title: 'Role',
  dataIndex: 'role',
  key: 'role',
}, {
  title: 'Action',
  render: (text, item) => (
    <Popconfirm
      title="Are you sure?"
      onConfirm={() => (
        props.deleteAdminUser(item.id)
          .then(() => props.getAdminUser())
      )}
      okText="Yes"
      cancelText="No"
    >
      <Button type="danger" icon="delete">Delete</Button>
    </Popconfirm>
  )
}];

const UserManagement = props => {
  return (
    <div>
      <Title>User Management</Title>
      <ActionSpan>
        <Input style={{ width: 200 }} placeholder="Username" value={props.username} onChange={e => props.setUsername(e.target.value)} />
        <Input style={{ width: 200 }} placeholder="Password" value={props.password} onChange={e => props.setPassword(e.target.value)} />
        <Select style={{ width: 240 }} placeholder="Role" value={props.role} onChange={(value) => props.setRole(value)}>
          <Select.Option value="admin">Admin</Select.Option>
          <Select.Option value="stage-1">Grader - YWC14</Select.Option>
          <Select.Option value="stage-2">Grader - Stage Two</Select.Option>
          <Select.Option value="design">Grader - Designer</Select.Option>
          <Select.Option value="programming">Grader - Programming</Select.Option>
          <Select.Option value="content">Grader - Content</Select.Option>
          <Select.Option value="marketing">Grader - Marketing</Select.Option>
          <Select.Option value="queue">Queue Runner</Select.Option>
          <Select.Option value="slips">Slips Approver</Select.Option>
          <Select.Option value="score">Score</Select.Option>
        </Select>
        <Popconfirm
          title="Are you sure?"
          onConfirm={() => {
            props.createAdminUser(props.username, props.password, props.role)
              .then(() => props.getAdminUser())
              .then(() => props.clearForm());
          }}
          okText="Yes"
          cancelText="No"
        >
          <Button type="primary" icon="plus-circle">Add</Button>
        </Popconfirm>
      </ActionSpan>
      <Table loading={props.isLoading} size="middle" bordered columns={createColumns(props)} dataSource={props.users} />
    </div>
  );
}

export default enhance(UserManagement);
