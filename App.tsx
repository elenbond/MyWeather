import React from 'react';
import { Provider } from 'react-redux';

import AppNavigator from './src/navigation/AppNavigation';
import store from './src/redux/store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}

export default App;
