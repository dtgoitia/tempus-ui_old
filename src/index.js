import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import store from './store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';

import createApolloClient from './createClient';
import gql from "graphql-tag";

const client = createApolloClient();
client
  .query({
    query: gql`
    {
      sessions {
        name
        description
        notes
        start
        records {
          start
          end
          exercise {
            id
          }
        }
      }
    }
    `
  })
  .then(result => {
    console.log('the query to the backend returned this succesful reponse:')
    console.dir(result)
  })
  .catch(reason => {
    console.log('the query to the backend returned this error:')
    console.dir(reason)
  })

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
