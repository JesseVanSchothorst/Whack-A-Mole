import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Alert, Image } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

import styles from '../common/styles';
import backgroundImage from '../assets/background.jpg';
import moleImage from '../assets/mole.png';


const WhackAMoleGame = () => {


    // Router values I am bringing to this
    const router = useRouter();
    const localParams = useLocalSearchParams();
    const { difficulty, gameDuration } = localParams;

    // Mole holes are empty
    const [moleHoles, setMolesHoles] = useState([]);
    // score is zero
    const [score, setScore] = useState(0);
    // highest score is zero
    const [highestScore, setHighestScore] = useState(0);
    // time is what the user selected before
    const [timeLeft, setTimeLeft] = useState(gameDuration);
    // 
    const [intervalId, setIntervalId] = useState(null);
    // game is not paused from start
    const [gamePaused, setGamePaused] = useState(false);

    //console.log(gameDuration)

    // Different difficulty
    const difficultySettings = {
        // Easy
        0: {
            // only 4 moles, a mole appears every second (so multiple on screen more points to get) and stay for 2 seconds
            MOLE_HOLES: 4,
            MOLE_APPEAR_INTERVAL: 1000,
            MOLE_DURATION: 2000
        },
        // Also Easy
        1: {
            MOLE_HOLES: 4,
            MOLE_APPEAR_INTERVAL: 1000,
            MOLE_DURATION: 2000
        },
        // Medium
        2: {
            MOLE_HOLES: 8,
            MOLE_APPEAR_INTERVAL: 1200,
            MOLE_DURATION: 1000
        },
        // Impossible
        3: {
            MOLE_HOLES: 12,
            MOLE_APPEAR_INTERVAL: 800,
            MOLE_DURATION: 800
        }
    };
    // These values equal whatever difficultySettings[num] equal
    const { MOLE_HOLES, MOLE_APPEAR_INTERVAL, MOLE_DURATION } = difficultySettings[difficulty];



    // When A game Over happens
    // Should make it so game cant be interact with and set new high score
    // if player got that score and then allow them to select to play again or quit
    const gameOver = () => {
        setGamePaused(true);
        // stops the moles from appearing on screen (does take a second too)
        clearInterval(intervalId);

        // sets the message for the game over alert ( I tried using use state but for some reason didnt work)
        const gameOverMessage = score > highestScore
            ? `New High Score! You've achieved a new high score of ${score}` 
            : `Your score: ${score }`  ;        

        // Maybe update in future to have a better window I wish I could make text bigger
        Alert.alert(
            'Game Over', gameOverMessage,
            [
                {
                    text: 'Continue Playing',
                    onPress: () => {
                        resetGame();
                        setGamePaused(false);
                        setHighestScore(score);
                    }
                },
                {
                    text: 'Quit',
                    onPress: () => backToStart()
                }
            ]
        );
    };

    // Resets timer back to the selected gameDuration
    const resetTimer = () => {
        setTimeLeft(gameDuration);
    };

    // resets game
    // sets the score to zero and the timer resets
    const resetGame = () => {
        setScore(0);
        resetTimer();
    };

    // Back to start button
    const backToStart = () => {
        router.push({ pathname: "/", params: {} });
    };

    // Pauses game
    const togglePause = () => {
        setGamePaused(prevPaused => !prevPaused);

        // Maybe update in future to have a better window I wish I could make text bigger
        Alert.alert(
            'Game Paused', 'The Game is now Paused',
            [
                {
                    text: 'resume',
                    onPress: () => {
                        setGamePaused(false);
                    }
                },
                {
                    text: 'Quit',
                    onPress: () => backToStart()
                }
            ]
        );





        
    };

    // sets the mole_holes to false so when it becomes active
    // its true and if true and i hit then score goes up
    useEffect(() => {
        setMolesHoles(Array(MOLE_HOLES).fill(false));
    }, [difficulty]);

    // check if game is not paused
    // if not then the timer goes down
    useEffect(() => {
        // the slider is weird and if it is not touched will give underfined value
        // this is to assure that it has the 30 seconds
        if (timeLeft === undefined) {
            setTimeLeft(30);
        }

        const id = setInterval(() => {
            // timer goes down
            if (!gamePaused) {
                setTimeLeft(prevTime => prevTime - 1);
            }

            // goes down by 1 second
        }, 1000);
        setIntervalId(id);
        return () => clearInterval(id);
    }, [gamePaused]);

    useEffect(() => {
        if (timeLeft === 0) {
            gameOver();
        }
    }, [timeLeft]);

    // Mole Logic
    // the mole being hit
    const whackMole = (index) => {

        if (moleHoles[index]) {
            // 10 points cause looks better than 1 could do the points based off of diffculty
            // or could do if a special mole appears it has a greater score
            setScore(prevScore => prevScore + 10)
                ;
            setMolesHoles(prevMoles => {

                const newMoles = [...prevMoles];
                newMoles[index] = false;

                return newMoles;
            });
        }

    };

    useEffect(() => {
        // if paused, moles should stop
        if (!gamePaused) {
            const moleIntervalId = setInterval(() => {

                // the random mole placement
                const randomIndex = Math.floor(Math.random() * MOLE_HOLES);

                setMolesHoles(prevMoles => {
                    const newMoles = [...prevMoles];
                    newMoles[randomIndex] = true;
                    return newMoles;
                });

                const moleDisappearTimeoutId = setTimeout(() => {
                    setMolesHoles(prevMoles => {
                        const newMoles = [...prevMoles];
                        newMoles[randomIndex] = false;
                        return newMoles;
                    });
                }, MOLE_APPEAR_INTERVAL);

                
            }, MOLE_DURATION);

            return () => {
                clearInterval(moleIntervalId); // Clear interval);
            };
        }
    }, [gamePaused]);




    return (
        <ImageBackground
            source={backgroundImage}
            style={styles.container}
        >
            <Text style={styles.timer}>Time Left: {timeLeft}</Text>
            <Text style={styles.score}>Score: {score}</Text>
            <Text style={styles.score}>High Score: {highestScore}</Text>

            <View style={styles.grid}>
                {moleHoles.map((mole, index) => (
                    <View
                        key={index}
                        style={[styles.hole, mole && styles.mole]}
                    >
                        <TouchableOpacity
                            onPress={() => whackMole(index)}
                            disabled={!mole || gamePaused}


                        >
                            {mole && (
                                <Image
                                    source={ moleImage }
                                    style={styles.moleImage}
                                />
                            )}
                        </TouchableOpacity>
                    </View>
                ))}
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.otherButton}
                    onPress={togglePause}
                >
                    {/* kind of useless now since there is the alert doing the same but ill keep*/ }
                    <Text style={styles.otherButtonText}>{gamePaused ? "Resume" : "Pause"}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.otherButton}
                    onPress={backToStart}
                >
                    <Text style={styles.otherButtonText}>Quit</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

export default WhackAMoleGame;
