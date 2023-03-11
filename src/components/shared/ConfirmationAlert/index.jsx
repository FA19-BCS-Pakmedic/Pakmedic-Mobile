import {Text, View, StyleSheet} from 'react-native';
import ModalContainer from '../../../containers/ModalContainer';
import colors from '../../../utils/styles/themes/colors';
import dimensions from '../../../utils/styles/themes/dimensions';
import fonts from '../../../utils/styles/themes/fonts';

import Button from '../Button';

export default function ConfirmationAlert({
  borderColor,
  bgColor,
  height,
  width,
  padding,
  backDropOpacity,
  type,
  setModalVisible,
  isModalVisible,
  alertText,
  confirmControl,
  cancelControl,
}) {
  return (
    <ModalContainer
      isModalVisible={isModalVisible}
      setModalVisible={setModalVisible}
      width={width ? width : dimensions.Width / 1.1}
      type={type ? type : 'center'}
      backDropOpacity={backDropOpacity ? backDropOpacity : 0.5}
      padding={padding ? padding : dimensions.Height / 40}
      height={height}
      bgColor={bgColor ? bgColor : colors.white}
      borderColor={borderColor ? borderColor : colors.primary1}>
      <View style={styles.modalContainer}>
        <Text style={styles.alertText}>{alertText}</Text>
        <View style={styles.controls}>
          <Button
            type="outlined"
            label="Cancel"
            onPress={cancelControl.onPress}
            width={cancelControl.width}
          />
          <Button
            type="filled"
            label="Confirm"
            onPress={confirmControl.onPress}
            width={confirmControl.width}
          />
        </View>
      </View>
    </ModalContainer>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  alertText: {
    fontSize: fonts.size.font16,
    fontWeight: fonts.weight.semi,
  },
  controls: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: dimensions.Height / 40,
  },
});
