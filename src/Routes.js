import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withRouter, Route, Link, Redirect } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import styled from 'styled-components';

import { actions as authActions } from './ducks/auth';
import Overview from './pages/Overview';
// import Grading from './pages/grading/Grading';
import Registrants from './pages/Registrant/Registrants';
import Registrant from './pages/Registrant/Registrant';
// import StageOneGrading from './pages/grading/StageOne/StageOneGrading';
import StageOneList from './pages/grading/StageOne/StageOneList';
import StageTwoList from './pages/grading/StageTwo/StageTwoList';
import MajorList from './pages/grading/Major/MajorList';
import Users from './pages/users/Users';
import User from './pages/users/User';
import Affiliate from './pages/affiliate/Affiliate';
import UserManagement from './pages/user-management/UserManagement';
import InteviewCandidate from './pages/Registrant/InteviewCandidate';
import Interviewer from './pages/interviewer/Interviewer';
import Logout from './pages/auth/Logout';
import Login from './pages/auth/Login';
// import Proxying from './pages/Proxying';

const { Sider, Content } = Layout;
const { SubMenu } = Menu;
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

const StageTwoRoute = ({ component: Component, user, ...rest }) => (
  <Route {...rest} render={props => (
    user.role === 'stage-2' ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
      }}/>
    )
  )}/>
);

const MajorRoute = ({ component: Component, user, ...rest }) => (
  <Route {...rest} render={props => (
    (user.role === 'programming' || user.role === 'design' || user.role === 'marketing' || user.role === 'content') ? (
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
        {!props.isLoggedIn && (
          <Menu.Item key="login">
            <Link to="/login">
              <Icon type="login" />
              <span>Log In</span>
            </Link> 
          </Menu.Item>
        )}
        {props.user.role === 'admin' && <Menu.Item key="overview">
          <Link to="/overview">
            <Icon type="area-chart" />
            <span>Overview</span>
          </Link> 
        </Menu.Item>}
        {['design', 'marketing', 'programming', 'content', 'stage-1', 'stage-2'].indexOf(props.user.role) !== -1 && <Menu.Item key="grading">
          <Link to="/grading">
            <Icon type="edit" />
            <span>Grading</span>
          </Link> 
        </Menu.Item>}
        {['design', 'marketing', 'programming', 'content'].indexOf(props.user.role) !== -1 && <Menu.Item key="Interviewer">
          <Link to="/interviewer">
            <Icon type="user" />
            <span>Interviewer</span>
          </Link> 
        </Menu.Item>}
        {props.user.role === 'admin' && (
          <SubMenu key="registrant-menu" title={<p><Icon type="user" /> Registrant</p>}>
            <Menu.Item key="registrant">
              <Link to="/registrant">
                <span>All Registrant</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="interview-candidate">
              <Link to="/interview-candidate">
                <span>Interview Candidate</span>
              </Link>
            </Menu.Item>
          </SubMenu>
        )}
        {props.user.role === 'admin' && <Menu.Item key="affiliate">
          <Link to="/affiliate">
            <Icon type="link" />
            <span>Affiliate</span>
          </Link>
        </Menu.Item>}
        {props.user.role === 'admin' && <Menu.Item key="admin-management">
          <Link to="/user-management">
            <Icon type="user" />
            <span>Admin Management</span>
          </Link>
        </Menu.Item>}
        {props.isLoggedIn && <Menu.Item key="logout">
          <Link to="/logout">
            <Icon type="poweroff" />
            <span>Log Out</span>
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
        <AdminRoute user={props.user} path="/interview-candidate" exact component={InteviewCandidate} />
        {props.user.role === 'stage-1' && <StageOneRoute user={props.user} path="/grading" exact component={StageOneList} />}
        {props.user.role === 'stage-2' && <StageTwoRoute user={props.user} path="/grading" exact component={StageTwoList} />}
        {(props.user.role === 'marketing' || props.user.role === 'content' || props.user.role === 'programming' || props.user.role === 'design') && (
          <MajorRoute user={props.user} path="/grading" exact component={MajorList} />
        )}
        {(props.user.role === 'marketing' || props.user.role === 'content' || props.user.role === 'programming' || props.user.role === 'design') && (
          <MajorRoute user={props.user} path="/interviewer" exact component={Interviewer} />
        )}
        {/* <Route path="/" exact component={Proxying} /> */}
        {/* <Redirect from='*' to='/login' /> */}
      </Content>
    </Layout>
  </StyledLayout>
);

export default enhance(Routes);
