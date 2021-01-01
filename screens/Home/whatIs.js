import React from 'react'
import {Text, View, StyleSheet} from 'react-native'
import FlatButton from '../../shared/button'

export default function whatIs({navigation}) {
    return (
        <View>
            <FlatButton text="A free rental management tool"/>
            <Text style={styles.ropasanstext}>
                1. Create a short listing on our platform
            </Text>
            <Text style={styles.ropasanstext}>
                2. Place the generated QR code in any other listing on any platform
            </Text>
            <Text style={styles.ropasanstext}>
                3. Sit back and manage all applications
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    ropasanstext: {
        fontFamily: "ropasans",
        fontStyle: "italic"
    }
});
