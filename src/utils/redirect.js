import { compose, branch, renderNothing, lifecycle, renderComponent } from 'recompose';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

const authStateConnect = connect(
  state => ({
    isCheckedUser: state.auth.isCheckedUser,
    isLoggedIn: state.auth.isLoggedIn
  })
);

const createRedirectComponent = (path) => {
  return compose(
    connect(null, { push }),
    lifecycle({
      componentDidMount() {
        console.log('redirect', path);  
        this.props.push(path);
      }
    })
  )(() => null);
}

const RedirectToLogin = createRedirectComponent('/login');
const RedirectToPath = (path) => createRedirectComponent(path);

export const redirectIfLoggedIn = path => compose(
  authStateConnect,
  branch(
    props => !props.isCheckedUser,
    renderNothing
  ),
  branch(
    props => props.isLoggedIn,
    renderComponent(RedirectToPath(path))
  )
);

export const redirectIfNotLoggedIn = compose(
  authStateConnect,
  branch(
    props => !props.isCheckedUser,
    renderNothing
  ),
  branch(
    props => !props.isLoggedIn,
    renderComponent(RedirectToLogin)
  )
);
