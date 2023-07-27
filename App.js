import React from 'react';
import Route from './src/navigation/routes';
import { Provider } from 'react-redux';
import store from './src/redux/store';

const App = () => {

  return (
    <Provider store={store}>
      <Route />
    </Provider>
  );
};

export default App;