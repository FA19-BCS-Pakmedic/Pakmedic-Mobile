import {View, Text, FlatList} from 'react-native';
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

import {getCommunityPosts} from '../../../../services/postServices';
import {useEffect} from 'react';

const CommunityDetails = ({route}) => {
  const {communityName, item} = route.params;
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'C/Dermatologist', value: 'home'},
    {label: 'C/Dermatologist', value: 'haris'},
    {label: 'C/Dermatologist', value: 'moeed'},
    {label: 'C/Dermatologist', value: 'ali'},
  ]);

  //get community posts

  const [posts, setPosts] = useState([]);
  const getPosts = async () => {
    const res = await getCommunityPosts();
    setPosts(res.data.data.posts);
  };
  useEffect(() => {
    getPosts();
  }, [isModalVisible]);

  const communityCards = [
    {
      id: 1,
      label: 'C/Dermatologist',
      user: 'Anonymous',
      title: 'Practice Kegel for a Better Health',
      description:
        " It is a long established fact that a reader will be distracted by thereadable content of a page when looking at its layout. The point ofusing Lorem Ipsum is that it has a more-or-less normal distribution ofletters, as opposed to using 'Content here, content here', making itlook like readable English.",
      image: CommunityPostImage,
    },
    {
      id: 2,
      label: 'C/Dermatologist',
      user: 'Ali Hamza',
      title: 'Practice Kegel for a Better Health',
      description:
        " It is a long established fact that a reader will be distracted by thereadable content of a page when looking at its layout. The point ofusing Lorem Ipsum is that it has a more-or-less normal distribution ofletters, as opposed to using 'Content here, content here', making itlook like readable English.",
      image: CommunityPostImage,
    },
    {
      id: 3,
      label: 'C/Dermatologist',
      user: 'Haris Zia',
      title: 'Practice Kegel for a Better Health',
      description:
        " It is a long established fact that a reader will be distracted by thereadable content of a page when looking at its layout. The point ofusing Lorem Ipsum is that it has a more-or-less normal distribution ofletters, as opposed to using 'Content here, content here', making itlook like readable English.",
      image: CommunityPostImage,
    },
    {
      id: 4,
      label: 'C/Dermatologist',
      user: 'Abdul Moeed',
      title: 'Practice Kegel for a Better Health',
      description:
        " It is a long established fact that a reader will be distracted by thereadable content of a page when looking at its layout. The point ofusing Lorem Ipsum is that it has a more-or-less normal distribution ofletters, as opposed to using 'Content here, content here', making itlook like readable English.",
      image: CommunityPostImage,
    },
  ];

  return (
    <StaticContainer customHeaderEnable={true} customHeaderName={communityName}>
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
              style={styles.dropDown}
              dropDownContainerStyle={styles.dropDownContainer}
              placeholder="Home"
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
            onPress={() => setModalVisible(true)}
          />
        </View>
        <FlatList
          data={posts}
          style={styles.flatList}
          keyExtractor={item => item._id}
          renderItem={({item}) => <CommunityPostCard item={item} />}
        />
      </View>
      <CommunityPostAdd
        Visible={isModalVisible}
        setModalVisible={setModalVisible}
      />
    </StaticContainer>
  );
};

export default CommunityDetails;
