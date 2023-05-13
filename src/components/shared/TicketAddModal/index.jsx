import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import ModalContainer from '../../../containers/ModalContainer';

import dimensions from '../../../utils/styles/themes/dimensions';
import colors from '../../../utils/styles/themes/colors';
import fonts from '../../../utils/styles/themes/fonts';

import DropDownPicker from 'react-native-dropdown-picker';
DropDownPicker.setListMode('SCROLLVIEW');

import Button from '../Button';

import {ValidateInputField} from '../Input';

import {useForm} from 'react-hook-form';

import {useSelector} from 'react-redux';

export default TicketAddModal = props => {
  const {Visible, setModalVisible, navigation, item} = props;
  const {control, handleSubmit, watch, setValue, reset} = useForm({
    mode: 'onChange',
    defaultValues: {
      subject: '',
      complaint: '',
      complainee: '',
    },
  });
  //console.log(item);

  const [open, setOpen] = useState(false);
  const [value, setVal] = useState(null);
  const [items, setItems] = useState([]);

  return (
    <ModalContainer
      isModalVisible={Visible}
      setModalVisible={setModalVisible}
      height={dimensions.Height / 1.6}
      width={dimensions.Width * 0.9}
      backDropOpacity={0.5}
      padding={dimensions.Height / 50}
      bgColor={colors.white}
      borderColor={colors.primary1}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Create Ticket</Text>
        </View>
        <View style={styles.body}>
          <ValidateInputField
            placeholder="Enter Subject"
            placeholderTextColor={colors.secondary1}
            control={control}
            name="subject"
            rules={{
              required: {
                value: true,
                message: 'Subject is required',
              },
            }}
            containerWidth={dimensions.Width * 0.8}
            inputHeight={dimensions.Height / 20}
            fontSize={fonts.size.font14}
            text={item ? item.subject : ''}
            title="Subject"
            type="outlined"
            watch={watch('subject')}
          />
          <ValidateInputField
            placeholder="Write complaint details"
            placeholderTextColor={colors.secondary1}
            control={control}
            name="complaint"
            rules={{
              required: {
                value: true,
                message: 'complaint is required',
              },
            }}
            containerWidth={dimensions.Width * 0.8}
            inputHeight={dimensions.Height / 6}
            fontSize={fonts.size.font14}
            text={item ? item.complaint : ''}
            multiline
            isFlexStart
            title="Complaint"
            type="outlined"
            watch={watch('complaint')}
          />
          <View style={styles.complaineeContainer}>
            <Text style={styles.Text}>Complainee</Text>
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setVal}
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
        </View>

        <View style={styles.ButtonContainer}>
          <Button
            label="Cancel"
            type="outlined"
            width={dimensions.Width / 3.5}
            height={dimensions.Height / 25}
            fontSize={fonts.size.font14}
          />
          <Button
            label="Post"
            type="filled"
            width={dimensions.Width / 3.5}
            height={dimensions.Height / 25}
            fontSize={fonts.size.font14}
          />
        </View>
      </View>
    </ModalContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: fonts.size.font16,
    fontWeight: fonts.weight.bold,
    color: colors.secondary1,
  },
  body: {
    justifyContent: 'space-evenly',
  },
  complaineeContainer: {},
  Text: {
    fontSize: fonts.size.font14,
    fontWeight: fonts.weight.bold,
    marginBottom: dimensions.Height * 0.01,
  },
  dropDown: {
    minHeight: dimensions.Height / 20,
    width: dimensions.Width * 0.8,
    backgroundColor: colors.white,
    borderRadius: 5,
    borderColor: colors.primary1,
    marginBottom: dimensions.Height * 0.01,
  },
  dropDownContainer: {
    borderRadius: 5,
    borderWidth: 0.1,
    backgroundColor: 'white',
  },

  ButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});
