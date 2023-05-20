import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import PrescriptionCard from './PrescriptionCard';

import dimensions from '@/utils/styles/themes/dimensions';
import fonts from '@/utils/styles/themes/fonts';
import colors from '@/utils/styles/themes/colors';

import {getAllPrescriptions} from '../../../services/prescriptionServices';
import ModalContainer from '../../../containers/ModalContainer';
import {useSelector} from 'react-redux';

import {useNavigation} from '@react-navigation/native';

const Prescriptions = ({prescriptions, visible, setVisible}) => {
  const [allPrescriptions, setAllPrescriptions] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [Visible, setModalVisible] = React.useState(false);
  const [selectedPrescription, setSelectedPrescription] = React.useState(null);

  const user = useSelector(state => state.auth.user);

  const getPrescriptions = async () => {
    try {
      setLoading(true);
      // genretaing the query

      const query = `patient=${user._id}`;

      const response = await getAllPrescriptions(query);
      console.log(response.data.data.data);
      setAllPrescriptions(response.data.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  React.useEffect(() => {
    getPrescriptions();
  }, []);

  const OpenOptionsModal = props => {
    const {Visible, setModalVisible, navigation, item} = props;
    const navigation1 = useNavigation();
    return (
      <ModalContainer
        isModalVisible={Visible}
        setModalVisible={setModalVisible}
        height={
          item?.status === 'Pending'
            ? dimensions.Height / 3.5
            : dimensions.Height / 5
        }
        width={dimensions.Width}
        borderColor={colors.primary1}
        type="bottom"
        backDropOpacity={0.5}
        padding={dimensions.Height * 0.035}
        bgColor={colors.white}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              console.log('item', item.medicines);
              navigation1.navigate('PrescriptionDetail', {
                data: item._id,
              });
              setModalVisible(false);
            }}>
            <Text style={styles.text}>View Details</Text>
          </TouchableOpacity>
          <View style={styles.line} />

          <TouchableOpacity style={styles.button} onPress={() => {}}>
            <Text style={styles.text}>Download</Text>
          </TouchableOpacity>
        </View>
      </ModalContainer>
    );
  };

  return (
    <>
      <View style={styles.Container}>
        <FlatList
          data={allPrescriptions}
          renderItem={({item}) => (
            <View style={styles.prescriptionContainer}>
              <PrescriptionCard
                prescription={item}
                onClick={bool => {
                  setSelectedPrescription(item);
                  setModalVisible(bool);
                }}
              />
            </View>
          )}
          keyExtractor={item => item._id}
          numColumns={2}
        />
      </View>
      <OpenOptionsModal
        Visible={Visible}
        setModalVisible={setModalVisible}
        item={selectedPrescription}
      />
    </>
  );
};

export default Prescriptions;

const styles = StyleSheet.create({
  Container: {
    width: '100%',

    alignItems: 'center',
  },
  prescriptionContainer: {
    width: dimensions.Width / 2.3,
    height: dimensions.Height / 4.5,
    margin: dimensions.Width / 50,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    //backgroundColor: colors.secondaryMonoChrome100,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: colors.primary1,
  },
  text: {
    fontSize: fonts.size.font16,
    color: colors.secondary1,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  line: {
    width: dimensions.Width,
    height: dimensions.Height * 0.0025,
    backgroundColor: colors.primary1,
  },
});
