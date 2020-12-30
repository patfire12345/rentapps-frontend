import React, {useState} from 'react';
import { StyleSheet, View, Text, Image, Button, FlatList, TouchableOpacity } from 'react-native';
import { globalStyles,images } from '../../styles/global';
import Card from '../../shared/card';


export default function ReviewDetails({ navigation }) {

    // const rating = navigation.getParam("rating");

    const emails = navigation.getParam("applications");
    // const emails = [{email:"toad@google.ca", id: "1"}];
    // console.log(emails);
    const [userState,setUserState] = useState(navigation.getParam("userState"));
    // const userState = useState(navigation.getParam("userState"));

    return (
        <View style={globalStyles.container}>
            <Card>
                <Text>Title: { navigation.getParam('title') }</Text>
                <Text>Description: { navigation.getParam('body') }</Text>
                <Text>Post ID: { navigation.getParam('key') }</Text>
            </Card>

            <Text>My applications:</Text>

            <FlatList data={emails} renderItem={({item}) => (
                <TouchableOpacity onPress={async () => {
                    navigation.navigate('AboutForLandlord', {
                        email: item.email,
                      })
                }}>
                    <Card>
                        <Text>Here is an email: {item.email} </Text>
                    </Card>
                </TouchableOpacity>
            )}/>
        </View>
    )
}

const styles = StyleSheet.create({
    rating: {
        flexDirection: "row",
        justifyContent: 'center',
        paddingTop: 16,
        marginTop: 16,
        borderTopWidth: 1,
        borderTopColor: "#eee",
    }
});