import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { connect } from 'react-redux';
import { compose, withState, withProps } from 'recompose';

import { actions as authActions } from '../../ducks/auth';

const FormItem = Form.Item;

const enhance = compose(
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
        ownProps.login(username, password);
      }
    })
  )
);

const Login = props => (
  <div>
    <h1>YWC15 Admin System</h1>
    {JSON.stringify(props.user)}
    <Form onSubmit={props.handleLogin} className="login-form">
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
    </Form>
  </div>
);

export default enhance(Login);
