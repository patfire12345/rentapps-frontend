import { createStackNavigator } from 'react-navigation-stack';
import About from '../screens/Tenants/about';
import Header from '../shared/header';
import React from 'react';
// import PetSection from '../screens/pets';


const screens = {
    About: {
        screen: About,
        navigationOptions: ({navigation}) => {
            return {
                headerTitle: () => <Header navigation={navigation} title="About Me"/>,
            }
        },
        
    },
}

const AboutStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerTintColor: '#444',
        headerStyle: { backgroundColor: '#eee', height: 60, },
    }
});

export default AboutStack;