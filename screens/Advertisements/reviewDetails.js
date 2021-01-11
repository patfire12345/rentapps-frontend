import React, {useState} from 'react';
import { StyleSheet, View, Text, Image, Button, FlatList, TouchableOpacity } from 'react-native';
import { globalStyles,images } from '../../styles/global';
import Card from '../../shared/card';


export default function ReviewDetails({ navigation }) {

    const emails = navigation.getParam("applications");

    return (
        <View style={globalStyles.container}>
            <Card>
                <Text style={globalStyles.application}>Title: { navigation.getParam('title') }</Text>
                <Text style={globalStyles.application}>Description: { navigation.getParam('body') }</Text>
                <Text style={globalStyles.application}>Post ID: { navigation.getParam('key') }</Text>
            </Card>

            { () => {
                if (navigation.getParam("tenant")) {
                    (<Text style={globalStyles.application}>My applications:</Text>)
                }
            }}

            <FlatList data={emails} renderItem={({item, index}) => (
                <TouchableOpacity onPress={async () => {
                    navigation.navigate('AboutForLandlord', {
                        email: item.email,
                      })
                }}>
                    <Card>
                        <Text style={globalStyles.application}>Application from {item.email} </Text>
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