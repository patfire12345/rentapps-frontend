import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import Welcome from '../screens/Login/welcome';
import Home from '../screens/Home/home';
import ReviewDetails from '../screens/Advertisements/reviewDetails';
// import Register from "../screens/register";
import About from "../screens/Tenants/about";
import AboutForLandlord from "../screens/Tenants/aboutForLandlord";
import Header from '../shared/header';
import {globalStyles} from '../styles/global';



const screens = {
    Home: {
        screen: Home,
        navigationOptions: ({navigation}) => {
            return {
                headerTitle: () => <Header navigation={navigation} title='Home'/>,
            }
        }
    },
    ReviewDetails: {
        screen: ReviewDetails,
        navigationOptions: {
            title: 'Review Details',
            // headerStyle: { backgroundColor: '#eee' }
        }
    },
    About: {
        screen: About,
        navigationOptions: 
            // title: "Tenant Application",
            // headerStyle: { fontFamily: 'ropasans'},
            ({navigation}) => {
                return {
                    headerTitle: () => <Header navigation={navigation} title='Tenant Application'/>,
                }
            } 
    },
    AboutForLandlord: {
        screen: AboutForLandlord,
        navigationOptions: {
            title: "AboutForLandlord"
        }
    },
}

const HomeStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerTintColor: '#444',
        headerStyle: { backgroundColor: '#eee', height: 60, },
    }
});

export default HomeStack;