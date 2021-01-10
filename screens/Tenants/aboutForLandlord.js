import React,{useState,useEffect} from 'react';
import { StyleSheet, View, Text, TextInput, TouchableWithoutFeedback, Modal, Keyboard,TouchableOpacity,ScrollView } from 'react-native';
import { globalStyles } from '../../styles/global';
import config from '../../config';

export default function About({ navigation }) {

    const email = navigation.getParam('email');

    const [petType, setPetType] = useState();
    const [hasRes, sethasRes] = useState({});

    // const [hasVehicle, setHasVehicle] = useState({
    //     make: navigation.getParam('make'),
    //     model: navigation.getParam('model'),
    //     year: navigation.getParam('year'),
    //     license: navigation.getParam('license'),
    // });

    // const [hasVehicleStatus, setHasVehicleStatus] = useState("No vehicle");

    const [isStudent, setIsStudent] = useState();
    const [isEmployed, setIsEmployed] = useState();
    const [generalStatus, setGeneralStatus] = useState({});
    const IP = config.IP;

    const [hasRef,setHasRef] = useState({

    })

    const getUser = async (email) => {
        try {
            const response = await fetch(IP + "/getApplication", 
                {
                method: "POST", 
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
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

    useEffect(() => {
        async function fetchData() {
            const userState = await getUser(email);
    
            setPetType(userState.userDetails.pets);
            sethasRes({
                address: userState.userDetails.resAddress,
                startMonth: userState.userDetails.resDuration,
                startYear: userState.userDetails.resDuration,
                endMonth: userState.userDetails.resDuration,
                endYear: userState.userDetails.resDuration,
                landlordName: userState.userDetails.landlordName,
                landlordEmail: userState.userDetails.landlordEmail,
                landlordPhone: userState.userDetails.landlordPhone,
            });

            
            setGeneralStatus({
                employment: userState.userDetails.employment,
                university: userState.userDetails.university,
                universityLocation: userState.userDetails.universityLocation,
                studyYear: userState.userDetails.studyYear,
                occupation: userState.userDetails.occupation,
                company: userState.userDetails.company,
                companyAddress: userState.userDetails.companyAddress,
                companyPhone: userState.userDetails.companyPhone,
                position: userState.userDetails.position,
                occupationDuration: userState.userDetails.occupationDuration,
                occupationSupervisor: userState.userDetails.occupationSupervisor,
            });

            setHasRef({
                refName: userState.userDetails.refName,
                refEmail: userState.userDetails.refEmail,
                refPhone: userState.userDetails.refPhone,
            });
            setIsStudent(userState.userDetails.employment == "student" ? true : false);
            setIsEmployed(userState.userDetails.employment == "employee" ? true : false);
    
        }
        fetchData();
    }, []) 

    const status = () => {
        if (!(isStudent || isEmployed)) {
            return (
                <View>
                    <Text style={globalStyles.application}>Currently: Unemployed</Text>
                </View>
        )}

        else if (isStudent) {
            return (
                <View>
                    <Text style={globalStyles.application}>Currently: Student</Text>
                    <Text style={globalStyles.application}>School: {generalStatus.university}</Text>
                    <Text style={globalStyles.application}>Area of Study: {generalStatus.universityLocation}</Text>
                    <Text style={globalStyles.application}>Year of Study: {generalStatus.studyYear}</Text>
                </View>
        )}

        else if (isEmployed) {
            return (
                <View>
                    <Text style={globalStyles.application}>Currently: Employed</Text>
                    <Text style={globalStyles.application}>Occupation: {generalStatus.occupation}</Text>
                    <Text style={globalStyles.application}>Employer: {generalStatus.company}</Text>
                    <Text style={globalStyles.application}>Business Address: {generalStatus.companyAddress}</Text>
                    <Text style={globalStyles.application}>Business Telephone: {generalStatus.companyPhone}</Text>
                    <Text style={globalStyles.application}>Position Held: {generalStatus.position}</Text>
                    <Text style={globalStyles.application}>Length of Employment: {generalStatus.occupationDuration}</Text>
                    <Text style={globalStyles.application}>Name of Supervisor: {generalStatus.occupationSupervisor}</Text>
                </View>
        )}
    }


    return (
        <View style={globalStyles.container}>
            <ScrollView>
                <Text style={globalStyles.application}>Profile</Text>
                <Text></Text>
                <View>
                    <Text style={globalStyles.application}>Pet Type: {petType}</Text>
                </View>
                <Text></Text>
                <View>
                <Text style={globalStyles.application}>Residence Information: </Text>
                <Text style={globalStyles.application}>Residence Address: {hasRes.address}</Text>
                <Text style={globalStyles.application}>Residence Duration: {hasRes.startMonth}/{hasRes.startYear} - {hasRes.endMonth}/{hasRes.endYear}</Text>
                <Text style={globalStyles.application}>Landlord Name: {hasRes.landlordName}</Text>
                <Text style={globalStyles.application}>Landlord Email: {hasRes.landlordEmail}</Text>
                <Text style={globalStyles.application}>Landlord Phone: {hasRes.landlordPhone}</Text>
                </View>
                <Text></Text>
                {/* <View>
                <Text>Model: {hasVehicle.model}</Text>
                <Text>Make: {hasVehicle.make}</Text>
                <Text>Year: {hasVehicle.year}</Text>
                <Text>License: {hasVehicle.license}</Text>
                </View> */}
                <Text></Text>
                <View>
                <Text style={globalStyles.application}>Personal References: </Text>
                <Text style={globalStyles.application}>Name: {hasRef.refName} </Text>
                <Text style={globalStyles.application}>Phone Number: {hasRef.refPhone} </Text>
                <Text style={globalStyles.application}>Email: {hasRef.refEmail} </Text>
                </View>
                <Text></Text>
                {status()}
                <Text></Text>
            </ScrollView>
        </View>
    )
}