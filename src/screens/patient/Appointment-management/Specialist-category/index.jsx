import {View, Text, Image, FlatList, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';

import {styles} from './styles';
import {Specialists} from '../../../../utils/constants/Specialists';
import StaticContainer from '../../../../containers/StaticContainer';
import SearchInput from '../../../../components/shared/SearchInput';
// import {FlatList} from 'react-native-gesture-handler';

import Icon from '../../../../assets/svgs/Backicon.svg';
import {useNavigation} from '@react-navigation/native';

const SpecialistCategory = () => {
  const [specialists, setSpecialists] = useState(Specialists);
  const [specialist, setSpecialist] = useState('');

  const navigation = useNavigation();

  const navigate = speciality => {
    navigation.navigate('App', {
      screen: 'DoctorsList',
      params: {speciality: speciality},
    });
  };

  const getSpecialityComponent = item => {
    return (
      <TouchableOpacity
        style={styles.specialistContainer}
        onPress={() => {
          navigate(item.label);
        }}>
        <View style={styles.specialistInfo}>
          <View style={styles.logoContainer}>
            <Image source={item.icon} style={styles.logo} />
          </View>

          <Text style={styles.title}>{item.label}</Text>
        </View>

        <View style={styles.iconContainer}>
          <Icon />
        </View>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    if (specialist) {
      setSpecialists(
        Specialists.filter(item =>
          item.label.toLowerCase().includes(specialist.toLowerCase()),
        ),
      );
    } else {
      setSpecialists(Specialists);
    }
  }, [specialist]);

  return (
    <StaticContainer
      customHeaderName={'Specialists'}
      customHeaderEnable={true}
      isBack={true}>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <SearchInput
            placeholder={'Search Specialist'}
            value={specialist}
            onChange={setSpecialist}
            type={'outlined'}
          />
        </View>
        <View style={styles.specialistsContainer}>
          <FlatList
            data={specialists}
            renderItem={({item}) => getSpecialityComponent(item)}
            keyExtractor={item => item.label}
          />
        </View>
      </View>
    </StaticContainer>
  );
};

export default SpecialistCategory;
