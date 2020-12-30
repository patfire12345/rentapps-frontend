import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback, Modal,TextInput } from 'react-native';
import FlatButton from '../../shared/button';
import { Formik } from 'formik';
import { globalStyles } from '../../styles/global';
import * as yup from 'yup';

const reviewSchema = yup.object({
    petDes: yup.string()
        .required()
        // .test('is-num-1-5', 'Invalid Animal', (val) => {
        //     return (val == "dog");
        // }),
})

export default function PetSection({functions}) {

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
                <View style={globalStyles.container}>
                    <Formik 
                        initialValues={{ petDes: "" }}
                        validationSchema={reviewSchema}
                        onSubmit={async (values) => {
                            await functions.petType(values.petDes);
                            functions.closeFunction();
                            //functions.openFunction();
                        }}
                    >
                        {(props) => (
                            <View>
                                <TextInput 
                                    style={globalStyles.input} 
                                    placeholder="Pet Type"
                                    onChangeText={props.handleChange("petDes")}
                                    value={props.values.petDes}
                                    onBlur={props.handleBlur('petDes')}
                                />
                                <Text style={globalStyles.errorText}>{ props.touched.petDes && props.errors.petDes }</Text>
                                <FlatButton text="save" onPress={props.handleSubmit}/>
                            </View>
                        )}
                        
                    </Formik>
                </View>
            )
        }
    }

    return (
        <View style={globalStyles.container}>
            <Text>Do you have any pets?</Text>
            <View style={globalStyles.twoButtons}>
                <FlatButton text="No" onPress={noPress}/>
                <FlatButton text="Yes" onPress={yesPress}/>
            </View>

            {petText()}
        </View>
    )
}