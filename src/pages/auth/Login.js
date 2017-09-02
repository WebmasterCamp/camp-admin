import React from 'react';
import { Form, Icon, Input, Button, Layout } from 'antd';
import { connect } from 'react-redux';
import { compose, withState, withProps } from 'recompose';
import styled from 'styled-components';

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

const Container = styled.div`
  display: flex;
  background: #ccc;
  height: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #404040;  
`;

const FormContainer = styled(Form).attrs({
  className: 'login-form'
})`
  width: 300px;
  > div {
    margin-bottom: 15px;
  }
`;

const BrandingImg = styled.img.attrs({
  src: require('../../img/logo.png'),
  alt: 'branding'
})`
  width: 280px;
  display: block;
  margin: 0 auto;
`;

const Title = styled.h1`
  color: white;
  margin-bottom: 10px;
`;

const Login = props => (
  <Container>
    <BrandingImg />
    <Title>YWC15 Admin System</Title>
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

export default enhance(Login);
