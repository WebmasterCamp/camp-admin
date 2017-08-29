import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card } from 'antd';
import styled from 'styled-components';

import Routes from './Routes';

const AppContainer = styled.div`
  height: 100%;
`;

class App extends Component {
  render() {
    return (
      <AppContainer>
        <Routes />
      </AppContainer>
    );
  }
}

export default connect(
  state => ({
    isLoggedIn: state.auth.isLoggedIn
  })
)(App);
