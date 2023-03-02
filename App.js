// app entry point
import AppNavigation from './src/setup/navigation/app.navigation';


// your entry point
import {MenuProvider} from 'react-native-popup-menu';

//redux toolkit store
import {Provider} from 'react-redux';
import {store} from './src/setup/redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <MenuProvider>
        <AppNavigation />
      </MenuProvider>
    </Provider>
  );
};

export default App;
