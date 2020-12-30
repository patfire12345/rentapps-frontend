import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback, Modal,TextInput,ScrollView } from 'react-native';
import FlatButton from '../../shared/button';
import { Formik } from 'formik';
import { globalStyles } from '../../styles/global';
import * as yup from 'yup';

const reviewSchema = yup.object({
    
})

export default function StatusSection({functions}) {

    const [isStudent, setIsStudent] = useState(false);
    const [isEmployed, setIsEmployed] = useState(false);

    const student = () => {
        functions.becomeStudent();
        setIsStudent(true);
        setIsEmployed(false);
    }

    const employed = () => {
        functions.becomeEmployed();
        setIsStudent(false);
        setIsEmployed(true);
    }

    const unemployed = () => {
        functions.closeFunction();
        //functions.openFunction();
        functions.becomeUnemployed();
    }

    const status = () => {
        if (isStudent) {
            return (
                <View style={globalStyles.container}>
                    <Formik 
                        initialValues={{ school: "", location: "", year: "",}}
                        //validationSchema={reviewSchema}
                        onSubmit={async (values) => {
                            console.log(values);
                            await functions.changeStatus(values,"student");
                            functions.closeFunction();
                            //functions.openFunction();
                            
                        }}
                    >
                        {(props) => (
                            <ScrollView> 
                            <View style={styles.list}>
                                
                                    <TextInput 
                                        style={globalStyles.input} 
                                        placeholder="Institution"
                                        onChangeText={props.handleChange("school")}
                                        value={props.values.school}
                                        onBlur={props.handleBlur('school')}
                                    />
                                    <Text style={globalStyles.errorText}>{ props.touched.school && props.errors.school }</Text>
                                    <TextInput 
                                        style={globalStyles.input} 
                                        placeholder="Area of Study"
                                        onChangeText={props.handleChange("location")}
                                        value={props.values.location}
                                        onBlur={props.handleBlur('location')}
                                    />
                                    <Text style={globalStyles.errorText}>{ props.touched.location && props.errors.location }</Text>
                                    <TextInput 
                                        style={globalStyles.input} 
                                        placeholder="Year of Study"
                                        onChangeText={props.handleChange("year")}
                                        value={props.values.year}
                                        onBlur={props.handleBlur('year')}
                                    />
                                    <Text style={globalStyles.errorText}>{ props.touched.year && props.errors.year }</Text>

                                    <FlatButton text="save" onPress={props.handleSubmit}/>
                                
                            </View>
                            </ScrollView>
                        )}
                        
                    </Formik>
                </View>
            )
        }

        else if (isEmployed) {
            return (
                <View style={globalStyles.container}>
                    <Formik 
                        initialValues={{ job: "", company: "", address: "", phone: "", title: "", duration: "", employer: "",}}
                        //validationSchema={reviewSchema}
                        onSubmit={async (values) => {
                            console.log(values);
                            await functions.changeStatus(values,"employee");
                            functions.closeFunction();
                            //functions.openFunction();
                            
                        }}
                    >
                        {(props) => (
                            <ScrollView> 
                            <View style={styles.list}>
                                
                                    <TextInput 
                                        style={globalStyles.input} 
                                        placeholder="Occupation"
                                        onChangeText={props.handleChange("job")}
                                        value={props.values.job}
                                        onBlur={props.handleBlur('job')}
                                    />
                                    <Text style={globalStyles.errorText}>{ props.touched.job && props.errors.job }</Text>
                                    <TextInput 
                                        style={globalStyles.input} 
                                        placeholder="Company"
                                        onChangeText={props.handleChange("company")}
                                        value={props.values.company}
                                        onBlur={props.handleBlur('company')}
                                    />
                                    <Text style={globalStyles.errorText}>{ props.touched.company && props.errors.company }</Text>
                                    <TextInput 
                                        style={globalStyles.input} 
                                        placeholder="Company Address"
                                        onChangeText={props.handleChange("address")}
                                        value={props.values.address}
                                        onBlur={props.handleBlur('address')}
                                    />
                                    <Text style={globalStyles.errorText}>{ props.touched.address && props.errors.address }</Text>
                                    <TextInput 
                                        style={globalStyles.input} 
                                        placeholder="Company Telephone"
                                        onChangeText={props.handleChange("phone")}
                                        value={props.values.phone}
                                        onBlur={props.handleBlur('phone')}
                                    />
                                    <Text style={globalStyles.errorText}>{ props.touched.phone && props.errors.phone }</Text>
                                    <TextInput 
                                        style={globalStyles.input} 
                                        placeholder="Position Held"
                                        onChangeText={props.handleChange("title")}
                                        value={props.values.title}
                                        onBlur={props.handleBlur('title')}
                                    />
                                    <Text style={globalStyles.errorText}>{ props.touched.title && props.errors.title }</Text>
                                    <TextInput 
                                        style={globalStyles.input} 
                                        placeholder="Length of Employment"
                                        onChangeText={props.handleChange("duration")}
                                        value={props.values.duration}
                                        onBlur={props.handleBlur('duration')}
                                    />
                                    <Text style={globalStyles.errorText}>{ props.touched.duration && props.errors.duration }</Text>
                                    <TextInput 
                                        style={globalStyles.input} 
                                        placeholder="Name of Supervisor"
                                        onChangeText={props.handleChange("employer")}
                                        value={props.values.employer}
                                        onBlur={props.handleBlur('employer')}
                                    />
                                    <Text style={globalStyles.errorText}>{ props.touched.employer && props.errors.employer }</Text>

                                    <FlatButton text="save" onPress={props.handleSubmit}/>
                                
                            </View>
                            </ScrollView>
                        )}
                        
                    </Formik>
                </View>
            )
        }

        else {
            <FlatButton text="next" onPress={unemployed}/>
        }
    }

    

    return (
        
        <View style={globalStyles.container}>
            <Text>
                Status:
            </Text>
            <View style={globalStyles.twoButtons}>
                <FlatButton text="student" onPress={student}/>
                <FlatButton text="employed" onPress={employed}/>
                <FlatButton text="unemployed" onPress={unemployed}/>
                
            </View>

            {status()}
        </View>
        
    )
}

const styles = StyleSheet.create({
    
})