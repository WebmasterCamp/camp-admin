// This Page act as Proxy path. It will redirect to proper path

// import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';

const enhance = compose(
  withRouter,
  connect(
    state => ({
      isLoggedIn: state.auth.isLoggedIn,
      isCheckedUser: state.auth.isCheckedUser,      
      user: state.auth.user,
    })
  ),
  lifecycle({
    componentDidMount() {
      console.log(this.props.isLoggedIn);
      if (this.props.isLoggedIn) {
        const { role } = this.props.user;
        if (role === 'admin') {
          this.props.history.push('/overview');
        } else if (role === 'design' || role === 'marketing' || role === 'content' || role === 'programming') {
          this.props.history.push('/grading');
        }
      } else {
        console.log('go to login');
        console.log(this.props.history);
        this.props.history.replace('/login');
      }
    }
  })
)
const Proxying = () => null;

export default enhance(Proxying);
