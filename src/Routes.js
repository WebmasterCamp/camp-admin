import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import styled from 'styled-components';

import { actions as authActions } from './ducks/auth';
import Overview from './pages/Overview';
import Grading from './pages/grading/Grading';
import Users from './pages/users/Users';
import User from './pages/users/User';
import Affiliate from './pages/affiliate/Affiliate';

const { Sider, Content } = Layout;

const StyledLayout = styled(Layout)`
  height: 100%;
`;

const BrandingImg = styled.img.attrs({
  src: require('./img/logo.png'),
  alt: 'branding'
})`
  width: 140px;
  display: block;
  margin: 0 auto;
  padding: 15px 0;
`;

const Routes = props => (
  <Router>
    <StyledLayout>
      <Sider
        trigger={null}
        collapsible
        collapsed={false}
      >
        <BrandingImg />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <Link to="/overview">
              <Icon type="edit" />
              <span>Overview</span>
            </Link> 
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/grading">
              <Icon type="edit" />
              <span>Grading</span>
            </Link> 
          </Menu.Item>
          {props.user.role === 'admin' && <Menu.Item key="3">
            <Link to="/user">
              <Icon type="user" />
              <span>Registrant</span>
            </Link>
          </Menu.Item>}
          {props.user.role === 'admin' && <Menu.Item key="4">
            <Link to="/affiliate">
              <Icon type="video-camera" />
              <span>Affiliate</span>
            </Link>
          </Menu.Item>}
          <Menu.Item key="5">
            <a onClick={() => props.logout()}>
              <Icon type="poweroff" />
              <span>Logout</span>
            </a>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
          <Route path="/overview" exact component={Overview} />
          <Route path="/grading" exact component={Grading} />
          <Route path="/user" exact component={Users} />
          <Route path="/user/:id" exact component={User} />
          <Route path="/affiliate" exact component={Affiliate} />
        </Content>
      </Layout>
    </StyledLayout>
  </Router>
);

export default connect(
  state => ({
    user: state.auth.user
  }),
  { ...authActions }
)(Routes);
