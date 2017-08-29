import { createStore, applyMiddleware, compose } from 'redux';

import reducers from './reducers';
import promiseMiddleware from './middlewares/promiseMiddleware';

let middlewares;

if (global.window && global.window.__REDUX_DEVTOOLS_EXTENSION__ && process.env.NODE_ENV !== 'production') {
  middlewares = compose(
    applyMiddleware(promiseMiddleware),
    global.window.__REDUX_DEVTOOLS_EXTENSION__ && global.window.__REDUX_DEVTOOLS_EXTENSION__()
  );
} else {
  middlewares = compose(
    applyMiddleware(promiseMiddleware),
  );
}

export default createStore(
  reducers,
  {},
  middlewares
);
