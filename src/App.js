import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import Routes from './Routes';
import Loading from './pages/Loading';
import { actions as authActions } from './ducks/auth';

const AppContainer = styled.div`
  height: 100%;
`;

const enhance = compose(
  withRouter,
  connect(
    state => ({
      isCheckedUser: state.auth.isCheckedUser,
      isLoggedIn: state.auth.isLoggedIn
    }),
    { ...authActions }
  )
);

class App extends Component {
  componentDidMount() {
    this.props.checkUser();
  }

  render() {
    if (!this.props.isCheckedUser) {
      return <Loading />;
    }
    return (
      <AppContainer>
        <Routes />
      </AppContainer>
    );
  }
}

export default enhance(App);
