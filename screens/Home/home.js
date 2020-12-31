import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Modal,TouchableWithoutFeedback, Keyboard,ScrollView, Button } from 'react-native';
import { globalStyles } from '../../styles/global';
import { MaterialIcons } from '@expo/vector-icons';
import Card from '../../shared/card';
import ReviewForm from '../Advertisements/reviewForm';
import Register from '../Login/register';
import FlatButton from '../../shared/button';
import ReviewDetailsApplication from '../Advertisements/reviewDetailsApplication';
import Welcome from '../Login/welcome';
import config from '../../config';

export default function Home({ navigation }) {
  const [modalLandlordOpen, setModalLandlordOpen] = useState(false);
  const [modalTenantOpen, setModalTenantOpen] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(true);
  const [modalOpen3, setModalOpen3] = useState(false);
  const [reviews, setReviews] = useState([]);
  // const [reviewsInitialized, setReviewsInitialized] = useState(false);
  const [welcomeMessage,setWelcomeMessage] = useState("Hi!");
  const [userState, setuserState] = useState(false);
  const [postNumber, setPostNumber] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const IP = config.IP;

  // useEffect(() => {
  //   let isMounted = true;
  // })

  const changeEmail = (email) => {
    setUserEmail(email);
  }

  const changeWelcomeMessage = (message) => {
    setWelcomeMessage("Hi, " + message);
  }

  const storeUser = (message) => {
    setuserState(message);
    console.log(message);
  }

  const changeReviews = (review) => {
    // console.log(review);
    // if (!reviewsInitialized) {
      setReviews((currentReviews) => {
        return currentReviews ? [...currentReviews,review] : [review] 
      })
    // }
  }

  const changePostNumber = (postNum) => {
    setPostNumber(postNum);
  }

  // const reviewsAreInitialized = () => {
  //   setReviewsInitialized(true);
  // }

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

  const deleteReview = async (index) => {
    if (reviews.length == 1) {
      console.log("First");
      console.log(reviews.length);
      console.log(index);
      setReviews([]);
    }

    else if (index === reviews.length-1) {
      console.log("Second");
      console.log(reviews.length);
      console.log(index);
      setReviews(reviews.slice(0,index));
    }

    else{
      console.log("Third");
      console.log(reviews.length);
      console.log(index);
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

  const searchReview = async (key) => {
    try {
      const response = await fetch(IP + "/findPost", 
          {
          method: "POST", 
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ key })
          }
      );
      
      if(!response.ok) {
          throw new Error(response.messages)
      }
      
      const user = await response.json();

      console.log(user);
      
      return user;

    } catch(error) {
        console.log(error);
        // return error;
    }
  }

  const tenantUI = () => {
    if (userState && userState.user.userDetails.tenant) {
      return (
        <View>
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
          <FlatButton
            text='Find a Listing' 
            flexDirection="row"
            flex={1}
            style={styles.modalToggle}
            onPress={() => setModalTenantOpen(true)} 
          />
            
        </View>
      );
    }

    if (userState && !userState.user.userDetails.tenant) {
      return (
        <View>
          <FlatButton
            text='Create a New Listing'
            style={styles.modalToggle}
            onPress={() => setModalLandlordOpen(true)} 
          />
          
          <FlatList data={reviews} renderItem={({ item,index }) => (
            <View>
              <TouchableOpacity onPress={() => navigation.navigate('ReviewDetails', {title: item.title, body: item.body, key: item.key, 
              applications: item.applications})}>
                <Card>
                  <Text style={globalStyles.titleText}>{ item.title }</Text>
                </Card>
              </TouchableOpacity>
              <FlatButton text='Delete' onPress={() => deleteReview(index)}/>
            </View>
          )} />
        </View>
      );
    }
  }

  // modals
  const modalTenantOff = () => {
    setModalTenantOpen(false);
  }

  const modalOff2 = () => {
    setModalOpen2(false);
  }

  const modalOn2 = () => {
    setModalOpen2(true);
    setReviews([]);
  }

  const modalOff3 = () => {
    setModalOpen3(false);
  }

  const modalOn3 = () => {
    setModalOpen3(true);
  }

  return (
    <View style={globalStyles.container}>
  
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

      <Modal visible={modalTenantOpen} animationType='slide'>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView style={styles.modalContent}>
              <MaterialIcons 
                  name='close'
                  size={24} 
                  style={{...styles.modalToggle, ...styles.modalClose}} 
                  onPress={() => setModalTenantOpen(false)} 
              />
              <ReviewDetailsApplication searchReview={searchReview} modalTenantOff={modalTenantOff}  navigation={navigation} email={userEmail}/>
            </ScrollView>
        </TouchableWithoutFeedback>
      </Modal>

      <Modal visible={modalOpen2} animationType='slide'>
        <Welcome modalFunction={{off: modalOff2, on: modalOn3, changeWelcomeMessage, storeUser, changeEmail, changeReviews, changePostNumber}} />
      </Modal>

      <Modal visible={modalOpen3} animationType='slide'>
        <Register modalFunction={{off: modalOff3, login: modalOn2}}/>
      </Modal>

      <Text style={globalStyles.titleText}>Welcome</Text>

      {tenantUI()}

      <FlatButton 
        text = "Logout"
        onPress = {modalOn2}
      />

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
  }
});