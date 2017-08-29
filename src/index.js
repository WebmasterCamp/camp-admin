import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'antd/dist/antd.css';

import App from './App';
import store from './ducks';
import registerServiceWorker from './registerServiceWorker';

const RootComp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(<RootComp />, document.getElementById('root'));
registerServiceWorker();
