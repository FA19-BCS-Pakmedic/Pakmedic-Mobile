import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';

import Signature from 'react-native-signature-canvas';
import {useState} from 'react';
import ModalContainer from '../../../containers/ModalContainer';
import dimensions from '../../../utils/styles/themes/dimensions';
import colors from '../../../utils/styles/themes/colors';
import Button from '../../shared/Button';

const SignatureScreen = () => {
  const [signature, setSign] = useState(null);
  const [visible, setVisible] = useState(false);

  const handleOK = signature => {
    console.log(signature);
    setSign(signature);
    setVisible(false);
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
        <Button
          type="outlined"
          label="Remove Signature"
          onPress={() => {
            setSign(null);
          }}
          width={dimensions.Width / 2.6}
        />
        <Button
          type="filled"
          label="Add Signature"
          onPress={() => {
            setVisible(prevState => !prevState);
          }}
          width={dimensions.Width / 2.6}
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
