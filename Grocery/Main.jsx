import React, { Component } from 'react'
import { Platform, StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import Home from './screens/Home/Home';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from './components/Drawer/DrawerContent';
import ProductDetails from './screens/ProductDetails/ProductDetails';
import Products from './screens/Products/Products';
import Profile from './screens/Profile/Profile';
import Orders from './screens/Profile/Orders';
import Header from './components/Header/Header';
import { SearchProvider } from './components/SearchContext'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Cart from './screens/Cart/Cart';
import SignIn from './screens/User/SignIn';
import Register from './screens/User/Register/Register';
import Login from './screens/User/Login/Login';
import MiddleScreen from './screens/User/MiddleScreen';
import OrderDetails from './screens/Profile/OrderDetails';
import CartCheckout from './screens/Cart/CartCheckout';
import Success from './screens/Cart/Success';
const Drawer = createDrawerNavigator();

const Stack = createNativeStackNavigator();

export class Main extends Component {

    render() {
        return (
            <SearchProvider>
                <NavigationContainer>
                    <Drawer.Navigator
                        backBehavior='history'
                        screenOptions={{
                            drawerStyle: {
                                marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
                            },
                        }}
                        drawerContent={props => <DrawerContent {...props} />}
                    >
                        <Drawer.Screen name='order-success' component={Success} options={{
                            header: () => <Header />
                        }} />
                        <Drawer.Screen name='home' component={Home} options={{
                            header: () => <Header />
                        }} />
                        <Drawer.Screen name='profile' component={Profile} options={{
                            header: () => <Header />
                        }} />
                        <Drawer.Screen name='products' component={Products} options={{
                            header: () => <Header />
                        }} />
                        <Drawer.Screen name='product-details' component={ProductDetails} options={{
                            header: () => <Header />
                        }} />
                        <Drawer.Screen name='orders' component={Orders} options={{
                            header: () => <Header />
                        }} />
                        <Drawer.Screen name='order-details' component={OrderDetails} options={{
                            header: () => <Header />
                        }} />
                        <Drawer.Screen name='cart' component={Cart} options={{
                            header: () => <Header />
                        }} />
                        <Drawer.Screen name='signin' component={SignIn} options={{
                            header: () => <Header />
                        }} />
                        <Drawer.Screen name='middleScreen' component={MiddleScreen} options={{
                            header: () => <Header />
                        }} />
                        <Drawer.Screen name='login' component={Login} options={{
                            header: () => <Header />
                        }} />
                        <Drawer.Screen name='register' component={Register} options={{
                            header: () => <Header />
                        }} />
                        <Drawer.Screen name='order' component={CartCheckout} options={{
                            header: () => <Header />
                        }} />

                    </Drawer.Navigator>
                </NavigationContainer>
            </SearchProvider>
        )
    }
}

export default Main
