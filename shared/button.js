import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native'; 
// import {useFonts, Roboto_400Regular} from "@expo-google-fonts/roboto";


export default function FlatButton({ text, onPress }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.button}>
                <Text style={styles.buttonText}> {text} </Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 8,
        paddingVertical: 14,
        paddingHorizontal: 10,
        backgroundColor: '#000000',
    },
    buttonText: {
        // color: 'white',
        // fontWeight: 'bold',
        // textTransform: 'uppercase',
        // fontSize: 16,
        // textAlign: 'center',

        // font-family: Patrick Hand SC,
        // font-style: normal,
        // font-weight: normal,
        // font-size: 24px,
        // line-height: 32px,
        // display: flex,
        // align-items: center,

        color: "white",

        // fontFamily: "Patrick Hand SC",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: 24,
        lineHeight: 32,
        display: 'flex',
        alignItems: 'center',
    }
})