import { Image, RefreshControl, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Settings = () => {
    const dispatch = useDispatch()

    const user = useSelector((state) => state.user)

    const [refreshing, setRefreshing] = useState(false)

    const [editingName, setEditingName] = useState(false);
    const [editedName, setEditedName] = useState(user.name);
  
    const [editingPhoneNumber, setEditingPhoneNumber] = useState(false);
    const [editedPhoneNumber, setEditedPhoneNumber] = useState(user.phone_number);
  
    const [editingEmailAddress, setEditingEmailAddress] = useState(false);
    const [editedEmailAddress, setEditedEmailAddress] = useState(user.email_address);

    const [editingGeminiApiKey, setEditingGeminiApiKey] = useState(false);
    const [editedGeminiApiKey, setEditedGeminiApiKey] = useState(user.gemini_api_key);

    const saveData = () => {
        const edited_user_data = { ...user, user_email_address: editedEmailAddress, user_name: editedName, user_phone_number: editedPhoneNumber }
    
        setUserData(edited_user_data)
      }
    
      const setUserData = async (edited_user_data) => {
        let status = true
        try {

          if (status) {
            const user_data = edited_user_data
            showToast("Updated Data")
            await AsyncStorage.setItem('user_data', JSON.stringify(user_data));
            dispatch({ type: "SET_user", user: user_data });
          }
          else {
            showToast(userData.data)
            setEditedName(user.user_name)
            setEditedEmailAddress(user.user_email_address)
            setEditedPhoneNumber(user.user_phone_number)
          }
        } catch (error) {
          showToast(error.message)
        }
      }
    
      const showToast = (message) => {
        ToastAndroid.show(message, ToastAndroid.SHORT);
      }

    return (
        <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    // onRefresh={() => getuserData()}
                />
            }
        >
            <View style={styles.title_container}>
                <Text style={styles.title_text}>Edit Your Profile</Text>
            </View>

            <View style={styles.container}>
                <View style={styles.profile_category}>
                    <Text style={styles.profile_category_title}>Name</Text>
                    <TouchableOpacity
                        style={styles.profile_category_data_container}
                        onPress={() => {
                            setEditingName(true)
                            setEditingPhoneNumber(false)
                            setEditingEmailAddress(false)
                            setEditingGeminiApiKey(false)
                        }}
                    >
                        {editingName ? (
                            <TextInput
                                style={styles.profile_category_data}
                                value={editedName}
                                autoCapitalize='none'
                                inputMode='text'
                                onChangeText={(text) => setEditedName(text)}
                                autoFocus={true}
                            />
                        ) : (
                            <Text style={styles.profile_category_data}>{editedName}</Text>
                        )}
                        <Image source={require('../icons/pencil-outline.png')} style={styles.edit_icon} />
                    </TouchableOpacity>
                </View>

                <View style={styles.profile_category}>
                    <Text style={styles.profile_category_title}>Phone Number</Text>
                    <TouchableOpacity
                        style={styles.profile_category_data_container}
                        onPress={() => {
                            setEditingName(false)
                            setEditingPhoneNumber(true)
                            setEditingEmailAddress(false)
                            setEditingGeminiApiKey(false)
                        }}
                    >
                        {editingPhoneNumber ? (
                            <TextInput
                                style={styles.profile_category_data}
                                value={editedPhoneNumber}
                                inputMode='tel'
                                autoCapitalize='none'
                                onChangeText={(text) => setEditedPhoneNumber(text)}
                                autoFocus={true}
                            />
                        ) : (
                            <Text style={styles.profile_category_data}>{editedPhoneNumber}</Text>
                        )}
                        <Image source={require('../icons/pencil-outline.png')} style={styles.edit_icon} />
                    </TouchableOpacity>
                </View>

                <View style={styles.profile_category}>
                    <Text style={styles.profile_category_title}>Email Address</Text>
                    <TouchableOpacity
                        style={styles.profile_category_data_container}
                        onPress={() => {
                            setEditingName(false)
                            setEditingPhoneNumber(false)
                            setEditingEmailAddress(true)
                            setEditingGeminiApiKey(false)
                        }}
                    >
                        {editingEmailAddress ? (
                            <TextInput
                                style={styles.profile_category_data}
                                value={editedEmailAddress}
                                inputMode='email'
                                autoCapitalize='none'
                                onChangeText={(text) => setEditedEmailAddress(text)}
                                autoFocus={true}
                            />
                        ) : (
                            <Text style={styles.profile_category_data}>{editedEmailAddress}</Text>
                        )}
                        <Image source={require('../icons/pencil-outline.png')} style={styles.edit_icon} />
                    </TouchableOpacity>
                </View>

                <View style={styles.profile_category}>
                    <Text style={styles.profile_category_title}>Gemini API Key</Text>
                    <TouchableOpacity
                        style={styles.profile_category_data_container}
                        onPress={() => {
                            setEditingName(false)
                            setEditingPhoneNumber(false)
                            setEditingEmailAddress(false)
                            setEditingGeminiApiKey(true)
                        }}
                    >
                        {editingGeminiApiKey ? (
                            <TextInput
                                style={styles.profile_category_data}
                                value={editedGeminiApiKey}
                                autoCapitalize='none'
                                onChangeText={(text) => setEditedGeminiApiKey(text)}
                                autoFocus={true}
                            />
                        ) : (
                            <Text style={styles.profile_category_data}>{editedGeminiApiKey}</Text>
                        )}
                        <Image source={require('../icons/pencil-outline.png')} style={styles.edit_icon} />
                    </TouchableOpacity>
                </View>


            </View>
            <View style={styles.save_button_container} >
                <TouchableOpacity
                    style={styles.save_button}
                    onPress={() => saveData()}
                >
                    <Text style={styles.save_button_text} >Save</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default Settings

const styles = StyleSheet.create({
    title_container: {
      marginTop: 20,
      marginBottom: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title_text: {
      fontSize: 20,
      color: 'black',
    },
    container: {
      flex: 1,
      paddingVertical: 10,
      alignItems: 'center',
    },
    profile_category: {
      width: '90%',
      paddingTop: 5,
      paddingBottom: 10,
      paddingHorizontal: 10,
      marginBottom: 20,
      borderWidth: 1,
      borderRadius: 20,
    },
    profile_category_data_container: {
      paddingHorizontal: 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: "#D3D3D3",
      borderRadius: 10
    },
    profile_category_title: {
      fontSize: 13,
      paddingLeft: 5,
      paddingBottom: 0,
    },
    profile_category_data: {
      textDecorationLine: 'underline',
      fontSize: 18,
      color: 'black',
      paddingVertical: 5,
    },
    profile_category_data_mod: {
      textDecorationLine: 'underline',
      fontSize: 15,
      color: 'black',
    },
    edit_icon: {
      height: 25,
      width: 25,
    },
    save_button_container: {
      alignItems: "center"
    },
    save_button: {
      margin: 20,
      padding: 10,
      alignItems: "center",
      width: "30%",
      backgroundColor: "skyblue",
      borderWidth: 1,
      borderRadius: 25
    },
    save_button_text: {
      fontSize: 25,
      color: "black"
    }
  });