// const express = require('express');

// const React = require('react');
// const renderToString = require('react-dom/server').renderToString;
// const Home = require('./client/components/Home').default;

////// Now universal JS means we should have same format for both server side and client side. So no common js.

import 'babel-polyfill'; // To make use of async/await else we get regenaratorRunTime error
import express from 'express';
import React from 'react';
import {renderToString} from 'react-dom/server';
// import Home from './client/components/Home';
import Routes from './client/Routes';
import {StaticRouter} from 'react-router-dom'; // Because Server does not understand BrowserRouter
import createStore from './helpers/createStore';

import {Provider} from 'react-redux';



const app = express();

app.use(express.static('public'));
// app.get('/', (req, res) => {
//   const content = renderToString(<Home />); // But Node will not recognize JSX. it will throw error. So we need babel,webpack
//   // content will be a simple string
//   const html = `
//     <html>
//       <head></head>
//       <body>
//         <div id="root">${content}</div>
//         <script src="bundle.js"></script>
//       </body>
//     </html>
//   `
//   res.send(html);
// })

////////////Incorporating StaticRouter for handling all the routes. Above one is only / route for Home component.


// app.get('*', (req, res) => { // * for any routes. Static router doesn't have any url path detect unlike BrowserRouter
//   // so we pass the path as req.path
//   const content = renderToString(
//     <StaticRouter location={req.path} context={{}}>
//       <Routes />
//     </StaticRouter>
//   );
//   // content will be a simple string
//   const html = `
//     <html>
//       <head></head>
//       <body>
//         <div id="root">${content}</div>
//         <script src="bundle.js"></script>
//       </body>
//     </html>
//   `
//   res.send(html);
// })
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//// Incorporating Redux to detect the initial loading of data///////


//  app.get('*', (req, res) => { // * for any routes. Static router doesn't have any url path detect unlike BrowserRouter
//   // so we pass the path as req.path
//   const store = createStore();
//   // some logic to initialize and load data
//   const content = renderToString(
//     <Provider store={store}>
//       <StaticRouter location={req.path} context={{}}>
//         <Routes />
//       </StaticRouter>
//     </Provider>
//   );
//   // content will be a simple string
//   const html = `
//     <html>
//       <head></head>
//       <body>
//         <div id="root">${content}</div>
//         <script src="bundle.js"></script>
//       </body>
//     </html>
//   `
//   res.send(html);
// })

// Note: When /users route will come
 // if you open network tab and see users res, you can see only
// a html string with a div saying 'Here is a big list of users...'.
// But the list of user is not there in that HTML. so this html is sent to browser
// and our bundle.js calls fetchUsers() to load data and make client side rendering.
// The problem here is the html is formed immediately with content and sent to browser
// and component is rendered and fetchUser is called. So we need to find some way
// to detect the component WITHOUT being rendered.
// There comes React-router-config and matchRoutes.
// when you write <Routes />, it means it will render that component but it is not desired.
// so we have to figure out the component w/o being rendered.


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////// React router config ///////////////////////
//Now Routes is an array of objects. So renderRoutes is required

// import {matchRoutes} from 'react-router-config';
// import {renderRoutes} from 'react-router-config'; // It internally changes the object format to JSX kind.

// app.get('*', (req, res) => { // * for any routes. Static router doesn't have any url path detect unlike BrowserRouter
//   // so we pass the path as req.path
//   const store = createStore();

//   console.log(matchRoutes(Routes, req.path)); // [ { route:
//                                               //  { loadData: [Function: loadData],
//                                               //    path: '/users',
//                                               //    component: [Object] },
//                                               // match: { path: '/users', url: '/users', isExact: true, params: {} } } ]
//   // Now we know based on URL which component we need to render without rendering that component

