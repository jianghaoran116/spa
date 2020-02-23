import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose,
} from 'redux';
import ThunkMiddleware from 'redux-thunk';
import { routerReducer } from 'react-router-redux';
import createFetchMiddleware from 'redux-composable-fetch';
import rootReducer from './reducers';
// import DevTools from '../containers/dev-tools';

// function getDefaultState(initialState) {
//   return global.appData || initialState || {};
// }
// console.log(rootReducer);
// const reducer = combineReducers({
//   ...rootReducer,
// });

// export default function configureStore(initialState) {
//   const store = createStore(
//     reducer,
//     getDefaultState(initialState),
//     compose(applyMiddleware(thunkMiddleware), DevTools.instrument()),
//   );
//   return store;
// }

const FetchMiddleware = createFetchMiddleware({
  afterFetch({ action, result }) {
    return result.json().then((data) => {
      Promise.resolve({
        action,
        result: data,
      });
    });
  },
});

const finalCreateStore = compose(
  applyMiddleware(ThunkMiddleware, FetchMiddleware),
  // DevTools.instrument(),
  window.devToolsExtension ? window.devToolsExtension() : f => f,
)(createStore);

const reducer = combineReducers(Object.assign({}, rootReducer, {
  routing: routerReducer,
}));

export default function configureStore(initialState) {
  const store = finalCreateStore(reducer, initialState);

  return store;
}
