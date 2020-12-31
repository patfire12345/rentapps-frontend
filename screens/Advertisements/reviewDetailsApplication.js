import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, Button, TextInput, TouchableOpacity } from 'react-native';
import { globalStyles,images } from '../../styles/global';
import Card from '../../shared/card';
import ReviewDetails from './reviewDetails';
import FlatButton from '../../shared/button';
import config from '../../config';


export default function ReviewDetailsApplication({ searchReview,navigation,modalTenantOff,email }) {

    const [key, setKey] = useState("");
    const [foundPost, setFoundPost] = useState(false);
    const [response, setResponse] = useState(""); 
    const [responseCounter, setResponseCounter] = useState(0);
    
    const [postTitle,setPostTitle] = useState("Title");
    const [postBody,setPostBody] = useState("Body");
    const [postKey,setPostKey] = useState("Key");

    const [disabledApply, setDisabledApply] = useState(false);

    const IP = config.IP;

    const searchForReview = async (key) => {
        setFoundPost(false);
        setDisabledApply(false);
        const user = await searchReview(key);

        if (!user) {
            setResponse("No ad found." + responseCounter.toString());
            setResponseCounter(responseCounter + 1);
        }

        else {
            setFoundPost(true);
            setResponse("");

            setPostTitle(user.review.title);
            setPostBody(user.review.body);
            setPostKey(user.review.key);

            for (var i = 0; i < user.review.applications.length; i++) {
                if (user.review.applications[i].email ===  email) {
                    setDisabledApply(true);
                }
            }
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

            setDisabledApply(true);
            
            return user;
      
        } catch(error) {
              console.log(error);
              return error;
        }
    }

    const postAd = (title,body,key) => {
        if (foundPost) {
            return (
                <View>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('ReviewDetails', {title,body,key});
                        modalTenantOff();
                    }}>
                        <Card>
                            <Text style={globalStyles.titleText}>{ title }</Text>
                        </Card>
                    </TouchableOpacity>
                    <FlatButton text="Apply" onPress={() => {applyPost()}} disabled={disabledApply}/>   
                </View>
            );
        }
    }

    return (
        <View style={globalStyles.container}>

            <TextInput placeholder="Enter your code here: " value={key} onChangeText={key => setKey(key)}></TextInput>

            <FlatButton text="Submit" onPress={() => searchForReview(key)}/>

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