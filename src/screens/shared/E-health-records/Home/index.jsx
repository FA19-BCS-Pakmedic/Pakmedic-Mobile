import {View, Text, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';

import styles from './styles';
import {useSelector, useDispatch} from 'react-redux';
import StaticContainer from '@/containers/StaticContainer';
import EhrSwitch from '@/components/shared/EhrSwitch';

import EhrOptions from '@/utils/constants/EhrOptions';
import AddFilterBar from '@/components/shared/AddFilterBar';
import Scans from '../../../../components/shared/Scans';
import {getPatient} from '../../../../services/patientServices';
import {authSuccess} from '../../../../setup/redux/actions';
import Reports from '../../../../components/shared/Reports';

const ElectronicHealthRecords = () => {
  const role = useSelector(state => state.role.role);
  const user = useSelector(state => state.auth.user);

  const [storedUser, setStoredUser] = useState(user);

  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [options, setOptions] = useState(EhrOptions);
  const [activeOption, setActiveOption] = useState(EhrOptions[0].label);

  useEffect(() => {
    setActiveOption(options.find(option => option.isActive).label);
  }, [options]);

  const onOptionPress = index => {
    setOptions(prevOptions => {
      return prevOptions.map((option, i) => {
        if (i === index) {
          return {...option, isActive: true};
        } else {
          return {...option, isActive: false};
        }
      });
    });
  };

  const updateUser = async () => {
    try {
      const response = await getPatient();
      dispatch(
        authSuccess({
          user: response.data.data.user,
          token: response.data.data.token,
        }),
      );
      setStoredUser(response.data.data.user);
    } catch (err) {
      console.log(err);
    }
  };

  const getEHR = () => {
    switch (activeOption) {
      case 'Scans':
        return (
          <Scans
            scans={storedUser.scans}
            visible={visible}
            setVisible={setVisible}
            updateUser={updateUser}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
          />
        );
      case 'Reports':
        return (
          <Reports
            reports={storedUser.reports}
            visible={visible}
            setVisible={setVisible}
            updateUser={updateUser}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
          />
        );
      case 'Prescriptions':
        return <Text>Prescriptions</Text>;
      default:
        return null;
    }
  };

  return (
    <StaticContainer
      isBack={true}
      customHeaderName={'Electronic Health Records'}
      customHeaderEnable={true}
      isHorizontalPadding={false}>
      <View style={styles.container}>
        {/* switch container */}
        <View style={styles.section}>
          <EhrSwitch
            role={role}
            options={options}
            onOptionPress={onOptionPress}
          />
        </View>
        {/* add filter bar container */}
        <View style={styles.section}>
          <AddFilterBar setVisible={setVisible} setIsEdit={setIsEdit} />
        </View>
        {/* main content container */}
        <View style={styles.section}>{getEHR()}</View>
      </View>
    </StaticContainer>
  );
};

export default ElectronicHealthRecords;
