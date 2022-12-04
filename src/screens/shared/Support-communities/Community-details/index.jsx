import {View, Text} from 'react-native';
import React, {useState} from 'react';
import StaticContainer from '../../../../containers/StaticContainer';
import DropDownPicker from 'react-native-dropdown-picker';
DropDownPicker.setListMode('SCROLLVIEW');
import {styles} from './styles';
import dimensions from '../../../../utils/styles/themes/dimensions';
import Search from '../../../../components/shared/CommunitySearch';

const CommunityDetails = ({route}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'C/Dermatologist', value: 'home'},
    {label: 'C/Dermatologist', value: 'haris'},
    {label: 'C/Dermatologist', value: 'moeed'},
    {label: 'C/Dermatologist', value: 'ali'},
  ]);

  const {communityName} = route.params;
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
        <Button />
      </View>
    </StaticContainer>
  );
};

export default CommunityDetails;
