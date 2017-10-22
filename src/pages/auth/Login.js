import React from 'react';
import { Form, Icon, Input, Button } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose, withState, withProps } from 'recompose';
import styled from 'styled-components';

import { actions as authActions } from '../../ducks/auth';

const FormItem = Form.Item;

const enhance = compose(
  // redirectIfLoggedIn,
  withRouter,
  connect(
    state => ({
      user: state.auth.user
    }),
    { ...authActions }
  ),
  withState('username', 'setUsername', ''),
  withState('password', 'setPassword', ''),
  withProps(
    ownProps => ({
      handleLogin: e => {
        e.preventDefault();
        const { username, password } = ownProps;
        ownProps.login(username, password)
          .then((resp) => {
            if (resp.data.role === 'admin') {
              ownProps.history.push('/overview');
            } else {
              ownProps.history.push('/grading');
            }
          })
      }
    })
  )
);

const Container = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const FormContainer = styled(Form).attrs({
  className: 'login-form'
})`
  width: 300px;
  > div {
    margin-bottom: 15px;
  }
`;

const Title = styled.h1`
  margin-bottom: 10px;
`;

const Login = props => {
  return (
    <Container>
      <Title>YWC15 Admin & Grading System</Title>
      <FormContainer onSubmit={props.handleLogin}>
        <FormItem>
          <Input
            onChange={e => props.setUsername(e.target.value)}
            value={props.username}
            prefix={<Icon type="user" style={{ fontSize: 13 }} />}
            placeholder="Username"
          />
        </FormItem>
        <FormItem>
          <Input
            onChange={e => props.setPassword(e.target.value)}
            value={props.password}
            prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password"
            placeholder="Password"
          />
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
        </FormItem>
      </FormContainer>
    </Container>
  );
}

export default enhance(Login);
