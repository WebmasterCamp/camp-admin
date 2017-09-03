import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { compose, lifecycle } from 'recompose';

import { actions as authActions } from '../../ducks/auth';

const enhance = compose(
  connect(
    null,
    { ...authActions }
  ),
  lifecycle({
    componentDidMount() {
      this.props.logout();
    }
  })
);

const Logout = () => <Redirect to="/" />

export default enhance(Logout);
