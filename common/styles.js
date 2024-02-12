// common/styles.js

import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2ecc71',
    },
    selectionContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleContainer: {
        alignItems: 'center',
        transform: [{ rotate: '5deg' }],
        marginBottom:20,

    },
    title: {
        // Found on line so the text pops from my background
        textShadowColor: 'black',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 80, 
        fontSize: 105,
        fontWeight: 'bold',
        color: '#FFA500',
        
    },
    instructions: {
        textShadowColor: 'black',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 20, 
        fontSize: 28,
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 20,
        padding: 20,
        color: 'black',
    },
    button: {
        backgroundColor: 'blue',
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderRadius: 10,
        width: '60%',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 64,
        fontWeight: 'bold',
    },
        sliderContainer: {
            width: '80%',
            marginBottom: 20,
        },
    sliderLabel: {
            textAlign: 'center',
            fontSize: 40,
            marginBottom: 20,
            fontWeight: 'bold',
            textShadowColor: 'black',
            textShadowOffset: { width: -1, height: 1 },
            textShadowRadius: 10, 
        },
        slider: {
            width: '100%',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between', // Align buttons with equal space between them
    },
    otherButton: {
        marginTop: 50,
        marginHorizontal: 10,
        backgroundColor: 'blue',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    otherButtonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },




    timer: {
        fontWeight: 'bold',
        fontSize: 40,
        marginBottom: 10,
    },
    score: {
        fontSize: 25,
        marginBottom: 10,
    },
    grid: {
        margin: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    hole: {
        borderRadius: 50, 
        borderColor: '#3A1F04',
        borderWidth: 5,
        width: 100,
        height: 90,
        backgroundColor: '#362312',
        margin: 10,
      
    },
    mole: {
        backgroundColor: '#80461B',
  
    },
    moleImage: {
        width: 100,
        height: 100,
  
    },

    });

    export default styles;


