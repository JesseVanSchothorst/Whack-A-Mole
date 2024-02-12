import React from 'react';
import { TouchableOpacity, View, Text, ImageBackground } from 'react-native';
import { useRouter} from 'expo-router';

// For Cool Slider
import { Slider } from '@react-native-assets/slider'

// All My Styles
import styles from '../common/styles';
import backgroundImage from '../assets/background.jpg';

export default function App() {
    // use state variables for game options
    const [gameDuration, setGameDuration] = React.useState();
    const [difficulty, setDifficulty] = React.useState(0);

    // router for navigation
    const router = useRouter();


    // Next Page
    // Brings the difficulty and game durartion to next screen
    const nextPage = () => {
         router.push({ pathname: "/gameBoard", params: { difficulty, gameDuration } });
    };
    // BackToStart
    // Just goes back to start
    const backToStart = () => {
        router.push({ pathname: "/", params: { } });
    };

    // added for better display for user
    const textColorChange = () => {
        if (difficulty === 3) {

            return { color: 'red' };

        } else if (difficulty === 2) {

            return { color: 'orange' };

        } else {
            return { color: 'lightgreen' };
        }
    };

    return (
        <ImageBackground
            source={backgroundImage}
            style={styles.container}
        >

            <View style={styles.titleContainer}>
                {/* the title */}
                <Text style={[styles.title, { fontSize: 56, textShadowRadius: 10, }]}>Game Options</Text>
            </View>

            <Text style={[styles.instructions, { marginBottom: 50, marginTop: 5, }]}>
                Select the amount of time you would like to play for and the difficulty!
            </Text>

            <View style={styles.sliderContainer}>
                <Text style={styles.sliderLabel}>
                    {/* sets the top so I can change text based on value */}
                    {gameDuration === 120 ? '120 Seconds' : gameDuration === 90 ? '90 seconds' : gameDuration === 60 ? '60 seconds' : '30 seconds'}
                </Text>

                {/* slider inspired by the  '@react-native-assets/slider' */}
                <Slider
                    value={gameDuration}
                    minimumValue={30}
                    maximumValue={120}
                    step={30}
                    minimumTrackTintColor='black'
                    maximumTrackTintColor='black'
                    thumbTintColor='black'
                    trackStyle={{ height: 4, width: '80%', }}
                    thumbSize={36}
                    onValueChange={setGameDuration}
                />
            </View>

            <View style={styles.sliderContainer}>

                <Text style={[styles.sliderLabel, textColorChange()]}>
                    {difficulty === 3 ? 'Impossible' : difficulty === 2 ? 'Normal' : 'Easy'}
                </Text>
                <Slider
                    value={difficulty}
                    minimumValue={1}
                    maximumValue={3}
                    step={1}
                    minimumTrackTintColor='black'
                    maximumTrackTintColor='black'
                    thumbTintColor='black'
                    trackStyle={{ height: 4, width: '80%', }}
                    thumbSize={36}
                    onValueChange={setDifficulty}
                />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.otherButton}
                    onPress={backToStart}
                >
                    <Text style={styles.otherButtonText}>Back To Title</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.otherButton}
                    onPress={nextPage}
                >
                    <Text style={styles.otherButtonText}>Play</Text>
                </TouchableOpacity>
            </View>

        </ImageBackground>
    );
};
