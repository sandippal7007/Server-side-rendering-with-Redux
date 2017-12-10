// server side store.
// Now question is why do we need server side store?
// Because we have a big challenge to detect when the initial loading of data
// is done for the meaningful paint.
// suppose we want to show some user list in SSR unitial paint. But how to detect that API call
// response came. To do all these thing, we need Redux setup for our server also.
// we don't write Providers here because we don't want to render anything on store change unlike client
import { createStore, applyMiddleware} from 'redux';
import reducers from '../client/reducers';

import thunk from 'redux-thunk';

export default () => {
  const store = createStore(reducers, {}, applyMiddleware(thunk));
  return store;
}
