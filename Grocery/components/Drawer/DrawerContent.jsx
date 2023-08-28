import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import { useDrawerStatus } from '@react-navigation/drawer';
import Icon from '@expo/vector-icons/MaterialIcons';
import Icon1 from '@expo/vector-icons/Octicons'
import Collapsible from 'react-native-collapsible';

//Images
import staples from "../../images/staples.png";
import dairy from "../../images/dairy.png";
import beverages from "../../images/beverages.png";
import kitchen from "../../images/kitchen.png";
import snacks from "../../images/snacks.png";
import homeCare from "../../images/homeCare.png";
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../actions/userActions';
import Toast from 'react-native-root-toast';



const categories = [
    [
        "Staples",
        [
            "Atta Flours & Sooji",
            "Dals & Pulses",
            "Rice & Rice Products",
            "Edible Oils",
            "Masalas & Spcies",
            "Salt, Sugar & Jaggery",
        ],
    ],
    [
        "Dairy & Bakery",
        [
            "Dairy",
            "Toast & Khari",
            "Cakes & Muffinss",
            "Breads and Buns",
            "Baked Cookies",
            "Bakery Snacks",
            "Cheese",
            "Ghee",
            "Paneer & Tofu",
        ],
    ],
    [
        "Snacks",
        [
            "Biscuits & Cookies",
            "Noodle, Pasta, Vermicelli",
            "Breakfast Cereals",
            "Namkeen",
            "Chocolates & Candies",
            "Ready To Cook & Eat",
            "Frozen Veggies & Snacks",
            "Spreads, Sauces, Ketchup",
            "Indian Sweets",
            "Pickles & Chutney",
            "Extracts & Flavouring",
            "Hampers & Gourmet Gifts",
        ],
    ],
    [
        "Beverages",
        [
            "Tea",
            "Coffee",
            "Fruit juices",
            "Energy & Soft Drinks",
            "Health Drink & Supplement",
            "Soda & Flavoured Water",
        ],
    ],
    [
        "Home Care",
        [
            "Detergents",
            "Dishwash",
            "All Purpose Cleaners",
            "Fresheners & Repellents",
            "Shoe Care",
            "Pet Supplies",
        ],
    ],
    [
        "Kitchen",
        ["Disposables", "Bottles", "Dishes & Containers", "Tablewares"],
    ],
];


