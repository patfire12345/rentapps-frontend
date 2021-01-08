import React,{useState} from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView} from 'react-native';
import {Formik} from 'formik';
import FlatButton from '../../shared/button';
import {globalStyles} from '../../styles/global';
import * as yup from 'yup';
import config from '../../config';

const reviewSchema = yup.object({
    firstname: yup.string()
            .required(),
    lastname: yup.string()
            .required(),
    email: yup.string()
            .required(),
    password: yup.string()
            .required(),
})

export default function Register({modalFunction}) {


    const [tenant,setTenant] = useState(true);
    const IP = config.IP;

    const setTenantOn = () => {
        setTenant(true);
    }

    const setTenantOff = () => {
        setTenant(false);
    }

    const addInfo = async (email,password,firstName,lastName) => {
        try {
            const response = await fetch(IP + "/signup", 
                {
                method: "POST", 
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email, password, firstName, lastName, tenant})
                }
            );
            
            if(!response.ok) {
                throw new Error(response.messages)
            }
            const user = await response.json();
            
            return true;

        } catch(error) {
            console.log(error);
            return false;
        }
    }


    return (
        <ScrollView>
            <View style={globalStyles.container}>
                <View style={globalStyles.twoButtons}>
                    <FlatButton text="Tenant" onPress={setTenantOn} />
                    <FlatButton text="Landlord" onPress={setTenantOff} />
                </View>
                <Formik
                    initialValues={{ firstname: "", lastname: "", password: "", email: "" }}
                    validationSchema={reviewSchema}
                    onSubmit={async (values,action) => {

                        if (await addInfo( values.email, values.password, values.firstname, values.lastname, tenant )) {
                            modalFunction.off();
                            modalFunction.login();
                        }
                    }}
                >
                    {(props) => (
                        <View>
                            <TextInput 
                                style={globalStyles.input} 
                                placeholder="First Name"
                                onChangeText={props.handleChange("firstname")}
                                value={props.values.firstname}
                                onBlur={props.handleBlur('firstname')}
                            />
                            <Text style={globalStyles.errorText}>{ props.touched.firstname && props.errors.firstname }</Text>
                            <TextInput 
                                style={globalStyles.input} 
                                placeholder="Last Name"
                                onChangeText={props.handleChange("lastname")}
                                value={props.values.lastname}
                                onBlur={props.handleBlur('lastname')}
                            />
                            <Text style={globalStyles.errorText}>{ props.touched.lastname && props.errors.lastname }</Text>
                            <TextInput 
                                style={globalStyles.input} 
                                placeholder="Email"
                                onChangeText={props.handleChange("email")}
                                value={props.values.email}
                                onBlur={props.handleBlur('email')}
                            />
                            <Text style={globalStyles.errorText}>{ props.touched.email && props.errors.email }</Text>

                            <TextInput 
                                style={globalStyles.input} 
                                placeholder="Password"
                                onChangeText={props.handleChange("password")}
                                value={props.values.password}
                                onBlur={props.handleBlur('password')}
                            />
                            <Text style={globalStyles.errorText}>{ props.touched.password && props.errors.password }</Text>
                            <FlatButton 
                                text="Submit" 
                                onPress={props.handleSubmit}
                            />
                        </View>
                    )}
                </Formik>
            </View>
        </ScrollView>
    )
}