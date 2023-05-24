import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';

import {docOptions} from '../../../../utils/constants/ProfileOptions';

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
import {getDoctorById} from '../../../../services/doctorServices';
import {getDoctorInfo} from '../../../../utils/helpers/getProfileInfo';
import {authUpdate} from '../../../../setup/redux/slices/auth.slice';
import Loader from '../../../../components/shared/Loader';
import {useCustomToast} from '../../../../hooks/useCustomToast';

const ProfileManagement = ({route}) => {
  const [profileOptions, setProfileOptions] = useState(docOptions);
  const [storedUser, setStoredUser] = useState(null);
  const [information, setInformation] = useState([]);
  const [activeOption, setActiveOption] = useState();

  const {showToast} = useCustomToast();

  const [loading, setLoading] = useState(false);

  const userId = route.params.userId;
  const isViewing = route.params.isViewing;
  const index = route.params.index;

  console.log(route.params, "DATA IN PROFILE VIEWING");

  const dispatch = useDispatch();

  const getUserData = async () => {
    setLoading(true);
    try {
      const response = await getDoctorById(userId);
      setStoredUser(response.data.data.user);
      if (!isViewing) dispatch(authUpdate({user: response.data.data.user}));
    } catch (err) {
      console.log(err);
      showToast("Can't load user data", 'danger');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (index) {
      onOptionClick(index);
    }
  }, []);

  useEffect(() => {
    if (userId) getUserData();
  }, [userId]);

  useEffect(() => {
    if (storedUser) {
      setInformation(getDoctorInfo(storedUser));
    }
  }, [storedUser]);

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

  const getActiveComponent = () => {
    console.log(activeOption);
    switch (activeOption) {
      case 'ProfileInformation':
        return (
          <ProfileInformation information={information} isViewing={isViewing} />
        );
      case 'Services':
        return (
          <Services
            services={storedUser.services}
            setStoredUser={setStoredUser}
            isViewing={isViewing}
          />
        );
      case 'AvailableTreatments':
        return (
          <AvailableTreatments
            setStoredUser={setStoredUser}
            treatments={storedUser.treatments}
            isViewing={isViewing}
          />
        );
      case 'Experiences':
        return (
          <Experiences
            setStoredUser={setStoredUser}
            experiences={storedUser?.experiences}
            isViewing={isViewing}
          />
        );
      case 'Reviews':
        return <Reviews />;
      case 'About':
        return (
          <About
            about={storedUser?.about}
            setStoredUser={setStoredUser}
            isViewing={isViewing}
          />
        );
      case 'Signature':
        return <Signature />;

      default:
        return <ProfileInformation information={information} />;
    }
  };

  return (
    <StaticContainer>
      {loading ? (
        <Loader title={'Loading'} />
      ) : (
        <View style={styles.root}>
          <ProfileCard user={storedUser} isViewing={isViewing} />

          <ProfileOptions
            options={profileOptions}
            onClick={onOptionClick}
            isViewing={isViewing}
          />
          {getActiveComponent()}
        </View>
      )}
    </StaticContainer>
  );
};

export default ProfileManagement;
