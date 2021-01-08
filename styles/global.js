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

        // position: absolute;
        // left: 34.44%;
        // right: 28.89%;
        // top: 8.12%;
        // bottom: 85.78%;

        // font-family: Ropa Sans;
        // font-style: italic;
        // font-weight: normal;
        // font-size: 36px;
        // line-height: 39px;
        // /* identical to box height */

        // display: flex;
        // align-items: center;

        // color: #000000;
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
    }
})