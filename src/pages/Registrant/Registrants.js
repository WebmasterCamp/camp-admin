import React from 'react'
import { Tabs } from 'antd'
import { compose, lifecycle, withProps, mapProps } from 'recompose'
import { connect } from 'react-redux'
import moment from 'moment'

import RegistrantTable from '../../components/Registrant/RegistrantTable'
import { actions as registrantActions } from '../../ducks/registrant'

const TabPane = Tabs.TabPane

const mapUserToTableData = user => ({
  key: user._id,
  id: user._id,
  fullname: user.title + '' + user.firstName + ' ' + user.lastName,
  email: user.email,
})

const sortingFn = (a, b) => {
  if (moment(a.completed_at).isBefore(moment(b.completed_at))) return -1
  else if (moment(a.completed_at).isSame(moment(b.completed_at))) return 0
  return 1
}

const enhance = compose(
  connect(
    state => ({
      registrants: state.registrant.registrants,
      isLoading: state.registrant.isLoading,
    }),
    { ...registrantActions },
  ),
  mapProps(ownProps => ({
    getRegistrantList: ownProps.getRegistrantList,
    completedRegistrants: ownProps.registrants.filter(
      user => user.status === 'completed',
    ),
    pendingRegistrants: ownProps.registrants.filter(
      user => user.status === 'in progress',
    ),
  })),
  withProps(ownProps => ({
    programming: ownProps.completedRegistrants
      .filter(user => user.major === 'programming')
      .sort(sortingFn),
    design: ownProps.completedRegistrants
      .filter(user => user.major === 'design')
      .sort(sortingFn),
    marketing: ownProps.completedRegistrants
      .filter(user => user.major === 'marketing')
      .sort(sortingFn),
    content: ownProps.completedRegistrants
      .filter(user => user.major === 'content')
      .sort(sortingFn),
    notConfirm: ownProps.pendingRegistrants.filter(
      user => user.completed.filter(done => !done).length === 0,
    ),
    pending: ownProps.pendingRegistrants.filter(
      user => user.completed.filter(done => !done).length !== 0,
    ),
  })),
  withProps(ownProps => ({
    programming: ownProps.programming.map(mapUserToTableData),
    design: ownProps.design.map(mapUserToTableData),
    marketing: ownProps.marketing.map(mapUserToTableData),
    content: ownProps.content.map(mapUserToTableData),
    notConfirm: ownProps.notConfirm.map(mapUserToTableData),
    pending: ownProps.pending.map(mapUserToTableData),
  })),
  lifecycle({
    componentDidMount() {
      this.props.getRegistrantList()
    },
  }),
)

const Registrants = props => {
  return (
    <div>
      <Tabs>
        <TabPane
          tab={`Not Confirm (${props.notConfirm.length})`}
          key="notConfirm"
        >
          <RegistrantTable loading={props.isLoading} data={props.notConfirm} />
        </TabPane>
        <TabPane tab={`Pending (${props.pending.length})`} key="pending">
          <RegistrantTable loading={props.isLoading} data={props.pending} />
        </TabPane>
        <TabPane tab={`Content (${props.content.length})`} key="content">
          <RegistrantTable loading={props.isLoading} data={props.content} />
        </TabPane>
        <TabPane tab={`Design (${props.design.length})`} key="design">
          <RegistrantTable loading={props.isLoading} data={props.design} />
        </TabPane>
        <TabPane tab={`Marketing (${props.marketing.length})`} key="marketing">
          <RegistrantTable loading={props.isLoading} data={props.marketing} />
        </TabPane>
        <TabPane
          tab={`Programming (${props.programming.length})`}
          key="programming"
        >
          <RegistrantTable loading={props.isLoading} data={props.programming} />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default enhance(Registrants)
