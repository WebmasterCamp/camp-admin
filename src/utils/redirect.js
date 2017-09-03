import React from 'react';
import { compose, branch, renderComponent } from 'recompose';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const authStateConnect = connect(
  state => ({
    isCheckedUser: state.auth.isCheckedUser,
    isLoggedIn: state.auth.isLoggedIn
  })
);

export const redirectIfLoggedIn = compose(
  authStateConnect,
  branch(props => props.isCheckedUser && props.isLoggedIn, renderComponent(() => <Redirect to="/overview" />))
);

export const redirectIfNotLoggedIn = compose(
  authStateConnect,
  branch(props => props.isCheckedUser && !props.isLoggedIn, renderComponent(() => <Redirect to="/" />))
);
