import { ActivityIndicator, Image, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect } from 'react'
import Mic from '../components/Mic'
import QueryBox from '../components/QueryBox'
import { useDispatch, useSelector } from 'react-redux'
import { IntentRecognizer } from '../services/nlp/intentRecognition'

const intentRecognizer = new IntentRecognizer()

const Home = () => {
    const dispatch = useDispatch()

    const query = useSelector((state) => state.query)

    const dismissKeyboard = () => {
        Keyboard.dismiss();
        dispatch({ type: "SET_query", query: {...query, editingQuery: false} });
    };

    useEffect(() => {
        console.log("Here");
    }, [])
    

    return (
        <TouchableWithoutFeedback onPress={() => dismissKeyboard()}>
            <View
                style={styles.container}
            >
                {
                    query.queryRunning || query.micActive ?
                    <View
                        style={{
                            marginBottom: 30,
                        }}
                    >
                        <ActivityIndicator size={"large"} color={"black"} />
                    </View> :
                    <></>
                }

                <Mic />

                <QueryBox intentRecognizer={intentRecognizer} />
            </View>
        </TouchableWithoutFeedback>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-end"
    }
});