import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import 'antd/dist/antd.css';

import createStore from './utils/createStore';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const history = createHistory();
const store = createStore(history);

const RootComp = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>
);

ReactDOM.render(<RootComp />, document.getElementById('root'));
registerServiceWorker();
