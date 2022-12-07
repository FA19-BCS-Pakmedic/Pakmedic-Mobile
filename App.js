// app entry point
import AppNavigation from './src/setup/navigation/app.navigation';

//redux toolkit store
import {Provider} from 'react-redux';
import {store} from './src/setup/redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
};

export default App;