//   const content = renderToString(
//     <Provider store={store}>
//       <StaticRouter location={req.path} context={{}}>
//         <div>{renderRoutes(Routes)}</div>
//       </StaticRouter>
//     </Provider>
//   );
//   // content will be a simple string
//   const html = `
//     <html>
//       <head></head>
//       <body>
//         <div id="root">${content}</div>
//         <script src="bundle.js"></script>
//       </body>
//     </html>
//   `
//   res.send(html);
// })
///// Note -- matchroutes will give you multiple routes, but how do you get to
// know which routes has the loadData function. So we will map through the matchRoutes



// import {matchRoutes} from 'react-router-config';
// import {renderRoutes} from 'react-router-config'; // It internally changes the object format to JSX kind.

// app.get('*', (req, res) => { // * for any routes. Static router doesn't have any url path detect unlike BrowserRouter
//   // so we pass the path as req.path
//   const store = createStore();

//   const promises = matchRoutes(Routes, req.path).map((item) => {
//     return item.route.loadData ? item.route.loadData(store) : null // This will execute the loadData of UserList component.
//                                                               // The check is because Home route doesn't have a loadData fn.
//                                                               // we pass server side redux store to loadData to tell that all of our
//                                                               // loadData function has access to server side redux store
//   })
//   console.log(promises);// this promise is indication of loadData call to be completed.
//   // So we need to check the promise state.
//   // we form the HTML when we have the data.
//   // Now the html has all the list of users and this is sent to user
//   // We are calling loadData from server side, putting the data in redux store,
//   // and render the application and send it to user.

//   // The store is full of data now. Content will have li tag with all users
//   Promise.all(promises)
//   .then(() => {
//     const content = renderToString(
//     <Provider store={store}>
//       <StaticRouter location={req.path} context={{}}>
//         <div>{renderRoutes(Routes)}</div>
//       </StaticRouter>
//     </Provider>
//   );
//   // content will be a simple string. If you delete the script tag still you can see, all the user is loaded.
//   const html = `
//     <html>
//       <head></head>
//       <body>
//         <div id="root">${content}</div>
//         <script src="bundle.js"></script>
//       </body>
//     </html>
//   `
//   res.send(html);
//   })
// })

// Note: Now when you go to /users, the html will have complete list of users that came from server
// but suddenly the screen became blank and come back with all the users.
// This is because we have two different store. Server store is full of data and when the html is sent
// to browser by server, this server store is thrown away. After loading bundle.js, client store is created
// with empty state and fetchUser() is called from UI and client state is filled. So between this time we get
// nothing in page. The solution of this problem is to pass the server side store to client and client rehydrate
// from this loaded store from server. This sore data i.e userLists will be passed in HTML template and client.js
// will accept it.



///////////////////////////////////////////////////////
// passing the server store to client

import {matchRoutes} from 'react-router-config';
import {renderRoutes} from 'react-router-config'; // It internally changes the object format to JSX kind.

app.get('*', (req, res) => { // * for any routes. Static router doesn't have any url path detect unlike BrowserRouter
  // so we pass the path as req.path
  const store = createStore();

  const promises = matchRoutes(Routes, req.path).map((item) => {
      return item.route.loadData ? item.route.loadData(store) : null
    })
  console.log(promises);

  // The server store is full of data now. Content will have li tag with all users.
  // In the script tag we pass the initial state as window object and client.js
  // createStore function will access this state as 2nd arguements.
  Promise.all(promises)
  .then((resp) => {
    console.log(store)
    const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.path} context={{}}>
        <div>{renderRoutes(Routes)}</div>
      </StaticRouter>
    </Provider>
  );
  // content will be a simple string. If you delete the script tag still you can see
  // Now we don't need the fetchUser() call from page componentDidMount
  // as our server store feeds the data to client. so no extra call from UI is required to
  // fill up the page. No screen blank now.
  const html = `
    <html>
      <head></head>
      <body>
        <div id="root">${content}</div>
        <script>
          window.INITIAL_STATE = ${JSON.stringify(store.getState())}
        </script>
        <script src="bundle.js"></script>
      </body>
    </html>
  `
  res.send(html);
  })
})


app.listen(3000, () => {
  console.log('Your server is running on port 3000');
})
