
// // Start up point for APP

// import React from 'react';
// import ReactDOM from 'react-dom';
// // import Home from './components/Home';
// import Routes from './Routes';
// import {BrowserRouter} from 'react-router-dom';

// // ReactDOM.hydrate(<Home/>, document.getElementById('root'));





// // Here notice we give the same id 'root' which was specified in index.js of server. So we are telling React to add
// // all event handlers, lifecycle etc on to the same div. Now all event is there.
// // The button click will work now


// ReactDOM.hydrate(
//   <BrowserRouter>
//     <Routes/>
//   </BrowserRouter>, document.getElementById('root'));


/// Incorporating redux i.e creating a client side store. we need a server store too.
import 'babel-polyfill'; // To make use of async/await else we get regenaratorRunTime error

import { createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';
import {BrowserRouter} from 'react-router-dom';

import reducers from './reducers';


import {renderRoutes} from 'react-router-config';

// const store = createStore(reducers, {}, applyMiddleware(thunk));
// ReactDOM.hydrate(
//   <Provider store={store}>
//     <BrowserRouter>
//       <div>{renderRoutes(Routes)}</div>
//     </BrowserRouter>
//   </Provider>, document.getElementById('root'));


//////////////////////////////////////////////////////
//When we pass the server redux store state to client side

const store = createStore(reducers, window.INITIAL_STATE, applyMiddleware(thunk));
ReactDOM.hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <div>{renderRoutes(Routes)}</div>
    </BrowserRouter>
  </Provider>, document.getElementById('root'));
