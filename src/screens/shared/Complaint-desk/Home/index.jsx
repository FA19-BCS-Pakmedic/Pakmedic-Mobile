import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';

import dimensions from '../../../../utils/styles/themes/dimensions';
import colors from '../../../../utils/styles/themes/colors';
import fonts from '../../../../utils/styles/themes/fonts';

import StaticContainer from '../../../../containers/StaticContainer';
import Search from '../../../../components/shared/CommunitySearch';
import AddMore from '../../../../components/shared/AddMore';
import TicketAddModal from '../../../../components/shared/TicketAddModal';

import StatusG from '../../../../assets/svgs/statusG.svg';
import StatusR from '../../../../assets/svgs/statusR.svg';
import StatusY from '../../../../assets/svgs/statusY.svg';

import DropDownPicker from 'react-native-dropdown-picker';
DropDownPicker.setListMode('SCROLLVIEW');

import TicketOptionModal from '../../../../components/shared/TicketOptionModal';

import {getAllComplaints} from '../../../../services/complaintServices';

//import {styles} from './styles';

const Home = props => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('All');
  const [items, setItems] = useState([
    {label: 'All', value: 'All'},
    {label: 'On Hold', value: 'on Hold'},
    {label: 'Pending', value: 'Pending'},
    {label: 'Resolved', value: 'Resolved'},
  ]);

  const [AddModalVisible, setAddVisible] = useState(false);
  const [OptionModalVisible, setOptionVisible] = useState(false);

  const [item, setItem] = useState(null);
  const [edit, setEdit] = useState(false);

  const [loading, setLoading] = useState(false);

  const role = useSelector(state => state.role.role);

  // const Complaints = [
  //   {
  //     id: 3410,
  //     subject: 'Complaint about pending dues',
  //     complaint:
  //       'I have been paying my dues on time but still they are pending and I am being charged with late fees',
  //     complainee: 'Mr. Ali',
  //     status: 'on Hold',
  //   },
  //   {
  //     id: 3412,
  //     subject: 'Complaint about pending dues',
  //     complaint:
  //       'I have been paying my dues on time but still they are pending and I am being charged with late fees',
  //     complainee: 'Mr. Ali',
  //     status: 'In Progress',
  //   },
  //   {
  //     id: 2422,
  //     subject: 'Complaint about pending dues',
  //     complaint:
  //       'I have been paying my dues on time but still they are pending and I am being charged with late fees',
  //     complainee: 'Mr. Ali',
  //     status: 'Resolved',
  //   },
  //   {
  //     id: 3710,
  //     subject: 'Complaint about pending dues',
  //     complaint:
  //       'I have been paying my dues on time but still they are pending and I am being charged with late fees',
  //     complainee: 'Mr. Ali',
  //     status: 'on Hold',
  //   },
  //   {
  //     id: 3416,
  //     subject: 'Complaint about pending dues',
  //     complaint:
  //       'I have been paying my dues on time but still they are pending and I am being charged with late fees',
  //     complainee: 'Mr. Ali',
  //     status: 'In Progress',
  //   },
  //   {
  //     id: 3492,
  //     subject: 'Complaint about pending dues',
  //     complaint:
  //       'I have been paying my dues on time but still they are pending and I am being charged with late fees',
  //     complainee: 'Mr. Ali',
  //     status: 'Resolved',
  //   },
  // ];

  const [complaints, setComplaints] = useState([]);

  const getComplaints = async () => {
    setLoading(true);
    try {
      const res = await getAllComplaints();
      if (res) {
        //console.log('Complaints', res.data.data.data);
        setComplaints(
          res.data.data.data.filter(item => item.complainantType === role),
        );
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  React.useEffect(() => {
    getComplaints();
    console.log(complaints);
  }, [OptionModalVisible, AddModalVisible]);

  return (
    <StaticContainer
      customHeaderEnable
      customHeaderName={'Complaint Desk'}
      isHorizontalPadding={false}>
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
              maxHeight={dimensions.Height * 0.1}
            />
          </View>
          <Search />
        </View>
        <View style={styles.addTicket}>
          <AddMore
            type={'filled'}
            //borderColor={colors.secondary1}
            label={'Create a Ticket'}
            width={dimensions.Width / 2}
            role={role}
            onPress={() => {
              setEdit(false);
              setAddVisible(true);
            }}
          />
        </View>
        <View style={styles.body}>
          <FlatList
            data={
              value === 'All'
                ? complaints
                : complaints.filter(item => item.status === value)
            }
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item._id}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={async () => {
                  setItem(item);
                  setOptionVisible(true);
                }}>
                <View style={styles.card}>
                  <View style={styles.cardLeft}>
                    <Text style={styles.cardHeading}>{item.subject}</Text>
                    <Text style={styles.cardtext}>
                      Ticket # {item.ticketNumber}
                    </Text>
                  </View>
                  <View style={styles.cardRight}>
                    {item.status === 'on Hold' ? (
                      <StatusR />
                    ) : item.status === 'Pending' ? (
                      <StatusY />
                    ) : (
                      <StatusG />
                    )}
                    <Text
                      style={[
                        styles.cardHeading,
                        {
                          marginLeft: dimensions.Width * 0.01,
                          marginBottom: dimensions.Height * 0.003,
                        },
                      ]}>
                      {item.status}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
      {edit ? (
        <TicketAddModal
          Visible={AddModalVisible}
          setModalVisible={setAddVisible}
          item={item}
          edit={true}
        />
      ) : (
        <TicketAddModal
          Visible={AddModalVisible}
          setModalVisible={setAddVisible}
          edit={false}
        />
      )}

      <TicketOptionModal
        Visible={OptionModalVisible}
        setModalVisible={setOptionVisible}
        onEdit={edit => {
          setAddVisible(edit);
          setEdit(edit);
        }}
        item={item}
        {...props}
      />
    </StaticContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: dimensions.Height / 15,
    paddingHorizontal: dimensions.Width / 20,
    //backgroundColor: colors.secondaryMonoChrome100,
    marginTop: -dimensions.Height * 0.01,
  },
  dropDown: {
    minHeight: dimensions.Height / 23,
    width: dimensions.Width / 2.7,
    backgroundColor: colors.white,
    borderColor: colors.primary1,
  },
  dropDownContainer: {
    borderRadius: 2,
    borderWidth: 0.1,
    backgroundColor: 'white',
  },
  addTicket: {
    alignItems: 'flex-end',
    marginRight: dimensions.Width / 20,
    marginTop: dimensions.Height * 0.02,
  },
  body: {
    paddingHorizontal: dimensions.Width / 20,
    marginTop: dimensions.Height * 0.02,
    height: dimensions.Height / 1.5,
  },
  card: {
    borderWidth: 1,
    borderColor: colors.primary1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: dimensions.Width / 20,
    borderRadius: 10,
    marginBottom: dimensions.Height * 0.01,
  },
  cardLeft: {
    //width: dimensions.Width / 1.5,
  },
  cardRight: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  cardHeading: {
    fontSize: fonts.size.font14,
    fontWeight: 'bold',
    color: colors.secondary1,
    maxWidth: dimensions.Width * 0.5,
  },
  cardtext: {
    fontSize: fonts.size.font12,
    color: '#0c8462',
    marginTop: dimensions.Height * 0.01,
    fontWeight: fonts.weight.semi,
  },
});

export default Home;
