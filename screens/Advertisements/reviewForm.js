import React from 'react';
import { StyleSheet, Button, TextInput, View, Text, FlatList } from 'react-native';
import { globalStyles } from '../../styles/global';
import { Formik } from 'formik';
import FlatButton from '../../shared/button';
import * as yup from 'yup';

const reviewSchema = yup.object({
    title: yup.string()
        .required()
        .min(4),

    body: yup.string()
        .required()
        .min(8),

    // rating: yup.string()
    //     .required()
    //     .test('is-num-1-5', 'Rating must be a number 1 - 5', (val) => {
    //         return parseInt(val) < 6 && parseInt(val) > 0;
    //     }),

    // extraEmails: yup.string()
})

export default function ReviewForm({addReview}) {

  return (
    
    <View style={globalStyles.container}>
      <Formik
        initialValues={{ title: '', body: '' }}
        validationSchema={reviewSchema}
        onSubmit={(values,action) => {
            action.resetForm();
            addReview(values);
        }}
      >
        {props => (
            <View>
            <TextInput
              style={globalStyles.input}
              placeholder='Title'
              onChangeText={props.handleChange('title')}
              value={props.values.title}
              onBlur={props.handleBlur('title')}
            />
            <Text style={globalStyles.errorText}>{ props.touched.title && props.errors.title }</Text>
            
            

            <TextInput
              style={globalStyles.input}
              multiline minHeight={60}
              placeholder='Description'
              onChangeText={props.handleChange('body')}
              value={props.values.body}
              onBlur={props.handleBlur('body')}
              multiline={true}
            />

            <Text style={globalStyles.errorText}>{ props.touched.body && props.errors.body }</Text>

            {/* <TextInput 
              style={globalStyles.input}
              placeholder='Rating (1 - 5)'
              onChangeText={props.handleChange('rating')}
              value={props.values.rating}
              keyboardType='numeric'
              onBlur={props.handleBlur('rating')}
            />

            <Text style={globalStyles.errorText}>{ props.touched.rating && props.errors.rating }</Text>

            <TextInput 
              style={globalStyles.input}
              placeholder='Extra Emails'
              onChangeText={props.handleChange('extraEmails')}
              value={props.values.extraEmails}
            /> */}
            
            <FlatButton text='post' onPress={props.handleSubmit} /> 
            </View>
        )}
      </Formik>
    </View>
    
  );
}


const styles = StyleSheet.create({
  flatlist: {
    flex: 1,
  }
})