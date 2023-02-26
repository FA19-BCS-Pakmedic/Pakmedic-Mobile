import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';

import {options} from '../../../../utils/constants/ProfileOptions';

// import SkeletonContent from 'react-native-skeleton-content';

import {styles} from './styles';
import ProfileCard from '../../../../components/shared/ProfileCard';
import StaticContainer from '../../../../containers/StaticContainer';
import ProfileOptions from '../../../../components/shared/ProfileOptions';
import ProfileInformation from '../../../../components/shared/ProfileInformation';
import Services from '../../../../components/doctor/Services';
import AvailableTreatments from '../../../../components/doctor/Available-Treatments';
import Experiences from '../../../../components/doctor/Experience';
import Reviews from '../../../../components/doctor/Reviews';
import About from '../../../../components/doctor/About';
import Signature from '../../../../components/doctor/Signature';
import {useDispatch, useSelector} from 'react-redux';
import {getDoctor} from '../../../../services/doctorServices';
import {setLoading} from '../../../../setup/redux/slices/loading.slice';
import {getDoctorInfo} from '../../../../utils/helpers/getProfileInfo';

const ProfileManagement = () => {
  const [profileOptions, setProfileOptions] = useState(options);
  const [storedUser, setStoredUser] = useState(null);
  const [information, setInformation] = useState([]);
  const [loadProfile, setLoadProfile] = useState(null);

  const user = useSelector(state => state.auth.user);

  const isLoading = useSelector(state => state.loading.loading);

  const dispatch = useDispatch();

  const [activeOption, setActiveOption] = useState();

  const getUserData = async () => {
    dispatch(setLoading(true));
    try {
      const response = await getDoctor();
      setStoredUser(response.data.data.user);
    } catch (err) {
      console.log(err);
    }
    dispatch(setLoading(false));
  };

  useEffect(() => {
    getUserData();
  }, [user]);

  useEffect(() => {
    if (storedUser) {
      // console.log(storedUser);
      setInformation(getDoctorInfo(storedUser));
    }
  }, [storedUser]);

  useEffect(() => {
    setLoadProfile(true);
  }, [information]);

  const onOptionClick = index => {
    setProfileOptions(prevState => {
      return prevState.map((option, i) => {
        if (i === index) {
          setActiveOption(option.value);
          return {...option, isActive: true};
        } else {
          return {...option, isActive: false};
        }
      });
    });
  };

  const updateUser = () => {
    getUserData();
  };

  const getActiveComponent = () => {
    switch (activeOption) {
      case 'ProfileInformation':
        <ProfileInformation information={information} />;
      case 'Services':
        return (
          <Services services={storedUser.services} updateUser={updateUser} />
        );
      case 'AvailableTreatments':
        return <AvailableTreatments />;
      case 'Experiences':
        return <Experiences />;
      case 'Reviews':
        return <Reviews />;
      case 'About':
        return <About />;
      default:
        return <ProfileInformation information={information} />;
    }
  };

  return (
    <StaticContainer>
      <View style={styles.root}>
        <ProfileCard />
        <ProfileOptions options={profileOptions} onClick={onOptionClick} />
        {getActiveComponent()}
      </View>
    </StaticContainer>
  );
};

export default ProfileManagement;
