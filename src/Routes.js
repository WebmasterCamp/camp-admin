import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withRouter, Route, Link, Redirect } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import styled from 'styled-components';

import { actions as authActions } from './ducks/auth';
import Overview from './pages/Overview';
import Grading from './pages/grading/Grading';
import Registrants from './pages/Registrant/Registrants';
import Registrant from './pages/Registrant/Registrant';
import StageOneGrading from './pages/grading/StageOne/StageOneGrading';
import StageOneList from './pages/grading/StageOne/StageOneList';
import Users from './pages/users/Users';
import User from './pages/users/User';
import Affiliate from './pages/affiliate/Affiliate';
import UserManagement from './pages/user-management/UserManagement';
import Logout from './pages/auth/Logout';
import Login from './pages/auth/Login';
import Proxying from './pages/Proxying';

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

const enhance = compose(
  withRouter,
  connect(
    state => ({
      user: state.auth.user,
      isLoggedIn: state.auth.isLoggedIn,
    }),
    { ...authActions }
  )
);

const AdminRoute = ({ component: Component, user, ...rest }) => (
  <Route {...rest} render={props => (
    user.role === 'admin' ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
      }}/>
    )
  )}/>
);

const StageOneRoute = ({ component: Component, user, ...rest }) => (
  <Route {...rest} render={props => (
    user.role === 'stage-1' ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
      }}/>
    )
  )}/>
);

const Routes = props => (
  <StyledLayout>
    <Sider
      trigger={null}
      collapsible
      collapsed={false}
    >
      <BrandingImg />
      <Menu theme="dark" mode="inline">
        {props.user.role === 'admin' && <Menu.Item key="1">
          <Link to="/overview">
            <Icon type="area-chart" />
            <span>Overview</span>
          </Link> 
        </Menu.Item>}
        {['designer', 'marketing', 'programming', 'content', 'stage-1'].indexOf(props.user.role) !== -1 && <Menu.Item key="2">
          <Link to="/grading">
            <Icon type="edit" />
            <span>Grading</span>
          </Link> 
        </Menu.Item>}
        {props.user.role === 'admin' && <Menu.Item key="3">
          <Link to="/registrant">
            <Icon type="user" />
            <span>Registrant</span>
          </Link>
        </Menu.Item>}
        {false && props.user.role === 'admin' && <Menu.Item key="4">
          <Link to="/grading-status">
            <Icon type="user" />
            <span>Grading Status</span>
          </Link>
        </Menu.Item>}
        {props.user.role === 'admin' && <Menu.Item key="5">
          <Link to="/affiliate">
            <Icon type="link" />
            <span>Affiliate</span>
          </Link>
        </Menu.Item>}
        {props.user.role === 'admin' && <Menu.Item key="6">
          <Link to="/user-management">
            <Icon type="user" />
            <span>Admin Management</span>
          </Link>
        </Menu.Item>}
        {props.isLoggedIn && <Menu.Item key="7">
          <Link to="/logout">
            <Icon type="poweroff" />
            <span>Logout</span>
          </Link>
        </Menu.Item>}
      </Menu>
    </Sider>
    <Layout>
      <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280, overflowY: 'scroll' }}>
        <Route path="/logout" exact component={Logout} />
        <Route path="/login" exact component={Login} />
        <AdminRoute user={props.user} path="/overview" exact component={Overview} />
        <AdminRoute user={props.user} path="/user" exact component={Users} />
        <AdminRoute user={props.user} path="/user/:id" exact component={User} />
        <AdminRoute user={props.user} path="/affiliate" exact component={Affiliate} />
        <AdminRoute user={props.user} path="/registrant" exact component={Registrants} />
        <AdminRoute user={props.user} path="/registrant/:id" exact component={Registrant} />
        <AdminRoute user={props.user} path="/user-management" exact component={UserManagement} />
        <StageOneRoute user={props.user} path="/grading" exact component={StageOneList} />
        <StageOneRoute  user={props.user} path="/grading/:id" exact component={StageOneGrading} />
        {/* <Route path="/" exact component={Proxying} /> */}
        {/* <Redirect from='*' to='/login' /> */}
      </Content>
    </Layout>
  </StyledLayout>
);

export default enhance(Routes);
