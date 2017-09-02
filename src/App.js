import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Routes from './Routes';
import Login from './pages/auth/Login';
import Loading from './pages/Loading';
import { actions as authActions } from './ducks/auth';

const AppContainer = styled.div`
  height: 100%;
`;

class App extends Component {
  componentDidMount() {
    this.props.checkUser();
  }

  render() {
    if (!this.props.isCheckedUser) {
      return <Loading />;
    }
    if (!this.props.isLoggedIn) {
      return <Login />;
    }
    return (
      <AppContainer>
        <Routes />
      </AppContainer>
    );
  }
}

export default connect(
  state => ({
    isCheckedUser: state.auth.isCheckedUser,
    isLoggedIn: state.auth.isLoggedIn
  }),
  { ...authActions }
)(App);
