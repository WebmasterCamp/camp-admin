import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card } from 'antd';
import styled from 'styled-components';

import Routes from './Routes';
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
      return <h1>Wating...</h1>
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
  }),
  { ...authActions }
)(App);
