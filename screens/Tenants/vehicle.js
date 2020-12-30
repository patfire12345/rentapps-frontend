import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback, Modal,TextInput } from 'react-native';
import FlatButton from '../../shared/button';
import { Formik } from 'formik';
import { globalStyles } from '../../styles/global';
import * as yup from 'yup';
import { ScrollView } from 'react-native-gesture-handler';

const reviewSchema = yup.object({
    petDes: yup.string()
        .required()
        .test('is-num-1-5', 'Invalid Animal', (val) => {
            return (val == "dog");
        }),
})

export default function VehicleSection({functions}) {

    const [petName,setPetName] = useState(false);

    const hasPetName = () => {
        setPetName(true);
    }

    const hasNoPetName = () => {
        setPetName(false);
    }

    function yesPress() {
        hasPetName();
    }

    function noPress() {
        hasNoPetName();
        functions.petType("N/A");
        functions.closeFunction();
        //functions.openFunction();
    }

    function petText() {
        if (petName) {
            return (
                <ScrollView>
                <View style={globalStyles.container}>
                    <Formik 
                        initialValues={{ model: "", make: "", year: "",  license: "",}}
                        //validationSchema={reviewSchema}
                        onSubmit={async (values) => {
                            await functions.petType(values);
                            functions.closeFunction();
                            //functions.openFunction();
                        }}
                    >
                        {(props) => (
                            <View>
                                <TextInput 
                                    style={globalStyles.input} 
                                    placeholder="Vehicle Model"
                                    onChangeText={props.handleChange("model")}
                                    value={props.values.model}
                                    onBlur={props.handleBlur('model')}
                                />
                                <Text style={globalStyles.errorText}>{ props.touched.model && props.errors.model }</Text>
                                <TextInput 
                                    style={globalStyles.input} 
                                    placeholder="Vehicle Make"
                                    onChangeText={props.handleChange("make")}
                                    value={props.values.make}
                                    onBlur={props.handleBlur('make')}
                                />
                                <Text style={globalStyles.errorText}>{ props.touched.make && props.errors.make }</Text>
                                <TextInput 
                                    style={globalStyles.input} 
                                    placeholder="Vehicle Year"
                                    onChangeText={props.handleChange("year")}
                                    value={props.values.year}
                                    keyboardType='numeric'
                                    onBlur={props.handleBlur('year')}
                                />
                                <Text style={globalStyles.errorText}>{ props.touched.year && props.errors.year }</Text>
                                <TextInput 
                                    style={globalStyles.input} 
                                    placeholder="License Number"
                                    onChangeText={props.handleChange("license")}
                                    value={props.values.license}
                                    onBlur={props.handleBlur('license')}
                                />
                                <Text style={globalStyles.errorText}>{ props.touched.license && props.errors.license }</Text>
                                <FlatButton text="save" onPress={props.handleSubmit}/>
                            </View>
                        )}
                        
                    </Formik>
                </View>
                </ScrollView>
            )
        }
    }

    return (
        <View style={globalStyles.container}>
            <Text>Do you have a vehicle?</Text>
            <View style={globalStyles.twoButtons}>
                <FlatButton text="No" onPress={noPress}/>
                <FlatButton text="Yes" onPress={yesPress}/>
            </View>

            {petText()}
        </View>
    )
}