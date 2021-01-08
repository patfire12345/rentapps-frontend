import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback, Modal,TextInput,ScrollView } from 'react-native';
import FlatButton from '../../shared/button';
import { Formik } from 'formik';
import { globalStyles } from '../../styles/global';
import * as yup from 'yup';

const reviewSchema = yup.object({
    
})

export default function ReferenceSection({functions}) {

    return (
        
        <View style={globalStyles.container}>
            <Text>
                Personal References:
            </Text>
            <View style={globalStyles.container}>
                <Formik 
                    initialValues={{ name: "", phone: "", email: "",}}
                    onSubmit={async (values) => {
                        await functions.addRefInfo(values);
                        functions.closeFunction();
                        
                    }}
                >
                    {(props) => (
                        <ScrollView> 
                        <View style={styles.list}>
                               
                                <TextInput 
                                    style={globalStyles.input} 
                                    placeholder="Name"
                                    onChangeText={props.handleChange("name")}
                                    value={props.values.name}
                                    onBlur={props.handleBlur('name')}
                                />
                                <Text style={globalStyles.errorText}>{ props.touched.name && props.errors.name }</Text>
                                <TextInput 
                                    style={globalStyles.input} 
                                    placeholder="Phone Number"
                                    onChangeText={props.handleChange("phone")}
                                    value={props.values.phone}
                                    keyboardType='numeric'
                                    onBlur={props.handleBlur('phone')}
                                />
                                <Text style={globalStyles.errorText}>{ props.touched.phone && props.errors.phone }</Text>
                                <TextInput 
                                    style={globalStyles.input} 
                                    placeholder="Email"
                                    onChangeText={props.handleChange("email")}
                                    value={props.values.email}
                                    onBlur={props.handleBlur('email')}
                                />
                                <Text style={globalStyles.errorText}>{ props.touched.email && props.errors.email }</Text>

                                <FlatButton text="update" onPress={props.handleSubmit}/>
                            
                        </View>
                        </ScrollView>
                    )}
                    
                </Formik>
            </View>
        </View>
        
    )
}

const styles = StyleSheet.create({
    
})