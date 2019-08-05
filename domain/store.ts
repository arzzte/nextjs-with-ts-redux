import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

export const exampleInitialState = {
  lastUpdate: 0,
  light: false,
  count: 0,
  message: 'bar',
};

export type State = {
  lastUpdate: number;
  light: boolean;
  count: number;
  message: string;
};

export const actionTypes = {
  TICK: 'TICK',
  HELLO_MESSAGE: 'HELLO_MESSAGE',
};

// REDUCERS
export const reducer = (state = exampleInitialState, action) => {
  switch (action.type) {
    case actionTypes.TICK:
      return Object.assign({}, state, {
        lastUpdate: action.ts,
        light: !!action.light,
      });
    case actionTypes.HELLO_MESSAGE:
      return Object.assign({}, state, {
        message: action.payload,
      });
    default:
      return state;
  }
};

// ACTIONS
export const serverRenderClock = (isServer) => (dispatch) => {
  return dispatch({ type: actionTypes.TICK, light: !isServer, ts: Date.now() });
};

export const startClock = (dispatch) => {
  return setInterval(() => {
    // Dispatch `TICK` every 1 second
    dispatch({ type: actionTypes.TICK, light: true, ts: Date.now() });
  }, 1000);
};

export const helloMessage = (payload) => (dispatch) => {
  return setTimeout(() => {
    return dispatch({ type: actionTypes.HELLO_MESSAGE, payload });
  }, 3000);
};

export function initializeStore(initialState = exampleInitialState) {
  return createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)));
}
