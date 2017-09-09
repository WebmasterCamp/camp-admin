import React from 'react';
import styled from 'styled-components';
import { Tabs, Button } from 'antd';
import { compose, lifecycle, withProps } from 'recompose';
import { connect } from 'react-redux';

import RegistrantTable from '../../components/Registrant/RegistrantTable';
import { redirectIfNotLoggedIn } from '../../utils/redirect';
import { actions as registrantActions } from '../../ducks/registrant';

const TabPane = Tabs.TabPane;
// const data = [
//   {
//     key: 1,
//     id: 1,
//     facebookID: 9999,
//     fullname: 'benz',
//     email: 'benz@gmail.com',
//     status: 'Done',
//     role: 'Admin'
//   },
//   {
//     key: 2,
//     id: 2,
//     facebookID: 9999,
//     fullname: 'Jitta',
//     email: 'benz@gmail.com',
//     status: 'Done',
//     role: 'Judge in Designer'
//   }
// ];

const enhance = compose(
  redirectIfNotLoggedIn,
  connect(
    state => ({
      webProgrammingRegistrantList: state.registrant.webProgrammingRegistrantList,
      webContentRegistrantList: state.registrant.webContentRegistrantList,
      webDesignRegistrantList: state.registrant.webDesignRegistrantList,
      webMarkingRegistrantList: state.registrant.webMarkingRegistrantList,
      isLoading: state.registrant.isLoading
    }),
    {...registrantActions}
  ),
  withProps(
    ownProps => ({
      webProgrammingRegistrantList: ownProps.webProgrammingRegistrantList.map((item) => ({
        key: item.grader_id,
        id: item.grader_id,
        facebook: item.facebook,
        status: item.status,
        fullname : item.title + "" + item.firstName + " " + item.lastName,
        email : item.email,
      })),
      webContentRegistrantList: ownProps.webContentRegistrantList.map((item) => ({
        key: item.grader_id,
        id: item.grader_id,
        facebook: item.facebook,
        status: item.status,
        fullname : item.title + "" + item.firstName + " " + item.lastName,
        email : item.email,
      })),
      webProgrammingRegistrantList: ownProps.webProgrammingRegistrantList.map((item) => ({
        key: item.grader_id,
        id: item.grader_id,
        facebook: item.facebook,
        status: item.status,
        fullname : item.title + "" + item.firstName + " " + item.lastName,
        email : item.email,
      })),
      webProgrammingRegistrantList: ownProps.webProgrammingRegistrantList.map((item) => ({
        key: item.grader_id,
        id: item.grader_id,
        facebook: item.facebook,
        status: item.status,
        fullname : item.title + "" + item.firstName + " " + item.lastName,
        email : item.email,
      }))
    })
  ),
  lifecycle({
    componentDidMount() {
      this.props.getRegistrantList();
    }
  }),
);


const Registrants = props => (
  <div>
    {/* <h1>Users</h1> */}
    <Tabs>
    <TabPane tab="Web Content (2)" key="1">
      <h2>Web Content</h2>
      <RegistrantTable loading={props.isLoading} data={props.webContentRegistrantList} />
    </TabPane>
    <TabPane tab="Web Design (2)" key="2">
      <h2>Web Design</h2>
      <RegistrantTable loading={props.isLoading} data={props.webDesignRegistrantList} />
  </TabPane>
  <TabPane tab="Web Marketing (2)" key="3">
      <h2>Web Marketing</h2>
      <RegistrantTable loading={props.isLoading} data={props.webMarkingRegistrantList} />
    </TabPane>
    <TabPane tab="Web Programming (2)" key="4">
      <h2>Web Programming</h2>
      <RegistrantTable loading={props.isLoading} data={props.webProgrammingRegistrantList} />
    </TabPane>
  </Tabs>
  </div>
  
);

export default Registrants;
