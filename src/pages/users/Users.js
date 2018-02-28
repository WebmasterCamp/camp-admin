import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Tabs } from 'antd'
import { compose, lifecycle, withProps, mapProps } from 'recompose'

import UserTable from '../../components/User/UserTable'
import { actions as userActions } from '../../ducks/user'
const enhance = compose(
  connect(
    state => ({
      users: state.user.users,
    }),
    { ...userActions, push },
  ),
  mapProps(ownProps => ({
    getUserList: ownProps.getUserList,
    push: ownProps.push,
    completedUsers: ownProps.users.filter(user => user.status === 'completed'),
    pendingUsers: ownProps.users.filter(user => user.status === 'in progress'),
  })),
  withProps(ownProps => ({
    programming: ownProps.completedUsers.filter(
      user => user.major === 'programming',
    ),
    design: ownProps.completedUsers.filter(user => user.major === 'design'),
    marketing: ownProps.completedUsers.filter(
      user => user.major === 'marketing',
    ),
    content: ownProps.completedUsers.filter(user => user.major === 'content'),
    notConfirm: ownProps.pendingUsers.filter(
      user => user.completed.filter(done => !done).length === 0,
    ),
  })),
  lifecycle({
    componentDidMount() {
      this.props.getUserList()
    },
  }),
)

const TabPane = Tabs.TabPane

const data = [
  {
    key: 1,
    id: 1,
    facebookID: 9999,
    fullname: 'benz',
    email: 'benz@gmail.com',
    status: 'Done',
    role: 'Admin',
  },
  {
    key: 2,
    id: 2,
    facebookID: 9999,
    fullname: 'Jitta',
    email: 'benz@gmail.com',
    status: 'Done',
    role: 'Judge in Designer',
  },
]

const Users = props => {
  console.log(props)
  return (
    <div>
      <Tabs>
        <TabPane tab="Pending" key="1">
          <UserTable data={data} />
        </TabPane>
        <TabPane tab="Not Confirm" key="2">
          <UserTable data={data} />
        </TabPane>
        <TabPane tab="Content" key="3">
          <UserTable data={data} />
        </TabPane>
        <TabPane tab="Design" key="4">
          <UserTable data={data} />
        </TabPane>
        <TabPane tab="Marketing" key="5">
          <UserTable data={data} />
        </TabPane>
        <TabPane tab="Programming" key="6">
          <UserTable data={data} />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default enhance(Users)
