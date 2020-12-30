import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, Button, TextInput, TouchableOpacity } from 'react-native';
import { globalStyles,images } from '../../styles/global';
import Card from '../../shared/card';
import ReviewDetails from './reviewDetails';
import config from '../../config';


export default function ReviewDetailsApplication({ searchReview,navigation,modalTenantOff,email }) {

    const [key, setKey] = useState("");
    const [foundPost, setFoundPost] = useState(false);
    const [response, setResponse] = useState("Searching..."); 
    const [responseCounter, setResponseCounter] = useState(0);
    
    const [postTitle,setPostTitle] = useState("Title");
    const [postBody,setPostBody] = useState("Body");
    const [postKey,setPostKey] = useState("Key");

    const IP = config.IP;

    const searchForReview = async (key) => {
        setFoundPost(false);
        const user = await searchReview(key);

        if (!user) {
            setResponse("No ad found." + responseCounter.toString());
            setResponseCounter(responseCounter + 1);
        }

        else {
            setFoundPost(true);

            setPostTitle(user.review.title);
            setPostBody(user.review.body);
            setPostKey(user.review.key);
        }
    }

    const applyPost = async () => {

        try {
            const response = await fetch(IP + "/applyPost", 
                {
                method: "POST", 
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userKey:postKey.slice(0,postKey.length-1), postID:postKey, email })
                }
            );
            
            if(!response.ok) {
                throw new Error(response.messages)
            }
            
            const user = await response.json();
            
            return user;
      
        } catch(error) {
              console.log(error);
              return error;
        }
    }

    const postAd = (title,body,key) => {
        if (foundPost) {
            return (
                <TouchableOpacity onPress={() => {
                    navigation.navigate('ReviewDetails', {title,body,key});
                    modalTenantOff();
                }}>
                    <Card>
                        <Text style={globalStyles.titleText}>{ title }</Text>
                    </Card>
                    <Button title="Apply" onPress={() => {applyPost()}}></Button>
                </TouchableOpacity>
            );
        }
    }

    return (
        <View style={globalStyles.container}>

            <TextInput placeholder="Enter your code here: " value={key} onChangeText={key => setKey(key)}></TextInput>

            <Button title="Submit" onPress={() => searchForReview(key)}/>

            <Text>{response}</Text>

            {postAd(postTitle,postBody,postKey)}
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