const DrawerContent = ({ navigation }) => {
    const categoryImages = [staples, dairy, snacks, beverages, homeCare, kitchen];
    const dispatch = useDispatch();
    const { isAuthenticated, user } = useSelector((state) => state.user)
    const Divider = () => {
        return (
            <View
                style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: StyleSheet.hairlineWidth,
                }}
            />
        )
    }
    const isDrawerOpen = useDrawerStatus() === 'open';
    const [collapsed, setCollapsed] = useState([true, true, true, true, true, true]);
    const toggleIndex = (index) => {
        setCollapsed((prevCollapsed) => {
            const newCollapsed = [...prevCollapsed];
            newCollapsed[index] = !newCollapsed[index];
            return newCollapsed;
        });
    };


    return (
        <ScrollView style={styles.drawerDiv}>

            <View style={styles.drawerHeader}>
                <Icon name={isDrawerOpen ? "chevron-left" : "chevron-right"} size={30} color="black" onPress={() => navigation.toggleDrawer()} />

                <Text
                    style={{
                        color: 'black',
                        fontSize: 25,
                        fontWeight: '500'
                    }}
                >Hello!</Text>
                {
                    isAuthenticated ? <Text
                        style={{
                            color: 'black',
                            fontSize: 15,
                            fontWeight: '500'
                        }}>
                        {user.name.split(' ')[0]}
                    </Text> :
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('signin')
                            }}>

                            <Text
                                style={{
                                    color: 'black',
                                    fontSize: 15,
                                    fontWeight: '500'
                                }}
                            >
                                Sign In
                            </Text>
                        </TouchableOpacity>
                }
            </View>
            <Divider />
            <View >
                <Text
                    style={{
                        textAlign: 'center',
                        fontSize: 20,
                        paddingTop: 25,
                        paddingBottom: 25,
                        color: 'white',
                        fontWeight: '500'
                    }}>
                    ALL CATEGORIES
                </Text>
                <View>
                    {
                        categories.map((category, index) => (
                            <React.Fragment key={index}>
                                <TouchableOpacity key={index} onPress={() => toggleIndex(index)}
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        marginLeft: 15
                                    }}
                                >
                                    <Icon1 style={{
                                        width: 12
                                    }} name={collapsed[index] ? "chevron-right" : "chevron-down"} size={20} color="white" />
                                    <Image style={{
                                        width: 40,
                                        height: 40,
                                        marginLeft: 20
                                    }} source={categoryImages[index]} />
                                    <Text style={{
                                        padding: 20,
                                        fontSize: 18,
                                        fontWeight: '500',
                                        color: 'white'
                                    }}>
                                        {category[0]}
                                    </Text>
                                </TouchableOpacity>
                                <Divider />
                                <View key={`${index}a`} style={{
                                    marginLeft: 25,
                                }}>
                                    {
                                        category[1].map((subCategory, i) => (
                                            <React.Fragment key={`${index + 1}-${i + 1}`}>
                                                {
                                                    collapsed[index] ? <></> :
                                                        <TouchableOpacity style={{
                                                            flexDirection: 'row',
                                                            alignItems: 'center'
                                                        }}
                                                            onPress={() => navigation.navigate('products', { keyword: `&subCategory=${subCategory}` })}
                                                        >

                                                            <Icon1 name={"chevron-right"} size={15} color="white" />
                                                            <Text style={{
                                                                fontSize: 15,
                                                                padding: 10,
                                                                color: 'white',
                                                                borderBottomColor: 'black',
                                                                borderBottomWidth: 0.6,
                                                            }}>
                                                                {subCategory}
                                                            </Text>
                                                        </TouchableOpacity>
                                                }
                                            </React.Fragment>
                                        ))
                                    }
                                </View>
                            </React.Fragment>
                        ))
                    }

                </View>
                <View style={{
                    marginTop: 15,
                }}>
                    <Text style={{
                        fontWeight: '500',
                        fontSize: 18,
                        textAlign: 'center',
                        marginBottom: 10,

                    }}>

                        My Account
                    </Text>
                    <TouchableOpacity>
                        <Text style={styles.myAccountAction}>
                            Home
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>navigation.navigate('profile')}>
                        <Text style={styles.myAccountAction}>
                            Profile
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity  onPress={()=>navigation.navigate('orders')}>
                        <Text style={styles.myAccountAction}>
                            Orders
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity  onPress={()=>navigation.navigate('cart')}>
                        <Text style={styles.myAccountAction}>
                            Cart
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            dispatch(logout())
                            Toast.show('Logged Out Successfully!',{duration:Toast.durations.LONG})
                        }}>
                        <Text style={styles.myAccountAction}>
                            Logout
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={{
                    marginTop: 15,
                }}>
                    <Text style={{
                        fontWeight: '500',
                        fontSize: 18,
                        textAlign: 'center',
                        marginBottom: 10,

                    }}>

                        Help and Support
                    </Text>
                    <TouchableOpacity>
                        <Text style={styles.myAccountAction}>
                            Contact Us
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.myAccountAction}>
                            About Us
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={
                    styles.drawerFooter
                }>
                    <Text style={{ fontSize: 25, fontWeight: '700', marginBottom: 10 }}>
                        LOGO
                    </Text>
                    <Text style={{ fontSize: 12, marginBottom: 10 }}>
                        Please Note that you are accessing the BETA version of this APP.
                    </Text>
                    <Text style={{ fontSize: 12, marginBottom: 10 }}>
                        If you encounter any bugs, glitches, lack of
                        functionality, delayed deliveries, billing errors or
                        other problems on the beta website, please email us on
                        email@logo.com
                    </Text>
                    <Text style={{ fontSize: 12 }}>
                        © ecommerce.com 2023
                    </Text>
                </View>
            </View>
        </ScrollView>
    )
}

export default DrawerContent

const styles = StyleSheet.create({
    drawerDiv: {
        backgroundColor: '#26A541',
        height: 'auto',
        overflow: 'scroll'
    },
    drawerHeader: {
        flexDirection: 'row',
        padding: 10,
        paddingLeft: 20,
        paddingRight: 25,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    myAccountAction: {
        margin: 8,
        marginLeft: 20,
        borderBottomColor: 'grey',
        borderBottomWidth: 0.5,
        fontSize: 16
    },
    drawerFooter: {
        backgroundColor: '#D9D9D9',
        padding: 20
    }
})