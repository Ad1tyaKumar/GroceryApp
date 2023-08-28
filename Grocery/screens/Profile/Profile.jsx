import { View, Text, ScrollView, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import BottomNavigator from '../../components/Bottom/BottomNavigator'
import ProfileImg from '../../images/Profile.png'
import { Image } from 'expo-image'
import { useDispatch, useSelector } from 'react-redux'
import AddressModal from './AddressModal'
import { deleteAddress, getUser } from '../../actions/userActions'
import EditProfileModal from './EditProfileModal'
import { useFocusEffect } from '@react-navigation/native'
import { useSearch } from '../../components/SearchContext'

const Profile = () => {

    const { user, loading, isAuthenticated } = useSelector((state) => state.user);
    const [resetDrawer,setResetDrawer]=useState(false);
    const { scrollY, setScrollY } = useSearch();
    const [addressModal, setAddressModal] = useState(false);
    const { shippingInfo } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const [address, setAddress] = useState(shippingInfo.address);
    const [city, setCity] = useState(shippingInfo.city);
    const [state, setState] = useState(shippingInfo.state);
    const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);
    const [profileModal, setProfileModal] = useState(false);
    useFocusEffect(
        React.useCallback(()=>{
            setResetDrawer(true);
            setScrollY(false);
        },[])
    )

    useEffect(() => {
        if (isAuthenticated && user.shippingAddress) {
            console.log(user.shippingAddress.address);
            setAddress(user.shippingAddress.address);
            setCity(user.shippingAddress.city);
            setState(user.shippingAddress.state);
            setPinCode(user.shippingAddress.pinCode);
            setPhoneNo(user.shippingAddress.phoneNo);

        }
    }, [isAuthenticated]);
    const removeAddress = () => {
        dispatch(deleteAddress());
        dispatch(getUser());
    }
    return (
        <>
            {
                loading ? <ActivityIndicator size={40} /> :
                    <View style={{
                        marginTop: 10,
                        alignItems: 'center'
                    }}>
                        <Text style={{
                            textAlign: 'center',
                            fontSize: 25,
                            fontWeight: '600',
                            color: 'grey'
                        }}>
                            My Profile
                        </Text>
                        <View style={{
                            borderBottomWidth: 2,
                            width: '40%',
                            borderColor: 'lightgrey',
                            marginTop: 10,
                        }} />
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            alignItems: 'center',
                            width: '100%',
                        }}>
                            <Image style={{
                                height: 150,
                                width: 150
                            }} source={ProfileImg} />
                            <View>
                                <Text style={styles.detailsText}>
                                    Full Name
                                </Text>
                                <Text style={styles.detailsValueText}>
                                    {user.name}
                                </Text>
                                <Text style={styles.detailsText}>
                                    Phone Number
                                </Text>
                                <Text style={styles.detailsValueText}>
                                    +91 {user.phoneNo}
                                </Text>
                                <Text style={styles.detailsText}>
                                    Email
                                </Text>
                                <Text style={styles.detailsValueText}>
                                    {user.email ? user.email : 'Add an Email Address'}
                                </Text>
                            </View>
                        </View>
                        <TouchableOpacity
                            onPress={() => setProfileModal(true)}
                            style={{
                                marginTop: 25,
                                backgroundColor: '#26a541',
                                borderRadius: 2,
                            }}>
                            <Text style={{
                                color: 'white',
                                padding: 8,
                                fontSize: 15,
                            }}>
                                Edit Profile
                            </Text>
                        </TouchableOpacity>
                        {
                            JSON.stringify(shippingInfo) !== '{}' ?
                                <View style={{
                                    marginTop: 20,
                                    borderWidth: 1,
                                    width: '80%',
                                    padding: 5,
                                }}>
                                    <Text style={[styles.detailsText, { marginTop: 0 }]}>
                                        Address
                                    </Text>
                                    <Text style={[styles.detailsValueText, { marginTop: 10, }]}>
                                        {address}
                                    </Text>
                                    <Text style={[styles.detailsValueText, { marginTop: 5, }]}>
                                        State: {state}
                                    </Text>
                                    <Text style={[styles.detailsValueText, { marginTop: 5, }]}>
                                        City: {city}
                                    </Text>
                                    <Text style={[styles.detailsValueText, { marginTop: 5, }]}>
                                        PINCODE: {pinCode}
                                    </Text>
                                    <Text style={[styles.detailsValueText, { marginTop: 5, }]}>
                                        Phone Number: +91 {phoneNo}
                                    </Text>
                                </View> :
                                <View style={{
                                    marginTop: 35,
                                    borderWidth: 1,
                                    width: '80%',
                                    padding: 5,
                                    flexDirection: 'row',
                                    justifyContent: 'space-around',
                                    alignItems: 'center'
                                }}>
                                    <Text style={[styles.detailsText, { marginTop: 0 }]}>
                                        Address
                                    </Text>
                                    <TouchableOpacity
                                        onPress={() => setAddressModal(true)}
                                        style={{
                                            backgroundColor: '#26a541',
                                            borderRadius: 2,
                                        }}>
                                        <Text style={{
                                            color: 'white',
                                            padding: 8,
                                            fontSize: 15,
                                        }}>
                                            Add Address
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                        }
                        {
                            JSON.stringify(shippingInfo) !== '{}' ?
                                <View style={{
                                    width: '100%',
                                    flexDirection: 'row',
                                    justifyContent: 'space-evenly',
                                    marginTop: 20,
                                }}>
                                    <TouchableOpacity onPress={removeAddress} style={{
                                        backgroundColor: 'red',
                                        padding: 5,
                                        borderRadius: 5,
                                    }}>
                                        <Text style={{
                                            color: 'white'
                                        }}>
                                            Remove Address
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => setAddressModal(true)} style={{
                                        backgroundColor: '#26a541',
                                        padding: 5,
                                        borderRadius: 5,
                                    }}>
                                        <Text style={{
                                            color: 'white'
                                        }}>
                                            Update Address
                                        </Text>
                                    </TouchableOpacity>
                                </View> : <></>
                        }
                        <AddressModal
                            addressModal={addressModal}
                            setAddressModal={setAddressModal}
                            address={address}
                            setAddress={setAddress}
                            city={city}
                            setCity={setCity}
                            state={state}
                            setState={setState}
                            pinCode={pinCode}
                            setPinCode={setPinCode}
                            phoneNo={phoneNo}
                            setPhoneNo={setPhoneNo}
                        />
                        <EditProfileModal profileModal={profileModal} setProfileModal={setProfileModal} />
                    </View>
            }
            <BottomNavigator resetDrawer={resetDrawer} />
        </>
    )
}

export default Profile

const styles = StyleSheet.create({
    detailsText: {
        fontSize: 18,
        fontWeight: '500',
        marginTop: 20,
    },
    detailsValueText: {
        fontSize: 14,
        color: 'grey',
    }
})