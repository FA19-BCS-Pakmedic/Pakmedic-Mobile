import {View, Text} from 'react-native';
import React, {useState, useEffect} from 'react';

import {patOptions} from '../../../../utils/constants/ProfileOptions';

import {styles} from './styles';
import ProfileCard from '../../../../components/shared/ProfileCard';
import StaticContainer from '../../../../containers/StaticContainer';
import ProfileOptions from '../../../../components/shared/ProfileOptions';
import ProfileInformation from '../../../../components/shared/ProfileInformation';
import FamilyMembers from '../../../../components/patient/FamilyMembers';
import Allergies from '../../../../components/patient/Allergies';
import GeneticDiseases from '../../../../components/patient/GeneticDiseases';

import {useDispatch} from 'react-redux';
import {getPatientById} from '../../../../services/patientServices';
import {getPatientInfo} from '../../../../utils/helpers/getProfileInfo';
import {authUpdate} from '../../../../setup/redux/slices/auth.slice';
import Loader from '../../../../components/shared/Loader';
import {useCustomToast} from '../../../../hooks/useCustomToast';

const ProfileManagement = ({navigation, route}) => {
  const [profileOptions, setProfileOptions] = useState(patOptions);
  const [storedUser, setStoredUser] = useState(null);
  const [information, setInformation] = useState([]);
  const [activeOption, setActiveOption] = useState();

  const {showToast} = useCustomToast();

  const [loading, setLoading] = useState(false);

  const userId = route.params.userId;

  const isViewing = route.params.isViewing;

  console.log(route.params, "DATA IN PROFILE VIEWING");


  const dispatch = useDispatch();

  const getUserData = async () => {
    setLoading(true);
    try {
      const response = await getPatientById(userId);
      setStoredUser(response.data.data.user);
      !isViewing && dispatch(authUpdate({user: response.data.data.user}));
    } catch (err) {
      console.log(err);
      showToast("Can't load user data", 'danger');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (storedUser) {
      // console.log(storedUser);
      setInformation(getPatientInfo(storedUser));
    }
  }, [storedUser]);

  useEffect(() => {
    if (userId) getUserData();
  }, [userId]);

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
      case 'General Info':
        return <ProfileInformation information={information} isViewing={isViewing}/>;
      case 'Genetic diseases':
        return (
          <GeneticDiseases
            geneDis={storedUser?.medical?.geneticDiseases}
            updateUser={getUserData}
            isViewing={isViewing}
          />
        );
      case 'Allergies':
        return (
          <Allergies
            allergys={storedUser?.medical?.allergies}
            updateUser={getUserData}
            isViewing={isViewing}
          />
        );
      case 'Family members':
        return (
          <FamilyMembers
            familyMembers={storedUser?.familyMembers}
            updateUser={getUserData}
            isViewing={isViewing}
          />
        );

      default:
        return <ProfileInformation information={information} isViewing={isViewing}/>;
    }
  };

  return (
    <StaticContainer>
      {loading ? (
        <Loader title={'Loading'} />
      ) : (
        <View style={styles.root}>
          <ProfileCard user={storedUser} isViewing={isViewing}/>

          <ProfileOptions options={profileOptions} onClick={onOptionClick} />
          {getActiveComponent()}
        </View>
      )} 
    </StaticContainer>
  );
};

export default ProfileManagement;
