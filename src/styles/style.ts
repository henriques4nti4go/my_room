import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop:25,
        width:'100%',
        maxWidth:330,
        alignSelf: 'center',
    },
    align: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    width: {
        width: '80%'
    },
    body: {
        marginTop: 25,
    },
    button: {
        width: 200
    },
    alignPattern:{
        alignSelf: 'center'
    },
    mb1: {
        marginBottom:10
    },
    shadowBox: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    cardPadding:{
        paddingHorizontal:10,
        paddingVertical: 10
    },
    card: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        paddingHorizontal:10,
        paddingVertical: 10,
        borderRadius:10
    }
});
export default styles;