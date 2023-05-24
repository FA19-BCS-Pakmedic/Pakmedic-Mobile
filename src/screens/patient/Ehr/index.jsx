import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import {useCustomToast} from '../../../hooks/useCustomToast';

import {getDoctorById} from '../../../services/doctorServices';
import StaticContainer from '../../../containers/StaticContainer';
import { apiEndpoint, baseUrl } from '../../../utils/constants/APIendpoint';
import Loader from '../../../components/shared/Loader';
import Button from '../../../components/shared/Button';
import colors from '../../../utils/styles/themes/colors';
import dimensions from '../../../utils/styles/themes/dimensions';
import fonts from '../../../utils/styles/themes/fonts';
import { handleEhrRequest } from '../../../services/ehrServices';

const EhrAccess = ({route, navigation}) => {

    const doctorId = route.params.data;

    const [loading, setLoading] = useState(false);

    const [btnLoading, setBtnLoading] = useState(false);

    const [doctor, setDoctor] = useState(false);

    const {showToast} = useCustomToast();

    useEffect(() => {

        const getDoctor = async () => {
            setLoading(true);
            try {
                const response = await getDoctorById(doctorId);

                setDoctor(response.data.data.user);

            }catch(err) {
                console.log(err);
                showToast("Error loading doctor data", "danger");
            }finally {
                setLoading(false);
            }
        }

        if(doctorId)
            getDoctor();

    }, [doctorId]);


    const handleRequest = async (status) => {
        setBtnLoading(true);
        
        const data = {
            status,
            doctorId,
        }

        
        try {

            await handleEhrRequest(data);

            showToast("Ehr access granted", "success");
            
            navigation.navigate('App', {
                screen: 'PatientTabStack'
            });

        } catch(err) {
            console.log(err);
            showToast(err.response.data.message, 'danger');
        } finally {
            setBtnLoading(false);
        }
    }


    if(loading) {
        return (
            <Loader
                title={"Loading data..."}
            />
        )
    }

  return (  
    <StaticContainer customHeaderName={"EHR Request"} isBack={true} customHeaderEnable={true}>
        <View style={styles.container}>

            <View style={styles.doctorCard}>
                <View style={styles.doctorInfoContainer}>
                <Image source={{uri: `${apiEndpoint}files/${doctor.avatar}`}} style={[styles.avatar, {width: 50, height: 50, borderRadius: 50, marginRight: dimensions.Width / 50}]} />
                <View style={styles.infoContainer}>
                    <Text style={styles.info}>{doctor.name}</Text>
                    <Text style={styles.info}>{doctor.speciality}</Text>
                    <Text style={styles.info}>{doctor.email}</Text>
                </View>
                <Button
                    type="outlined"
                    label="View Profile"
                    onPress={() => {}}
                    width={'30%'}
                    />
                </View>
            </View>

            <View style={styles.controls}>
                <Button
                    type="filled"
                    label="Accept"
                    onPress={() => {handleRequest("accept")}}
                    isLoading={btnLoading}
                    width={'48%'}
                    isDisabled={btnLoading}
                />

                <Button
                    type="outlined"
                    label="Reject"
                    onPress={() => {handleRequest('reject')}}
                    isLoading={btnLoading}
                    width={'48%'}
                    isDisabled={btnLoading}
                />
            </View>

        </View>
    </StaticContainer>
  )
}

export default EhrAccess

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        paddingVertical: 20,
    },

    doctorInfoContainer: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
    },  

    doctorCard: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: colors.primary1,
        height: dimensions.Height / 8,
    },

    info: {
        fontSize: fonts.size.font16,
        fontWeight: fonts.weight.semi,
    },

    controls: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    }

})