// app/index.js

import React from 'react';
import { TouchableOpacity, View, Text, ImageBackground, } from 'react-native';
import { useRouter } from 'expo-router';

// My Styles
import styles from '../common/styles';
import backgroundImage from '../assets/background.jpg';

export default function App() {
    const router = useRouter();



    const nextPage = () => {
        router.push({ pathname: "/selection", params: { } });
    };
    return (
        <ImageBackground
            source={backgroundImage}
            style={styles.container}
        >

            {/* the title */}
            <View style={ styles.titleContainer }>
                <Text style={styles.title}>Whack</Text>
                <Text style={styles.title}>-A-</Text>
                <Text style={styles.title}>Mole</Text>
            </View>

            {/* the instructions */}
            <Text style={styles.instructions}>
                Try to get the highest score by whacking the moles. Are you Ready!
            </Text>

            {/* the button to go to next screen */}
            <TouchableOpacity
                style={styles.button}
                onPress={nextPage}
            >

                <Text style={styles.buttonText}>GO</Text>
            </TouchableOpacity>
        </ImageBackground>
    );
};
