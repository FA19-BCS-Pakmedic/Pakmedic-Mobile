import {
  StyleSheet,
  Text,
  View,
  Image,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import React, {useEffect} from 'react';
import RNFetchBlob from 'rn-fetch-blob';

import Signature from 'react-native-signature-canvas';
import {useState} from 'react';
import ModalContainer from '../../../containers/ModalContainer';
import dimensions from '../../../utils/styles/themes/dimensions';
import colors from '../../../utils/styles/themes/colors';
import Button from '../../shared/Button';

import {addSignature} from '../../../services/doctorServices';
import {useCustomToast} from '../../../hooks/useCustomToast';

const SignatureScreen = () => {
  const [signature, setSign] = useState(null);
  const [visible, setVisible] = useState(false);

  const signatureRef = React.useRef();

  const {showToast} = useCustomToast();

  // const uploadSignature = async formData => {
  //   try {
  //     const response = await addSignature(formData);
  //     console.log(response);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const handleOK = async signature => {
    setSign(signature);

    if (Platform.OS === 'android') {
      const isReadGranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      if (isReadGranted === PermissionsAndroid.RESULTS.GRANTED) {
        const dirs = RNFetchBlob.fs.dirs;
        const fileName = 'signture' + new Date().getMilliseconds() + '.png';
        const filePath = dirs.DownloadDir + '/' + fileName;
        console.log(filePath);
        RNFetchBlob.fs
          .writeFile(filePath, signature.split(',')[1], 'base64')
          .then(async () => {
            await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            );
            console.log('Successfuly saved to' + filePath);
          })
          .then(() => {
            showToast('Signature saved successfully', 'success');
            setVisible(false);
          })

          .catch(errorMessage => {
            console.log(errorMessage);
            showToast('Error saving signature', 'danger');
            setVisible(false);
          });
      }
    }
  };

  const handleEmpty = () => {
    console.log('Empty');
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
          height={dimensions.Height / 1.93}
          bgColor={'white'}
          borderColor={colors.primary1}>
          <View style={styles.modalContainer}>
            <Signature
              onOK={handleOK}
              onEmpty={handleEmpty}
              descriptionText="Draw Your Sign"
              ref={signatureRef}
              clearText="Clear"
              confirmText="Save"
              webStyle={style}
              style={{width: '100%'}}
            />
          </View>
        </ModalContainer>
      </>
    );
  };

  const style = `.m-signature-pad--footer
      .button {
        background-color: ${colors.primary1};
        color: #FFF;
      }`;

  return (
    <View style={styles.container}>
      {openModal()}
      <View style={styles.preview}>
        {signature ? (
          <Image
            resizeMode={'contain'}
            style={styles.signImage}
            source={{uri: signature}}
          />
        ) : null}
      </View>
      <View style={styles.controls}>
        {/* <Button
          type="outlined"
          label="Remove Signature"
          onPress={() => {
            setSign(null);
          }}
          width={dimensions.Width / 2.6}
        /> */}
        <Button
          type="filled"
          label="Create new Signature"
          onPress={() => {
            setVisible(prevState => !prevState);
          }}
          width={'100%'}
        />
      </View>
    </View>
  );
};

export default SignatureScreen;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  preview: {
    width: '100%',
    height: dimensions.Height / 2.5,
    backgroundColor: colors.primaryMonoChrome100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: dimensions.Width / 10,
  },

  signImage: {width: dimensions.Width / 1.5, height: dimensions.Height / 3},

  controls: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  modalContainer: {flex: 1, width: '100%', padding: dimensions.Width / 30},
});
