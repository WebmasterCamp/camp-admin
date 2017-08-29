import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd';
import styled from 'styled-components';

import Login from './pages/auth/Login';
import Test from './pages/Test';

const { Header, Sider, Content } = Layout;

const StyledLayout = styled(Layout)`
  height: 100%;
`;

const Routes = () => (
  <Router>
    <StyledLayout>
      <Sider
        trigger={null}
        collapsible
        collapsed={false}
      >
        <h1>YWC15 Admin</h1>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <Link to="/login">
              <Icon type="user" />
              <span>Login</span>
            </Link> 
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/test">
              <Icon type="video-camera" />
              <span>Test</span>
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header>
          <h1>DUDE</h1>
        </Header>
        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
          <Route path="/login" exact component={Login} />
          <Route path="/test" exact component={Test} />
        </Content>
      </Layout>
    </StyledLayout>
  </Router>
);

export default Routes;
