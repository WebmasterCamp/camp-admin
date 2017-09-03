import React from 'react';

import UserTable from '../../components/User/UserTable';

const data = [
  {
    key: 1,
    id: 1,
    username: 'benz',
    role: 'Admin'
  },
  {
    key: 2,
    id: 2,
    username: 'Jitta',
    role: 'Judge in Designer'
  }
];


const Users = props => (
  <div>
    <h1>Users</h1>
    <UserTable data={data} />
  </div>
);

export default Users;
