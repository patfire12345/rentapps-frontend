import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback, Modal,TextInput,ScrollView } from 'react-native';
import FlatButton from '../../shared/button';
import { Formik } from 'formik';
import { globalStyles } from '../../styles/global';
import * as yup from 'yup';

const reviewSchema = yup.object({
    address: yup.string()
        .required(),

    startMonth: yup.string()
        .required()
        .test('is-num-1-5', 'Invalid Month', (val) => {
            return parseInt(val) < 13 && parseInt(val) > 0;
        }),

    startYear: yup.string()
        .required()
        .test('is-num-1-5', 'Invalid Year', (val) => {
            return parseInt(val) < 2021 && parseInt(val) > 2000;
        }),

    endMonth: yup.string()
        .required()
        .test('is-num-1-5', 'Invalid Month', (val) => {
            return parseInt(val) < 13 && parseInt(val) > 0;
        }),

    endYear: yup.string()
        .required()
        .test('is-num-1-5', 'Invalid Year', (val) => {
            return parseInt(val) < 2021 && parseInt(val) > 2000;
        }),

    landlordName: yup.string()
        .required()
        .min(2),

    landlordEmail: yup.string()
        .required()
        .test('is-num-1-6', 'Invalid Email Address', (val) => {
            return ("@" in val);
        }),

    landlordPhone: yup.string()
        .required()
        .test('is-num-1-9', 'Invalid Phone Number', (val) => {
            return (val.length == 9);
        }),
})

export default function ResidenceSection({functions, residenceValue}) {

    return (
        
        <View style={globalStyles.container}>
            <Text>
                Previous Residence Information:
            </Text>
            <View style={globalStyles.container}>
                <Formik 
                    initialValues={{ address: residenceValue.address, startMonth: residenceValue.startMonth, 
                        startYear: residenceValue.startYear, endMonth: residenceValue.endMonth, 
                        endYear: residenceValue.endYear, landlordName: residenceValue.landlordName, 
                        landlordEmail: residenceValue.landlordEmail, landlordPhone: residenceValue.landlordPhone}}
                        
                    onSubmit={async (values) => {
                        await functions.addResInfo(values);
                        functions.closeFunction();
                    }}
                >
                    {(props) => (
                        <ScrollView> 
                        <View style={styles.list}>
                               
                                <TextInput 
                                    style={globalStyles.input} 
                                    placeholder="Address"
                                    onChangeText={props.handleChange("address")}
                                    value={props.values.address}
                                    onBlur={props.handleBlur('address')}
                                />
                                <Text style={globalStyles.errorText}>{ props.touched.address && props.errors.address }</Text>
                                <TextInput 
                                    style={globalStyles.input} 
                                    placeholder="Start Month"
                                    onChangeText={props.handleChange("startMonth")}
                                    value={props.values.startMonth}
                                    keyboardType='numeric'
                                    onBlur={props.handleBlur('startMonth')}
                                />
                                <Text style={globalStyles.errorText}>{ props.touched.startMonth && props.errors.startMonth }</Text>
                                <TextInput 
                                    style={globalStyles.input} 
                                    placeholder="Start Year"
                                    onChangeText={props.handleChange("startYear")}
                                    value={props.values.startYear}
                                    keyboardType='numeric'
                                    onBlur={props.handleBlur('startYear')}
                                />
                                <Text style={globalStyles.errorText}>{ props.touched.startYear && props.errors.startYear }</Text>

                                <TextInput 
                                    style={globalStyles.input} 
                                    placeholder="End Month"
                                    onChangeText={props.handleChange("endMonth")}
                                    value={props.values.endMonth}
                                    keyboardType='numeric'
                                    onBlur={props.handleBlur('endMonth')}
                                />
                                <Text style={globalStyles.errorText}>{ props.touched.endMonth && props.errors.endMonth }</Text>

                                <TextInput 
                                    style={globalStyles.input} 
                                    placeholder="End Year"
                                    onChangeText={props.handleChange("endYear")}
                                    value={props.values.endYear}
                                    keyboardType='numeric'
                                    onBlur={props.handleBlur('endYear')}
                                />
                                <Text style={globalStyles.errorText}>{ props.touched.endYear && props.errors.endYear }</Text>

                                <TextInput 
                                    style={globalStyles.input} 
                                    placeholder="Landlord Name"
                                    onChangeText={props.handleChange("landlordName")}
                                    value={props.values.landlordName}
                                    onBlur={props.handleBlur('landlordName')}
                                />
                                <Text style={globalStyles.errorText}>{ props.touched.landlordName && props.errors.landlordName }</Text>

                                <TextInput 
                                    style={globalStyles.input} 
                                    placeholder="Landlord Email"
                                    onChangeText={props.handleChange("landlordEmail")}
                                    value={props.values.landlordEmail}
                                    onBlur={props.handleBlur('landlordEmail')}
                                />
                                <Text style={globalStyles.errorText}>{ props.touched.landlordEmail && props.errors.landlordEmail }</Text>

                                <TextInput 
                                    style={globalStyles.input} 
                                    placeholder="Landlord Phone"
                                    onChangeText={props.handleChange("landlordPhone")}
                                    value={props.values.landlordPhone}
                                    keyboardType='numeric'
                                    onBlur={props.handleBlur('landlordPhone')}
                                />
                                <Text style={globalStyles.errorText}>{ props.touched.landlordPhone && props.errors.landlordPhone }</Text>

                                <FlatButton text="save" onPress={props.handleSubmit}/>
                            
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