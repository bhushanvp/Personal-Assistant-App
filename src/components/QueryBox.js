import { View, Text, StyleSheet, TouchableOpacity, TextInput, ToastAndroid } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMissedCalls, makeCall } from '../services/calling/CallingServices'
import { readLatestMessageFrom, readUnreadMessages, readUnreadMessagesFrom, sendMessage } from '../services/messaging/MessagingServices'
import { sendEmailByAddress, sendEmailByContactName } from '../services/emailing/EmailingServices'
import { getReminders, getRemindersForToday, setReminder } from '../services/reminders/RemindingServices'
import { searchContact } from '../services/contacts/ContactsServices'
import Tts from 'react-native-tts'

const QueryBox = ({ dismissKeyboard, intentRecognizer }) => {
    const dispatch = useDispatch()
    const query = useSelector((state) => state.query)
    const user = useSelector((state) => state.user)
    
    const showToast = (message) => {
        ToastAndroid.show(message, ToastAndroid.SHORT);
    }

    const sendQuery = async (query_text) => {
        const response = await intentRecognizer.getIntentAndEntities(query_text)
        const intent = response["intent"]
        const entities = response["entities"]
        showToast(`${String(intent)}`)
        console.log(intent, entities);
        switch (intent) {
            case "makeCall":
                await makeCall(entities["to_contact_name"]);
                break;
    
            case "sendMessage":
                let to_contact_name = entities["to_contact_name"];
                let body = entities["body"];
                console.log('To Contact Name:', to_contact_name);
                console.log('Body:', body);
        
                if (to_contact_name && body) {
                    await sendMessage(to_contact_name, body);
                } else {
                    Tts.speak('Please provide the contact name and message body');
                }
                break;
            
            case "readUnreadMessages":
                await readUnreadMessages();
                break;
            
            case "readUnreadMessagesFrom":
                let from_contact_name = entities["from_contact_name"];
                await readUnreadMessagesFrom(from_contact_name);
                break;
            
            case "readLatestMessageFrom":
                from_contact_name = entities["from_contact_name"];
                await readLatestMessageFrom(from_contact_name);
                break;
            
            case "sendEmailByAddress":
                let to_email = entities["to_email"];
                subject = entities["subject"];
                body = entities["body"];
                await sendEmailByAddress(to_email, subject, body, user);
                break;
            
            case "sendEmailByContactName":
                contact_name = entities["contact_name"];
                subject = entities["subject"];
                body = entities["body"];
                await sendEmailByContactName(contact_name, subject, body, user);
                break;
            
            case "setReminder":
                let reminder_type = entities["reminder_type"];
                let reminder_name = entities["reminder_name"];
                let reminder_time = entities["reminder_time"];
                await setReminder(reminder_type, reminder_name, reminder_time, user.email_address);
                break;
            
            case "getReminders":
                await getReminders(user.email_address);
                break;
            
            case "getRemindersForToday":
                await getRemindersForToday(user.email_address);
                break;
            
            case "getMissedCalls":
                await getMissedCalls();
                break;
            
            case "searchContact":
                let contact_name = entities["contact_name"];
                await searchContact(contact_name);
                break;
            
            default:
                Tts.speak(entities)
                break;
        }
    }


    return (
        <View
            style={styles.container}
        >
            <View
                style={{
                    ...styles.query,
                    width: query.queryRunning || query.micActive ? "95%" : "83%"
                }}
            >
                {/* <Text>{String(query.queryRunning)}</Text> */}
                <Text style={styles.query_title}>Enter your Query</Text>
                <TouchableOpacity
                    style={styles.query_data_container}
                    onPress={() => {
                        dispatch({ type: "SET_query", query: {...query, editingQuery: true } });
                    }}
                    disabled={query.micActive || query.queryRunning}
                >
                    {query.editingQuery ? (
                        <TextInput
                            style={styles.query_data}
                            value={query.editedQuery}
                            autoCapitalize='none'
                            inputMode='text'
                            onChangeText={(text) => {
                                dispatch({ type: "SET_query", query: {...query, editedQuery: text}});
                            }}
                            multiline={true}
                            disabled={query.queryRunning || query.micActive}
                            autoFocus={true}
                        />
                    ) : (
                        <Text style={styles.query_data}>{query.editedQuery}</Text>
                    )}
                </TouchableOpacity>
            </View>

            <View
                style={styles.send_button_container} >
                <TouchableOpacity
                    style={styles.send_button}
                    onPress={async () => {
                        if (query.editedQuery != "") {
                            dispatch({ type: "SET_query", query: {...query, queryRunning: true, micActive: false, editingQuery: false } });
                            await sendQuery(query.editedQuery)
                            if (query.queryRunning) {
                                await dismissKeyboard()
                            }
                        }
                        dispatch({ type: "SET_query", query: {...query, queryRunning: false, editingQuery: false, editedQuery: ""}});
                    }}
                    disabled={query.editedQuery == ""}
                >
                    {
                        query.queryRunning ? <></> : <Text style={styles.send_button_text} >↑</Text>
                    }
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    title_container: {
        marginTop: 20,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title_text: {
        fontSize: 22,
        color: 'black',
    },
    container: {
        paddingVertical: 10,
        alignItems: 'center',
        alignContent: 'flex-end',
        flexDirection: "row",
        alignItems: "flex-end",
        marginBottom: 10
    },
    query: {
        width: '83%',
        paddingTop: 5,
        paddingBottom: 10,
        paddingHorizontal: 10,
        marginHorizontal: 10,
        marginBottom: 20,
        borderWidth: 1,
        borderRadius: 20,
    },
    query_data_container: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: "#D3D3D3",
        borderRadius: 10,
    },
    query_title: {
        fontSize: 16,
        paddingLeft: 5,
        paddingVertical: 6,
    },
    query_data: {
        textDecorationLine: 'underline',
        fontSize: 18,
        color: 'black',
        paddingVertical: 5,
        flex: 1
    },
    query_data_mod: {
        textDecorationLine: 'underline',
        fontSize: 15,
        color: 'black',
    },
    send_button_container: {
        alignItems: "center"
    },
    send_button: {
        marginVertical: 55,
        alignItems: "center",
        backgroundColor: "skyblue",
        borderWidth: 1,
        width: 30,
        textAlign: "center",
        justifyContent: "center",
        borderRadius: 30
    },
    send_button_text: {
        fontSize: 30,
        color: "black",
    }
});

export default QueryBox