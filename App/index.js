import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator, addNavigationHelpers } from 'react-navigation';
import { Provider, connect } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import SignIn from './SignIn';
import Dashboard from './Dashboard';
import { LOGIN_SUCCESS, LOGIN_START, LOGIN_FAILURE } from './actions';

const App = StackNavigator({
  SignIn: {
    screen: SignIn,
  },
  Dashboard: {
    screen: Dashboard,
  },
});

const initialAppState = {
  loading: false,
};
const appReducer = (state = initialAppState, action) => {
  switch(action.type) {
    case LOGIN_START:
      return { ...state, loading: true };
    case LOGIN_SUCCESS:
    case LOGIN_FAILURE:
      return { ...state, loading: false };
    default:
      return state;
  }
};

const initialNavState = App.router.getStateForAction(App.router.getActionForPathAndParams('SignIn'));
const navReducer = (state = initialNavState, action) => {
  const nextState = App.router.getStateForAction(action, state);
  return nextState || state;
};

const reducer = combineReducers({
  app: appReducer,
  nav: navReducer,
});

const store = createStore(reducer, applyMiddleware(thunk));

const App2 = (props) => (
  <App
    navigation={addNavigationHelpers({
      dispatch: props.dispatch,
      state: props.nav,
    })}
  />
);

const AppWithNavState = connect(state => ({
  nav: state.nav,
}))(App2);

export default () => (
  <Provider store={store}>
    <AppWithNavState />
  </Provider>
);
