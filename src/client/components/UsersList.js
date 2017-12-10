import React from 'react';
import {connect} from 'react-redux';

import {fetchUsers} from '../actions';

class UsersList extends React.Component {
  componentDidMount() {
  // this.props.fetchUsers(); // when we do SSR, this call is basically client side.
                             // if you open network tab and see users req, you can see only
                            // a html string with a div saying 'Here is a big list of users...'.
                            // But the list of user is not there in that HTML. so this html is sent to browser
                            // and our bundle.js calls fetchUsers() to load data and make client side rendering.

                  // But when we do this, we get a flicker behaviour in UI because server loads the user data
                  // in html and when the client bundle loads up, this call is made and the UI loads up the userdata
                  // again. Thestore is different here and server store doesn't make any data sending to client store.
                  //So we get screen flickering between this two time.
                  // But if you don't call it from UI, this.props.users will be empty on client side store reload. so no data.
                  // So this call is needed.

                  // When we pass data from the server store to client store, we don't see this flickering problem
                  // and this extra call from UI is also not needed.
  }

  renderUsers() {
    return this.props.users.map((user) => {
      return <li key={user.id}>{user.name}</li>
    });
  }

  render() {
    return(
      <div>
        Here is a big list of users...
          <ul>{this.renderUsers()}</ul>
      </div>
    )
  }
}

function loadData(store) { // This function will also be there in matchedRoutes of index.js if we add it in Routes.js
  console.log('Trying to load data'); // it will be consoled in server
  return store.dispatch(fetchUsers()); // fetchUsers returns a promise
}

function mapStateToProps(state) {
  return {
    users: state.users
  }
}

export { loadData };
export default connect(mapStateToProps, {fetchUsers}) (UsersList);
