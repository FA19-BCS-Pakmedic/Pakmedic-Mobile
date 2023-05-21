import {View, Text, FlatList, ActivityIndicator} from 'react-native';
import React, {useState} from 'react';
import StaticContainer from '../../../../containers/StaticContainer';
import DropDownPicker from 'react-native-dropdown-picker';
DropDownPicker.setListMode('SCROLLVIEW');
import {styles} from './styles';
import dimensions from '../../../../utils/styles/themes/dimensions';
import Search from '../../../../components/shared/CommunitySearch';
import AddMore from '../../../../components/shared/AddMore';
import CommunityPostCard from '../../../../components/shared/CommunityPostCard';
import CommunityPostImage from '../../../../assets/images/CommunityPostImage.png';

import CommunityPostAdd from '../../../../components/shared/CommunityPostAdd';

import {getPosts} from '../../../../services/communityServices';
import {useEffect} from 'react';

import colors from '../../../../utils/styles/themes/colors';
import {useSelector} from 'react-redux';
import NotFound from '../../../../components/shared/NotFound';

import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import PostLoader from './PostLoader';
import ROLES from '../../../../utils/constants/ROLES';

//refresh on Focus
import {useIsFocused} from '@react-navigation/native';

const CommunityDetails = props => {
  const {item} = props.route.params;
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [checkDelete, setCheckDelete] = React.useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);

  const isFocused = useIsFocused();

  const [refresh, setRefresh] = useState(false);

  const role = useSelector(state => state.role.role);

  const [posts, setPosts] = useState([]);

  const [loading, setLoading] = useState(false);

  const getPost = async () => {
    setLoading(true);
    const res = await getPosts(`community=${item._id}`);
    setPosts(res.data.data.data);
    setLoading(false);
  };
  useEffect(() => {
    getPost();
  }, [isModalVisible, checkDelete, isFocused]);

  // const communityCards = [
  //   {
  //     id: 1,
  //     label: 'C/Dermatologist',
  //     user: 'Anonymous',
  //     title: 'Practice Kegel for a Better Health',
  //     description:
  //       " It is a long established fact that a reader will be distracted by thereadable content of a page when looking at its layout. The point ofusing Lorem Ipsum is that it has a more-or-less normal distribution ofletters, as opposed to using 'Content here, content here', making itlook like readable English.",
  //     image: CommunityPostImage,
  //   },
  //   {
  //     id: 2,
  //     label: 'C/Dermatologist',
  //     user: 'Ali Hamza',
  //     title: 'Practice Kegel for a Better Health',
  //     description:
  //       " It is a long established fact that a reader will be distracted by thereadable content of a page when looking at its layout. The point ofusing Lorem Ipsum is that it has a more-or-less normal distribution ofletters, as opposed to using 'Content here, content here', making itlook like readable English.",
  //     image: CommunityPostImage,
  //   },
  //   {
  //     id: 3,
  //     label: 'C/Dermatologist',
  //     user: 'Haris Zia',
  //     title: 'Practice Kegel for a Better Health',
  //     description:
  //       " It is a long established fact that a reader will be distracted by thereadable content of a page when looking at its layout. The point ofusing Lorem Ipsum is that it has a more-or-less normal distribution ofletters, as opposed to using 'Content here, content here', making itlook like readable English.",
  //     image: CommunityPostImage,
  //   },
  //   {
  //     id: 4,
  //     label: 'C/Dermatologist',
  //     user: 'Abdul Moeed',
  //     title: 'Practice Kegel for a Better Health',
  //     description:
  //       " It is a long established fact that a reader will be distracted by thereadable content of a page when looking at its layout. The point ofusing Lorem Ipsum is that it has a more-or-less normal distribution ofletters, as opposed to using 'Content here, content here', making itlook like readable English.",
  //     image: CommunityPostImage,
  //   },
  // ];

  return (
    <StaticContainer customHeaderEnable={true} customHeaderName={item.name}>
      <View style={styles.container}>
        <View style={styles.search}>
          <View>
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              style={[styles.dropDown, {backgroundColor: role === ROLES.doctor ? colors.secondaryMonoChrome100 : colors.primaryMonoChrome100}]}
              dropDownContainerStyle={styles.dropDownContainer}
              placeholder={item.name}
              textStyle={{
                fontSize: 12,
              }}
              maxHeight={dimensions.Height * 0.15}
            />
          </View>
          <Search />
        </View>
        <View style={styles.icon}>
          <AddMore
            type={'filled'}
            label={'Add More'}
            role={role}
            onPress={() => setModalVisible(true)}
          />
        </View>
        {loading ? (
          <View style={{flex: 1, flexDirection: 'column'}}>
            <PostLoader />
            <PostLoader />
          </View>
        ) : posts.length === 0 ? (
          <NotFound
            title="No Posts Found"
            text="Sorry we couldn't find any posts for this community try adding one"
          />
        ) : (
          <FlatList
            data={posts}
            style={styles.flatList}
            keyExtractor={item => item._id}
            renderItem={({item}) => (
              <CommunityPostCard
                item={item}
                Delete={checkDelete}
                setDelete={setCheckDelete}
              />
            )}
          />
        )}
      </View>
      <CommunityPostAdd
        Visible={isModalVisible}
        setModalVisible={setModalVisible}
        item={item}
      />
    </StaticContainer>
  );
};

export default CommunityDetails;
