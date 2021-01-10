import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';
import {globalStyles} from '../../styles/global';
import {Formik} from 'formik';
import FlatButton from '../../shared/button';
import config from '../../config';
import * as yup from 'yup';

const reviewSchema = yup.object({
    username: yup.string()
            .required().min(4),
    password: yup.string()
            .required().min(4),

})

const IP = config.IP;

export default function Welcome({modalFunction}) {

    const verifyLogin = async (email,password) => {
        try {
            const response = await fetch(IP+"/login", 
                {
                method: "POST", 
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email, password})
                }
            );
            
            if(!response.ok) {
                throw new Error(response.messages)
            }
            
            const user = await response.json();
            
            return {
                user: user,
                verified: true,
                email: user.userDetails.email,
                firstName: user.userDetails.firstName,
                pets: user.userDetails.pets,
            }

        } catch(error) {
            console.log(error);
            return {
                user: error,
                verified: false
            }
        }
    }

    const onSubmitRegister = () => {
        modalFunction.off();
        modalFunction.on();
    }

    return (
        <ScrollView>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={globalStyles.container}>
                    <Formik
                        initialValues={{ username: "", password: "" }}
                        validationSchema={reviewSchema}
                        onSubmit={async (values,action) => {
                            const user = await verifyLogin(values.username,values.password);
                            if (user.verified) {
                                modalFunction.storeUser(user);
                                modalFunction.changeEmail(user.email);
                                modalFunction.changePostNumber(user.user.userDetails.postNumber);

                                user.user.userDetails.reviews.map((review) => {
                                    modalFunction.changeReviews(
                                        {title: review.title, body: review.body, key: review.key, applications: review.applications}
                                    );
                                })

                                // console.log("Logged in!")

                                modalFunction.off();
                            }

                            action.resetForm();
                            
                        }}
                    >
                        {(props) => (
                            <View style={globalStyles.container}>
                                <View style={{flex: 1, justifyContent: "center"}}>
                                    <Text style={[globalStyles.titleText]}>RentApps</Text>

                                    <View style={{top: 30}}>
                                        <TextInput 
                                            style={globalStyles.input} 
                                            placeholder="Email"
                                            onChangeText={props.handleChange("username")}
                                            value={props.values.username}
                                            onBlur={props.handleBlur('username')}
                                        />
                                        <Text style={globalStyles.errorText}>{ props.touched.username && props.errors.username }</Text>
                                        <TextInput 
                                            style={globalStyles.input} 
                                            placeholder="Password"
                                            onChangeText={props.handleChange("password")}
                                            value={props.values.password}
                                            onBlur={props.handleBlur('password')}
                                            secureTextEntry = {true}
                                        />
                                        <Text style={globalStyles.errorText}>{ props.touched.password && props.errors.password }</Text>
                                    </View>

                                {/* </View>

                                <View style={{flex: 1, justifyContent: "flex-end"}}> */}
                                    <View style={{top: 40}}>
                                        <View style={styles.normalButton}>
                                            <FlatButton 
                                                text="Login" 
                                                onPress={props.handleSubmit}
                                            />
                                        </View>

                                        <View style={styles.normalButton}>
                                            <FlatButton 
                                                text="Register" 
                                                onPress={onSubmitRegister}
                                            />
                                        </View>
                                    </View>
                                </View>
                            </View>
                        )}
                    </Formik>
                </View>
            </TouchableWithoutFeedback>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    normalButton: {
        margin: 10,
    }    
});