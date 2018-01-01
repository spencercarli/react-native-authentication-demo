import { NavigationActions } from 'react-navigation';

export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const login = () => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(loginStart());
      const num = Math.random();
      // Simulate network latency
      setTimeout(() => {
        if (num <= 0.5) {
          // Simulate successful login
          dispatch(loginSuccess());
        } else {
          // Simulate failed login
          dispatch(loginFailure());
        }
      }, 500);
    });
  };
};

export const loginStart = () => ({
  type: LOGIN_START,
});

export const loginSuccess = () => {
  return (dispatch) => {
    dispatch({ type: LOGIN_SUCCESS });
    dispatch(NavigationActions.navigate({ routeName: 'Dashboard' }))
  };
};

export const loginFailure = () => {
  return (dispatch) => {
    dispatch({ type: LOGIN_FAILURE });
    alert('log in failed');
  };
};
