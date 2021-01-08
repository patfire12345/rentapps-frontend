import React,{useState} from 'react';
import { StyleSheet, View, Text, TextInput, TouchableWithoutFeedback, Modal, Keyboard,TouchableOpacity,ScrollView } from 'react-native';
import { globalStyles } from '../../styles/global';
import PetSection from './pets';
import ResidenceSection from './residence';
import ReferenceSection from './reference';
import StatusSection from './status';
import config from '../../config';

export default function About({ navigation }) {

    const [petType, setPetType] = useState(navigation.getParam('pets'));
    const [petModal, setPetModal] = useState(false);
    const [email, setEmail] = useState(navigation.getParam('email'));
    const IP = config.IP;

    const openPetModal = () => {
        setPetModal(true);
    }

    const closePetModal = () => {
        setPetModal(false);
    }

    const addPetType = async (pets) => {
        try {
            setPetType(pets);
            const response = await fetch(IP + "/pets", 
                {
                method: "POST", 
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({pets,email})
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

    const [hasRes, sethasRes] = useState({
        address: navigation.getParam('address'),
        startMonth: navigation.getParam('duration'),
        startYear: navigation.getParam('duration'),
        endMonth: navigation.getParam('duration'),
        endYear: navigation.getParam('duration'),
        landlordName: navigation.getParam('landlordName'),
        landlordEmail: navigation.getParam('landlordEmail'),
        landlordPhone: navigation.getParam('landlordPhone'),
    });
    const [resModal, setResModal] = useState(false);

    const openResModal = () => {
        setResModal(true);
    }

    const closeResModal = () => {
        setResModal(false);
    }

    const addResInfo = async (resInfo) => {
        resInfo.key = Math.random().toString();
        sethasRes({
            address: resInfo.address,
            startMonth: resInfo.startMonth,
            startYear: resInfo.startYear,
            endMonth: resInfo.endMonth,
            endYear: resInfo.endYear,
            landlordName: resInfo.landlordName,
            landlordEmail: resInfo.landlordEmail,
            landlordPhone: resInfo.landlordPhone,
        })

        try {
            const response = await fetch(IP + "/residence", 
                {
                method: "POST", 
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({address: resInfo.address, duration: resInfo.startMonth, 
                    landlordName: resInfo.landlordName, landlordEmail: resInfo.landlordEmail,
                    landlordPhone: resInfo.landlordPhone,email})
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

    // const [hasVehicle, setHasVehicle] = useState({
    //     make: navigation.getParam('make'),
    //     model: navigation.getParam('model'),
    //     year: navigation.getParam('year'),
    //     license: navigation.getParam('license'),
    // });

    // const [hasVehicleStatus, setHasVehicleStatus] = useState("No vehicle");

    // const [vehicleModal, setVehicleModal] = useState(false);

    // const openVehicleModal = () => {
    //     setVehicleModal(true);
    // }

    // const closeVehicleModal = () => {
    //     setVehicleModal(false);
    // }

    // const addVehicle = async (vehicle) => {
    //     vehicle.key = Math.random().toString();
    //     setHasVehicle({
    //         make: vehicle.make,
    //         model: vehicle.model,
    //         year: vehicle.year,
    //         license: vehicle.license,
    //     });

    //     try {
    //         const response = await fetch(IP + "/vehicle", 
    //             {
    //             method: "POST", 
    //             headers: {
    //                 Accept: 'application/json',
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({model: vehicle.model, make: vehicle.make, 
    //                 year: vehicle.year, license: vehicle.license, email})
    //             }
    //         );
            
    //         if(!response.ok) {
    //             throw new Error(response.messages)
    //         }
            
    //         const user = await response.json();

    //         console.log(user);
            
    //         return user;

    //     } catch(error) {
    //         console.log(error);
    //         return error;
    //     }
    // }

    const [isStudent, setIsStudent] = useState(navigation.getParam('employment') == "student" ? true : false);
    const [isEmployed, setIsEmployed] = useState(navigation.getParam('employment') == "employee" ? true : false);
    const [statusModal,setStatusModal] = useState(false);
    const [generalStatus, setGeneralStatus] = useState({
        employment: navigation.getParam('employment'),
        school: navigation.getParam('university'),
        location: navigation.getParam('universityLocation'),
        year: navigation.getParam('studyYear'),
        job: navigation.getParam('occupation'),
        company: navigation.getParam('company'),
        address: navigation.getParam('companyAddress'),
        phone: navigation.getParam('companyPhone'),
        title: navigation.getParam('position'),
        duration: navigation.getParam('occupationDuration'),
        employer: navigation.getParam('occupationSupervisor'),
    });

    const changeStudent = (status) => {
        setGeneralStatus({
            employment: "student",
            school: status.school,
            location: status.location,
            year: status.year,
        });
    }

    const changeEmployee = (status) => {
        setGeneralStatus({
            employment: "employee",
            job: status.job,
            company: status.company,
            address: status.address,
            phone: status.phone,
            title: status.title,
            duration: status.duration,
            employer: status.employer,
        });
    }

    const changeStatus = async (status,employment) => {
        status.key = Math.random().toString();

        if (isStudent) {
            changeStudent(status);
        }

        else if (isEmployed) {
            changeEmployee(status);
        }

        try {
            const response = await fetch(IP + "/employment", 
                {
                method: "POST", 
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({employment,university: status.school, universityLocation: status.location, 
                    studyYear: status.year, occupation: status.job, company: status.company, 
                    companyAddress: status.address, companyPhone: status.phone, position: status.title, 
                    occupationDuration: status.duration, occupationSupervisor: status.employer,email})
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

    const status = () => {
        if (!(isStudent || isEmployed)) {
            return (
                <TouchableOpacity onPress={openStatusModal}>
                    <View>
                        <Text>Currently: Unemployed</Text>
                    </View>
                </TouchableOpacity>
        )}

        else if (isStudent) {
            return (
                <TouchableOpacity onPress={openStatusModal}>
                    <View>
                        <Text>Currently: Student</Text>
                        <Text>School: {generalStatus.school}</Text>
                        <Text>Area of Study: {generalStatus.location}</Text>
                        <Text>Year of Study: {generalStatus.year}</Text>
                    </View>
                </TouchableOpacity>
        )}

        else if (isEmployed) {
            return (
                <TouchableOpacity onPress={openStatusModal}>
                    <View>
                        <Text>Currently: Employed</Text>
                        <Text>Occupation: {generalStatus.job}</Text>
                        <Text>Employer: {generalStatus.company}</Text>
                        <Text>Business Address: {generalStatus.address}</Text>
                        <Text>Business Telephone: {generalStatus.phone}</Text>
                        <Text>Position Held: {generalStatus.title}</Text>
                        <Text>Length of Employment: {generalStatus.duration}</Text>
                        <Text>Name of Supervisor: {generalStatus.employer}</Text>
                    </View>
                </TouchableOpacity>
        )}
    }

    const openStatusModal = () => {
        setStatusModal(true);
    }

    const closeStatusModal = () => {
        setStatusModal(false);
    }

    const becomeStudent = () => {
        setIsStudent(true);
        setIsEmployed(false);
    }

    const becomeEmployed = () => {
        setIsEmployed(true);
        setIsStudent(false);
    }

    const becomeUnemployed = () => {
        setIsEmployed(false);
        setIsStudent(false);
    }

    const [hasRef,setHasRef] = useState({
        name: navigation.getParam("refName"),
        phone: navigation.getParam("refPhone"),
        email: navigation.getParam("refEmail"),
    })

    const [refModal,setRefModal] = useState(false)

    const openRefModal = () => {
        setRefModal(true);
    }

    const closeRefModal = () => {
        setRefModal(false);
    }

    const addRef = async (reference) => {
        reference.key = Math.random().toString();
        setHasRef({
            name: reference.name,
            phone: reference.phone,
            email: reference.email,
        });

        try {
            const response = await fetch(IP + "/reference", 
                {
                method: "POST", 
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({refName: reference.name, refEmail: reference.email, 
                    refPhone: reference.phone, email})
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
        <View style={globalStyles.container}>

            <Modal visible={petModal} animationType='slide'>
                    <PetSection functions= 
                    {{  
                        openFunction: openResModal, 
                        closeFunction: closePetModal,
                        petType: addPetType,  
                    }}/>
            </Modal> 

            <Modal visible={resModal} animationType='slide'>
                
                    <ResidenceSection functions=
                    {{  
                        // openFunction: openVehicleModal, 
                        closeFunction: closeResModal,
                        addResInfo: addResInfo,
                    }}/>
            </Modal>

            <Modal visible={statusModal} animationType='slide'>
                <StatusSection functions=
                    {{
                        openFunction: openRefModal,
                        closeFunction: closeStatusModal,
                        becomeStudent: becomeStudent,
                        becomeEmployed: becomeEmployed,
                        becomeUnemployed: becomeUnemployed,
                        changeStatus: changeStatus,
                    }} />
            </Modal>

            <Modal visible={refModal} animationType='slide'>
                <ReferenceSection functions=
                    {{
                        closeFunction: closeRefModal,
                        addRefInfo: addRef,
                    }} />
            </Modal>

            <ScrollView>
                <Text>Profile</Text>
                <Text></Text>
                <TouchableOpacity onPress={openPetModal}>
                    <Text>Pet Type: {petType}</Text>
                </TouchableOpacity>
                <Text></Text>
                <TouchableOpacity onPress={openResModal}>
                <Text>Residence Information: </Text>
                <Text>Residence Address: {hasRes.address}</Text>
                <Text>Residence Duration: {hasRes.startMonth}/{hasRes.startYear} - {hasRes.endMonth}/{hasRes.endYear}</Text>
                <Text>Landlord Name: {hasRes.landlordName}</Text>
                <Text>Landlord Email: {hasRes.landlordEmail}</Text>
                <Text>Landlord Phone: {hasRes.landlordPhone}</Text>
                </TouchableOpacity>
                <Text></Text>
                {/* <TouchableOpacity onPress={openVehicleModal}>
                <Text>Model: {hasVehicle.model}</Text>
                <Text>Make: {hasVehicle.make}</Text>
                <Text>Year: {hasVehicle.year}</Text>
                <Text>License: {hasVehicle.license}</Text>
                </TouchableOpacity> */}
                <Text></Text>
                <TouchableOpacity onPress={openRefModal}>
                <Text>Personal References: </Text>
                <Text>Name: {hasRef.name} </Text>
                <Text>Phone Number: {hasRef.phone} </Text>
                <Text>Email: {hasRef.email} </Text>
                </TouchableOpacity>
                <Text></Text>
                {status()}
                <Text></Text>
            </ScrollView>
        </View>
    )
}