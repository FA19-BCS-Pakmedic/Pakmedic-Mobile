import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
} from 'react-native';
import {React, useState} from 'react';
import StaticContainer from '../../../../containers/StaticContainer';
import {useNavigation} from '@react-navigation/native';

import {styles} from './styles';
import dimensions from '../../../../utils/styles/themes/dimensions';
import colors from '../../../../utils/styles/themes/colors';
import fonts from '../../../../utils/styles/themes/fonts';

import Button from '../../../../components/shared/Button';
import {riskOfDeath} from '../../../../services/doctorServices';

import PopupAlerts from '../../../../components/shared/PopupAlerts';

import {useForm} from 'react-hook-form';

import {RiskOfDeath1} from '../../../../components/doctor/ml/RiskOfDeath1';
import {RiskOfDeath2} from '../../../../components/doctor/ml/RiskOfDeath2';
import {RiskOfDeath3} from '../../../../components/doctor/ml/RiskOfDeath3';

const RiskOfDeath = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [alertName, setAlertName] = useState('LoginSuccess');
  const [level, setLevel] = useState(1);
  const [message, setMessage] = useState('No Risk Of Death');

  const numberRegex = /^\d+(\.\d+)?$/;

  const {control, handleSubmit, errors} = useForm({
    mode: 'onChange',
    initialValues: {
      Age: '',
      DiastolicBP: '',
      PovertyIndex: '',
      Race: '',
      RedBloodCells: '',
      SedimentationRate: '',
      SerumAlbumin: '',
      SerumCholesterol: '',
      SerumIron: '',
      SerumMagnesium: '',
      SerumProtein: '',
      Sex: '',
      SystolicBP: '',
      TIBC: '',
      TransferrinSaturation: '',
      Whitebloodcells: '',
      BMI: '',
      PulsePressure: '',
    },
  });

  //on submit of sign up form
  const onSubmit = async data => {
    if (level <= 2) {
      setLevel(level + 1);
    } else {
      try {
        setIsLoading(true);
        const response = await riskOfDeath(data);
        setIsLoading(false);
        if (
          response?.data?.data?.result === 'The Patient is not at Risk of Death'
        ) {
          setAlertName('LoginSuccess');
          setMessage('No 10-Year Risk of Death');
          setModalVisible(true);
        } else {
          setAlertName('LoginFailure');
          setMessage('10-Year Risk of Death Found');
          setModalVisible(true);
        }
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    }
  };

  return (
    <StaticContainer
      customHeaderEnable={true}
      customHeaderName={`Risk Of Death (${level}/3)`}>
      <View style={styles.container}>
        {level === 1 ? (
          <RiskOfDeath1
            control={control}
            handleSubmit={handleSubmit}
            errors={errors}
          />
        ) : level === 2 ? (
          <RiskOfDeath2
            control={control}
            handleSubmit={handleSubmit}
            errors={errors}
          />
        ) : (
          <RiskOfDeath3
            control={control}
            handleSubmit={handleSubmit}
            errors={errors}
          />
        )}
        <Button
          onPress={handleSubmit(onSubmit)}
          label={level <= 2 ? 'Next' : 'Fetch Results'}
          type="filled"
          width="100%"
          isLoading={isLoading}
        />
      </View>
      <PopupAlerts
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        height={1.8}
        width={1.2}
        timer={1500}
        alertName={alertName}
        message={message}
        redirect={{screen: 'DoctorTabStack'}}></PopupAlerts>
    </StaticContainer>
  );
};

export default RiskOfDeath;
