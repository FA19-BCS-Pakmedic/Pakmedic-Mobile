// app entry point
import AppNavigation from './src/setup/navigation/app.navigation';


// your entry point
import {MenuProvider} from 'react-native-popup-menu';

//redux toolkit store
import {Provider} from 'react-redux';
import {store} from './src/setup/redux/store';

// fetch logger
// global._fetch = fetch;
// global.fetch = function (uri, options, ...args) {
//   return global._fetch(uri, options, ...args).then(response => {
//     console.log('Fetch', {request: {uri, options, ...args}, response});
//     return response;
//   });
// };

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
