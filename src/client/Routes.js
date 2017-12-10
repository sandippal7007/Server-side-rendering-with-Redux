// This Routes file should be used by both index.js(server) and client.js

import React from 'react';
import {Route} from 'react-router-dom';
import Home from './components/Home';
// import UsersList from './components/UsersList';

// export default () => {
//   return(
//     <div>
//       <Route exact path="/" component = {Home} />
//       { /*<Route exact path="/hi" component = {() => "Hi"} />*/ }
//       <Route path="/users" component = {UsersList} />
//     </div>

//   )
// }



// Now we will be using react-router-config library to know which sets of
// components to be rendered. But this syntax is different.
// It does not support JSX. it will be an array ob route objects.

import UsersList, { loadData } from './components/UsersList';


export default [
  {
    path: '/',
    component: Home,
    exact: true
  },
  {
    loadData, // this is the function we want to add in match routes
    path: '/users',
    component: UsersList
  }
]
