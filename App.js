//libraries App navigation
import Chatbot from './src/screens/patient/Chatbot';
import AppNavigation from './src/setup/navigation/app.navigation';

import DoctorNavigation from './src/setup/navigation/Doctor-Navigation/doctor.navigation';
import PatientNavigation from './src/setup/navigation/Patient-Navigation/patient.navigation';
import SplashScreen from 'react-native-splash-screen';
const App = () => {
  SplashScreen.hide();
  return <AppNavigation />;
};

export default App;
