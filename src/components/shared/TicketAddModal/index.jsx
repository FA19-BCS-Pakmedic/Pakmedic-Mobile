import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import ModalContainer from '../../../containers/ModalContainer';

import dimensions from '../../../utils/styles/themes/dimensions';
import colors from '../../../utils/styles/themes/colors';
import fonts from '../../../utils/styles/themes/fonts';

import DropDownPicker from 'react-native-dropdown-picker';
DropDownPicker.setListMode('SCROLLVIEW');

import {getDoctors} from '../../../services/doctorServices';
import {getPatients} from '../../../services/patientServices';
import {
  createComplaint,
  updateComplaint,
} from '../../../services/complaintServices';

import Button from '../Button';

import {ValidateInputField} from '../Input';

import {useForm} from 'react-hook-form';

import {useSelector} from 'react-redux';

export default TicketAddModal = props => {
  const {Visible, setModalVisible, navigation, item, edit, report, userData} =
    props;
  const role = useSelector(state => state.role.role);
  const id = useSelector(state => state.auth.user._id);

  const {control, handleSubmit, watch, setValue, reset} = useForm({
    mode: 'onChange',
    defaultValues: {
      subject: '',
      complaint: '',
      complainee: '',
      complaineeType: role === 'Doctor' ? 'Patient' : 'Doctor',
      complainantType: role === 'Doctor' ? 'Doctor' : 'Patient',
      complainant: id,
    },
  });

  React.useEffect(() => {
    if (edit) {
      reset({
        subject: item?.subject,
        complaint: item?.complaint,
        complainee: item?.complainee,
      });
    } else {
      reset({
        subject: '',
        complaint: '',
        complainee: '',
      });
    }
  }, [item]);

  const [open, setOpen] = useState(false);
  const [value, setVal] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    if (edit) {
      setVal(item?.complainee);
      console.log('Complainee', item?.complainee);
    } else {
      setVal(null);
    }
  }, [edit, item]);

  const getPatientsData = async () => {
    try {
      const res = await getPatients();
      //console.log(res.data);

      const data = Object.values(res.data.data.patients).map(item => {
        return {
          label: item.name,
          value: item._id,
        };
      });
      //console.log(data);
      setItems(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getDoctorsData = async () => {
    try {
      const res = await getDoctors();
      //console.log(res.data.data);
      const data = Object.values(res.data.data.data).map(item => {
        //console.log('ITEM', item);
        return {
          label: item.name,
          value: item._id,
        };
      });
      //console.log('DATA', data);
      setItems(data);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    if (role === 'Doctor') {
      getPatientsData();
      console.log('getPatients');
    } else {
      getDoctorsData();
    }
  }, [setModalVisible]);

  const onSubmit = async data => {
    if (value === null && !report) {
      alert('Please select complainee');
    } else {
      if (report) {
        data.subject = `${report} Report`;
        data.complainee = userData.complainee;
        data.complaineeType = userData.complaineeType;
        data.type = report;
      } else {
        data.complainee = value;
        data.complaineeType = role === 'Doctor' ? 'Patient' : 'Doctor';
      }
      data.complainant = id;

      data.complainantType = role === 'Doctor' ? 'Doctor' : 'Patient';
      console.log('storing this data', data);

      try {
        setLoading(true);
        if (!edit) {
          const res = await createComplaint(data);
          console.log(res.data);
          setLoading(false);
          setModalVisible(false);
        } else {
          const res = await updateComplaint(item._id, data);
          console.log(res.data);
          setLoading(false);
          setModalVisible(false);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  };

  return (
    <ModalContainer
      isModalVisible={Visible}
      setModalVisible={setModalVisible}
      height={report ? dimensions.Height * 0.37 : dimensions.Height / 1.6}
      width={dimensions.Width * 0.9}
      backDropOpacity={0.5}
      padding={dimensions.Height / 50}
      bgColor={colors.white}
      back={false}
      borderColor={colors.primary1}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>
            {edit
              ? 'Edit Ticket'
              : report
              ? `Report ${report}`
              : 'Create Ticket'}
          </Text>
        </View>
        <View style={styles.body}>
          {!report && (
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
              text={watch('subject')}
              title="Subject"
              type="outlined"
            />
          )}

          <ValidateInputField
            placeholder={
              report
                ? 'Write reason(s) for reporting'
                : 'Write Complaint details'
            }
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
            text={watch('complaint')}
            multiline
            isFlexStart
            title={report ? 'Reason' : 'Complaint'}
            type="outlined"
          />
          {!report && (
            <View style={styles.complaineeContainer}>
              <Text style={styles.Text}>Complainee</Text>
              <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setVal}
                setItems={setItems}
                searchable
                dropDownDirection="TOP"
                style={styles.dropDown}
                dropDownContainerStyle={styles.dropDownContainer}
                placeholder={'Select Complainee'}
                textStyle={{
                  fontSize: 12,
                }}
                maxHeight={dimensions.Height * 0.2}
              />
            </View>
          )}
        </View>

        <View style={styles.ButtonContainer}>
          <Button
            label="Cancel"
            type="outlined"
            width={dimensions.Width / 3.5}
            height={dimensions.Height / 25}
            fontSize={fonts.size.font14}
            onPress={() => {
              setModalVisible(false);
            }}
          />
          <Button
            label={report ? 'Report' : edit ? 'Update' : 'Create'}
            type="filled"
            width={dimensions.Width / 3.5}
            height={dimensions.Height / 25}
            fontSize={fonts.size.font14}
            isLoading={loading}
            isDisabled={loading}
            onPress={handleSubmit(onSubmit)}
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
    //borderRadius: 5,
    borderColor: colors.primary1,
    marginBottom: dimensions.Height * 0.01,
  },
  dropDownContainer: {
    //borderRadius: 5,
    borderWidth: 0.1,
    backgroundColor: 'white',
  },

  ButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});
