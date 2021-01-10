import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    titleText: {
        fontFamily: 'ropasans',
        fontStyle: 'italic',
        fontWeight: 'normal',
        fontSize: 36,
        lineHeight: 39,
        color: '#000000',

        display: 'flex',
        alignItems: 'center',
    },
    paragraph: {
        marginVertical: 8,
        lineHeight: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        fontSize: 18,
        borderRadius: 6,
    },
    errorText: {
        color: 'crimson',
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 6,
        textAlign: 'center',
    },
    twoButtons: {
        flex: 1,
        flexDirection: 'row',
    },
    flex: {
        display: "flex",
        margin: "auto",
    },
    application: {
        fontFamily: "patrick-hand",
    }
})