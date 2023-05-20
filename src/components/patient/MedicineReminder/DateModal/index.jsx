import {React} from 'react';

import ModalContainer from '../../../../containers/ModalContainer';

import dimensions from '../../../../utils/styles/themes/dimensions';
import colors from '../../../../utils/styles/themes/colors';

import DatePicker from 'react-native-modern-datepicker';
import moment from 'moment';

export default DateModal = props => {
  const {Visible, setModalVisible, navigation, date, setDate, setDay} = props;

  return (
    <ModalContainer
      isModalVisible={Visible}
      setModalVisible={setModalVisible}
      height={dimensions.Height / 2}
      width={dimensions.Width * 0.9}
      backDropOpacity={0.5}
      padding={dimensions.Height / 50}
      bgColor={colors.white}
      borderColor={colors.primary1}>
      <DatePicker
        mode="calendar"
        onDateChange={date => {
          setDate(moment.utc(date, 'YYYY-MM-DD').format('DD/MM/YYYY'));
          setDay(moment.utc(date, 'YYYY-MM-DD').format('dddd').substring(0, 3));
          setModalVisible(false);
        }}
        options={{
          textHeaderColor: colors.primary1,
          textDefaultColor: colors.secondary1,
          mainColor: colors.accent1,
          textSecondaryColor: colors.accent1,
        }}
        style={{borderRadius: 50}}
      />
    </ModalContainer>
  );
};
