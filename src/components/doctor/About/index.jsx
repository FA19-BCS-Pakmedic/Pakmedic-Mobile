import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Button from '../../shared/Button';
import {ModalInputField} from '../../shared/Input';
import ModalContainer from '../../../containers/ModalContainer';
import colors from '../../../utils/styles/themes/colors';
import dimensions from '../../../utils/styles/themes/dimensions';
import {useForm} from 'react-hook-form';
import fonts from '../../../utils/styles/themes/fonts';
import {updateDoctor} from '../../../services/doctorServices';

const About = ({about, setStoredUser, isViewing}) => {
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
    setValue,
    clearErrors,
    watch,
  } = useForm({
    mode: 'all',
    revalidate: 'all',
    defaultValues: {
      about: '',
    },
  });

  const onSubmit = async value => {
    let response;
    setIsLoading(true);
    try {
      response = await updateDoctor({about: value.about});
    } catch (err) {
      console.log(err);
    } finally {
      setStoredUser(response.data.data.user);
      setIsLoading(false);
      setVisible(false);
    }
  };

  const openModal = () => {
    return (
      <>
        <ModalContainer
          isModalVisible={visible}
          setModalVisible={setVisible}
          width={dimensions.Width / 1.1}
          type="center"
          backDropOpacity={0.5}
          padding={dimensions.Height / 50}
          height={dimensions.Height / 2.3}
          bgColor={'white'}
          borderColor={colors.primary1}>
          <View style={styles.modalContainer}>
            <View style={styles.headingContainer}>
              <Text style={styles.heading}>Add About</Text>
            </View>
            <View style={styles.infoContainer}>
              <View style={styles.inputContainer}>
                <ModalInputField
                  placeholder="About"
                  isMultiline={true}
                  type="outlined"
                  width={dimensions.Width / 1.2}
                  height={dimensions.Height / 5}
                  placeholderTextColor={colors.secondary1}
                  control={control}
                  name="about"
                  text={watch('about')}
                />
              </View>
            </View>
            <View style={styles.controls}>
              <Button
                type="outlined"
                label="Cancel"
                onPress={() => {
                  setVisible(false);
                }}
                width={dimensions.Width / 2.6}
              />
              <Button
                type="filled"
                label="Save"
                onPress={handleSubmit(onSubmit)}
                isLoading={isLoading}
                width={dimensions.Width / 2.6}
              />
            </View>
          </View>
        </ModalContainer>
      </>
    );
  };

  return (
    <View style={styles.container}>
      {openModal()}

      <View style={styles.mainContainer}>
        {about !== '' && (
          <View>
            <Text style={styles.headerText}>About Me</Text>
          </View>
        )}

        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.scrollContainer}>
            {!about ? (
              <Text style={[styles.headerText, {textAlign: 'center'}]}>
                No About Added
              </Text>
            ) : (
              <Text style={styles.text}>
                {about}
              </Text>
            )}
          </View>
        </ScrollView>
      {!isViewing &&
        <View style={styles.btnContainer}>
          <Button
            type="filled"
            label={`${about === '' ? 'Add' : 'Edit'} About`}
            onPress={() => {
              setValue('about', about);
              setVisible(prevState => !prevState);
            }}
            width={dimensions.Width / 2}
          />
        </View>}
      </View>
    </View>
  );
};

export default About;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  mainContainer: {
    width: '100%',
    paddingVertical: dimensions.Height / 60,
    paddingHorizontal: dimensions.Width / 30,
    borderWidth: 1,
    borderRadius: dimensions.Width / 40,
    borderColor: colors.primary1,
  },

  scrollContainer: {
    width: '100%',
    marginVertical: dimensions.Height / 70,
  },

  headerText: {
    fontSize: fonts.size.font24,
    fontWeight: fonts.weight.bold,
  },

  contentContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContainer: {
    width: '100%',
    paddingVertical: dimensions.Height / 50,
    paddingHorizontal: dimensions.Width / 50,
  },

  headingContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: dimensions.Height / 50,
  },
  heading: {
    fontSize: fonts.size.font24,
    fontWeight: fonts.weight.bold,
  },

  infoContainer: {
    width: '100%',
    marginVertical: dimensions.Height / 250,
  },

  inputContainer: {
    width: '100%',
  },

  text: {
    fontSize: fonts.size.font14,
    fontWeight: fonts.weight.regular,
  },

  controls: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: dimensions.Height / 40,
  },

  btnContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
