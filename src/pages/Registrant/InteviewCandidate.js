import React from 'react'
import { connect } from 'react-redux'
import { compose, lifecycle, withProps } from 'recompose'
import { Tabs, Icon } from 'antd'

import { actions as registrantActions } from '../../ducks/registrant'
import RegistrantTable from '../../components/Registrant/RegistrantTable'

const TabPane = Tabs.TabPane

const mapUserToTableData = user => ({
  key: user._id,
  id: user._id,
  fullname: user.title + '' + user.firstName + ' ' + user.lastName,
  email: user.email,
})

const enhance = compose(
  connect(
    state => ({
      interviewCandidate: state.registrant.interviewCandidate,
      isLoading: state.registrant.isLoadingInterviewCandidate,
    }),
    { ...registrantActions },
  ),
  withProps(props => ({
    content: props.interviewCandidate.content
      ? props.interviewCandidate.content.map(mapUserToTableData)
      : [],
    design: props.interviewCandidate.design
      ? props.interviewCandidate.design.map(mapUserToTableData)
      : [],
    marketing: props.interviewCandidate.marketing
      ? props.interviewCandidate.marketing.map(mapUserToTableData)
      : [],
    programming: props.interviewCandidate.programming
      ? props.interviewCandidate.programming.map(mapUserToTableData)
      : [],
  })),
  lifecycle({
    componentDidMount() {
      this.props.getCandidateList()
    },
  }),
)

const InterviewCandidate = props => {
  if (props.isLoading) {
    return <Icon type="loading" />
  }
  const { content, design, marketing, programming } = props
  return (
    <div>
      <Tabs>
        <TabPane tab={`Content (${content.length})`} key="content">
          <RegistrantTable loading={props.isLoading} data={content} />
        </TabPane>
        <TabPane tab={`Design (${design.length})`} key="design">
          <RegistrantTable loading={props.isLoading} data={design} />
        </TabPane>
        <TabPane tab={`Marketing (${marketing.length})`} key="marketing">
          <RegistrantTable loading={props.isLoading} data={marketing} />
        </TabPane>
        <TabPane tab={`Programming (${programming.length})`} key="programming">
          <RegistrantTable loading={props.isLoading} data={programming} />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default enhance(InterviewCandidate)
