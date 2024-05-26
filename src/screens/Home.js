import { ActivityIndicator, Image, Keyboard, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect } from 'react'
import Mic from '../components/Mic'
import QueryBox from '../components/QueryBox'
import { useDispatch, useSelector } from 'react-redux'
import { IntentRecognizer } from '../services/nlp/intentRecognition'
import AsyncStorage from '@react-native-async-storage/async-storage'

const intentRecognizer = new IntentRecognizer()

const Home = () => {
    const dispatch = useDispatch()

    const query = useSelector((state) => state.query)

    const dismissKeyboard = () => {
        Keyboard.dismiss();
        dispatch({ type: "SET_query", query: { ...query, editingQuery: false } });
    };
    
    const showToast = (message) => {
        ToastAndroid.show(message, ToastAndroid.SHORT);
    }

    useEffect(() => {
        AsyncStorage.getItem('PERSONAL_ASSISTANT_APP_USER_DATA', (err, result) => {
            if (result) {
                console.log(result);
                // dispatch({ type: "SET_userData", userData: JSON.parse(result) });
                const setUserData = async (edited_user_data) => {
                    let status = true
                    try {
            
                        if (status) {
                            const user_data = edited_user_data
                            showToast("Updated Data")
                            await AsyncStorage.setItem('PERSONAL_ASSISTANT_APP_USER_DATA', JSON.stringify(user_data));
                            dispatch({ type: "SET_user", user: user_data });
                        }
                        else {
                            // showToast(userData.data)
                            setEditedName(user.user_name)
                            setEditedEmailAddress(user.user_email_address)
                            setEditedPhoneNumber(user.user_phone_number)
                        }
                    } catch (error) {
                        showToast(error.message)
                    }
                }
                setUserData(JSON.parse(result))
            }
        });
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