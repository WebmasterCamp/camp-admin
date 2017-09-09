import { connect } from 'react-redux';
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
      this.props.history.push('/login');
    }
  })
);

const Logout = () => null;

export default enhance(Logout);
