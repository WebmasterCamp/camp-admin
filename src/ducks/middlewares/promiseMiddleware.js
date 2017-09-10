import { message } from 'antd';

export default () => next => (action) => {
  if (!action.promise) {
    return next(action);
  }
  next({
    ...action,
    type: action.type.PENDING,
  });
  const actionPromise = new Promise((resolve, reject) =>
    action.promise
      .then(response => {
        if (action.success) {
          message.success(action.success);
        }
        return resolve(
          next({ ...action, type: action.type.RESOLVED, ...response })
        )}
      )
      .catch(error => {
        if (action.error) {
          message.error(action.error);
        }
        return reject(
          next({ ...action, type: action.type.REJECTED, error })
        )}
      )
  );
  return actionPromise;
};
