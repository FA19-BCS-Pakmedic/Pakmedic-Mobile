import {View, Text, FlatList, TouchableOpacity, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';

import StaticContainer from '../../../../containers/StaticContainer';

import styles from './styles';
import DoctorSearchbar from '../../../../components/patient/DoctorSearchBar';
import {useSelector} from 'react-redux';
import ModalContainer from '../../../../containers/ModalContainer';
import colors from '../../../../utils/styles/themes/colors';
import dimensions from '../../../../utils/styles/themes/dimensions';

import Cities from '../../../../utils/constants/Cities';

import NextIcon from '../../../../assets/svgs/Backicon.svg';

import {filterDoctors} from '../../../../services/doctorServices';
import DoctorCard from '../../../../components/patient/DoctorCard';
import useCustomApi from '../../../../hooks/useCustomApi';
import Loader from '../../../../components/shared/Loader';
import NotFound from '../../../../components/shared/NotFound';

const DoctorsList = ({navigation, route}) => {
  console.log(route.params);
  const [doctors, setDoctors] = useState([]);
  const [speciality, setSpeciality] = useState(route.params.speciality);
  const [location, setLocation] = useState(route.params.location);
  const [keyword, setKeyword] = useState('');

  const {callApi, isLoading} = useCustomApi();

  const [visible, setVisible] = useState(false);

  const generateQuery = () => {
    let query = '';
    if (keyword) query += `${query.length === 0 ? '' : '&'}name=${keyword}`;
    if (speciality)
      query += `${query.length === 0 ? '' : '&'}speciality=${speciality}`;
    if (location)
      query += `${query.length === 0 ? '' : '&'}location=${location}`;

    return query;
  };

  useEffect(() => {
    const getDoctors = async query => {
      try {
        console.log(query);
        // const response = await filterDoctors(query);
        const data = await callApi(filterDoctors, query);
        // console.log(response.data.data.data);
        setDoctors(data.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    if (keyword || speciality || location) getDoctors(generateQuery());
  }, [keyword, speciality, location]);

  const openLocationModal = () => {
    return (
      <ModalContainer
        isModalVisible={visible}
        setModalVisible={setVisible}
        width={dimensions.Width / 1.1}
        type="center"
        backDropOpacity={0.5}
        padding={dimensions.Height / 50}
        height={dimensions.Height / 1.2}
        bgColor={'white'}
        borderColor={colors.primary1}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalHeader}>Select City</Text>
          <FlatList
            data={Cities}
            renderItem={renderItem}
            keyExtractor={item => item.value}
          />
        </View>
      </ModalContainer>
    );
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => {
          setLocation(item.value);
          setVisible(false);
        }}>
        <Text style={styles.itemText}>{item.label}</Text>
        <View style={styles.iconContainer}>
          <NextIcon />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      {openLocationModal()}

      <StaticContainer
        customHeaderName={'Speciality'}
        customHeaderEnable={true}
        isBack={true}>
        <DoctorSearchbar
          setVisible={setVisible}
          setKeyword={setKeyword}
          keyword={keyword}
          location={location}
        />
        <>
          {isLoading ? (
            <Loader title="Loading Doctors" />
          ) : doctors.length > 0 ? (
            <ScrollView style={styles.scrollContainer}>
              <View styles={styles.content}>
                {doctors.length > 0 &&
                  doctors.map((doctor, index) => {
                    return <DoctorCard key={index} doctor={doctor} />;
                  })}
              </View>
            </ScrollView>
          ) : (
            <View style={styles.notFoundContainer}>
              <NotFound
                title={'No Doctors Found'}
                text={
                  'Sorry, it seems like we don’t have any doctors registered for this speciality'
                }
                center
              />
            </View>
          )}
        </>
      </StaticContainer>
    </>
  );
};

export default DoctorsList;
