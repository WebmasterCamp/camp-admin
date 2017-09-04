import React from 'react';
import { Tabs, Button } from 'antd';


import UserTable from '../../components/User/UserTable';
const TabPane = Tabs.TabPane;
const data = [
  {
    key: 1,
    id: 1,
    facebookID: 9999,
    fullname: 'benz',
    email: 'benz@gmail.com',
    status: 'Done',
    role: 'Admin'
  },
  {
    key: 2,
    id: 2,
    facebookID: 9999,
    fullname: 'Jitta',
    email: 'benz@gmail.com',
    status: 'Done',
    role: 'Judge in Designer'
  }
];


const Users = props => (
  <div>
    {/* <h1>Users</h1> */}
    <Tabs>
   
    <TabPane tab="Web Content (2)" key="1">
      <h2>Web Content</h2>
      <UserTable data={data} />
    </TabPane>
    <TabPane tab="Web Design (2)" key="2">
      <h2>Web Design</h2>
      <UserTable data={data} />
  </TabPane>
  <TabPane tab="Web Marketing (2)" key="3">
      <h2>Web Marketing</h2>
      <UserTable data={data} />
    </TabPane>
    <TabPane tab="Web Programming (2)" key="4">
      <h2>Web Programming</h2>
      <UserTable data={data} />
    </TabPane>
  </Tabs>
  </div>
  
);

export default Users;
