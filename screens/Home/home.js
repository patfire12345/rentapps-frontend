import React, { useState } from 'react';
import { StyleSheet, View, Modal,TouchableWithoutFeedback, Keyboard,ScrollView, Alert } from 'react-native';
import { globalStyles } from '../../styles/global';
import { MaterialIcons } from '@expo/vector-icons';
import ReviewForm from '../Advertisements/reviewForm';
import FlatButton from '../../shared/button';
import config from '../../config';

export default function Home({ navigation }) {
  const [modalLandlordOpen, setModalLandlordOpen] = useState(false);
  const [userState, setuserState] = useState(navigation.getParam("userState"));
  const [userEmail, setUserEmail] = useState(navigation.getParam("email"));
  const [postNumber, setPostNumber] = useState(navigation.getParam("postNumber"));
  const [reviews, setReviews] = useState(navigation.getParam("reviews"));

  const IP = config.IP;

  const addReview = async (review) => {
    review.key = userState.user.userDetails.userKey + postNumber;
    setPostNumber(parseInt(postNumber)+1);
    setReviews((currentReviews) => {
        return currentReviews ? [...currentReviews,review] : [review] 
    })
    setModalLandlordOpen(false);

    try {
      const response = await fetch(IP + "/addPost", 
          {
          method: "POST", 
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ title:review.title, body:review.body, key:review.key, email:userEmail })
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

  const aboutPageButton = () => {
    return (
      <FlatButton
        text='My Application'
        style={styles.modalToggle}
        flexDirection="row"
        flex={1}
        onPress={() => navigation.navigate('About', {
          user: userState,
          pets: userState.pets,
          email: userEmail,
          address: userState.user.userDetails.resAddress,
          duration: userState.user.userDetails.resDuration,
          startMonth: userState.user.userDetails.resStartMonth,
          startYear: userState.user.userDetails.resStartYear,
          endMonth: userState.user.userDetails.resEndMonth,
          endYear: userState.user.userDetails.resEndYear,
          landlordName: userState.user.userDetails.landlordName,
          landlordEmail: userState.user.userDetails.landlordEmail,
          landlordPhone: userState.user.userDetails.landlordPhone,
          model: userState.user.userDetails.vehicleModel,
          make: userState.user.userDetails.vehicleMake,
          year: userState.user.userDetails.vehicleYear,
          license: userState.user.userDetails.vehicleLicense,
          employment: userState.user.userDetails.employment,
          university: userState.user.userDetails.university,
          universityLocation: userState.user.userDetails.universityLocation,
          studyYear: userState.user.userDetails.studyYear,
          occupation: userState.user.userDetails.occupation,
          company: userState.user.userDetails.company,
          companyAddress: userState.user.userDetails.companyAddress,
          companyPhone: userState.user.userDetails.companyPhone,
          position: userState.user.userDetails.position,
          occupationDuration: userState.user.userDetails.occupationDuration,
          occupationSupervisor: userState.user.userDetails.occupationSupervisor,
          refName: userState.user.userDetails.refName,
          refEmail: userState.user.userDetails.refEmail,
          refPhone: userState.user.userDetails.refPhone,
      })} />
    )
  }

  const reviewDetailsApplicationPageButton = () => {
    return (
      <FlatButton
        text='Find a Listing' 
        flexDirection="row"
        flex={1}
        style={styles.modalToggle}
        onPress={() => navigation.navigate('ReviewDetailsApplication', {
          email:userEmail,
        })} 
      />
    )
  }

  const listingsPageButton = () => {
    return (
      <FlatButton
        text='My Listings'
        style={styles.modalToggle}
        onPress={() => navigation.navigate("Listings", {
          reviews: reviews,
          tenant: userState.user.userDetails.tenant,
        })}
      />
    )
  }

  const newListingButton = () => {
    return (
      <FlatButton
        text='Create a New Listing'
        style={styles.modalToggle}
        onPress={() => setModalLandlordOpen(true)} 
      />
    )
  }

  const tenantUI = () => {
    if (userState && userState.user.userDetails.tenant) {
      return (
        <View style={{flex: 1, justifyContent: "space-evenly", margin: 10, top: -15}}>
          {aboutPageButton()}
          {reviewDetailsApplicationPageButton()}
        </View>
      );
    }

    if (userState && !userState.user.userDetails.tenant) {
      return (
        <View>
          <View style={{margin: 10}}>
            {listingsPageButton()}
          </View>
          <View style={{margin: 10}}>
            {newListingButton()}
          </View>
        </View>
      );
    }
  }

  const addReviewModal = () => {
    return (
      <Modal visible={modalLandlordOpen} animationType='slide'>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView style={styles.modalContent}>
              <MaterialIcons 
                  name='close'
                  size={24} 
                  style={{...styles.modalToggle, ...styles.modalClose}} 
                  onPress={() => setModalLandlordOpen(false)} 
              />
              <ReviewForm addReview={addReview}/>
            </ScrollView>
        </TouchableWithoutFeedback>
      </Modal>
    )
  }

  const howDoesItWorkButton = () => {
    return (
      <FlatButton 
        text = "How Does It Work?"
        onPress = {() => navigation.navigate("WhatIs")}
      />
    )
  }

  const editMyProfileButton = () => {
    if (userState && !userState.user.userDetails.tenant) {
      return (
        <FlatButton 
          text = "Edit My Profile"
          onPress = {() => navigation.navigate("WhatIs")}
        />
      )
    }
  }

  const logoutButton = () => {
    return (
      <FlatButton 
        text = "Logout"
        onPress = {() => {
          Alert.alert("Log out", "Are you sure you want to log out?",
            [
              {text: "No",},
              {text: "Yes", onPress: () => navigation.replace("Login")},
            ]
          )
          }}
      />
    )
  }

  return (
    <View style={globalStyles.container}>
  
      {addReviewModal()}

      <View style={{flex: 1, justifyContent: "center"}}>
        <View style={{margin: 10}}>
          {howDoesItWorkButton()}
        </View>

        {tenantUI()}

        <View style={{margin: 10}}>
          {editMyProfileButton()}
        </View>

      </View>

      <View style={{justifyContent: "flex-end", margin: 10}}>
        {logoutButton()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalToggle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#f2f2f2',
    padding: 10,
    borderRadius: 10,
    alignSelf: 'center',
  },
  modalClose: {
    marginTop: 20,
    marginBottom: 0,
  },
  modalContent: {
    flex: 1,
  },
  buttonFlex: {
    flex: 2,
    flexDirection: "column",
  },
});