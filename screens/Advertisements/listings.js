import React from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import Card from '../../shared/card';
import { globalStyles } from '../../styles/global';
import config from '../../config';
import FlatButton from '../../shared/button';

export default function Listings({navigation}) {

    const IP = config.IP;

    const deleteReview = async (index) => {
        if (reviews.length == 1) {
          setReviews([]);
        }
    
        else if (index === reviews.length-1) {
          setReviews(reviews.slice(0,index));
        }
    
        else{
          setReviews(reviews.slice(0,index).concat(reviews.slice(index+1,reviews.length)));
        }
    
        try {
          const response = await fetch(IP + "/deletePost", 
              {
              method: "POST", 
              headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ index, email:userEmail })
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

    return (
        <FlatList data={navigation.getParam("reviews")} renderItem={({ item,index }) => (
            <View style={{margin: 20}}>
              <TouchableOpacity onPress={() => {
                navigation.navigate('ReviewDetails', {title: item.title, body: item.body, key: item.key, 
                applications: item.applications, tenant: navigation.getParam("tenant")});
              }}>
                <Card>
                  <Text style={globalStyles.titleText}>{ item.title }</Text>
                </Card>
              </TouchableOpacity>
              <FlatButton text='Delete' onPress={() => deleteReview(index)}/>
            </View>
          )} />
    )
}