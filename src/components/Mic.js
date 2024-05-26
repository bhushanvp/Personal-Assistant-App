import React, { useEffect, useState } from 'react';
import { Image, PermissionsAndroid, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Voice from '@react-native-voice/voice';
import { requestReadContactsPermission } from '../services/contacts/contactsPermissions';

function Mic() {
    const dispatch = useDispatch();

    const [micPermission, setMicPermission] = useState(false);

    const query = useSelector((state) => state.query);


    const getMicrophonePermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                {
                    title: 'Microphone Permission',
                    message: 'This app needs access to your microphone',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                setMicPermission(true);
                console.log('You can use the microphone');
                return true;
            } else {
                console.log('Microphone permission denied');
                return false;
            }
        } catch (err) {
            console.warn(err);
            return false;
        }
    };

    const handleMicStop = async () => {
        try {
            await Voice.stop();
            Voice.removeAllListeners();
        } catch (error) {
            console.log('Error stopping voice recognition', error);
        }
    };

    const handleMicStart = async () => {
        console.log('Starting voice recognition');
        try {
            dispatch({ type: 'SET_query', query: { ...query, micActive: true, editingQuery: false } });
            await Voice.start('en-US');
        } catch (error) {
            console.log('Error starting voice recognition', error);
        }
    };

    useEffect(() => {
        requestReadContactsPermission()
        .then((permission) => {
            console.log('Contacts permission', permission);
        });
        
        getMicrophonePermission()
        .then((permission) => {
            console.log('Mic permission', permission);
        });
        
        Voice.onSpeechStart = () => console.log('Speech start detected');
        Voice.onSpeechEnd = handleMicStop;
        Voice.onSpeechResults = onSpeechResults;
        Voice.onSpeechError = onSpeechError;

        return () => {
            Voice.destroy().then(Voice.removeAllListeners);
        };
    }, []);

    const onSpeechError = (e) => {
        dispatch({ type: 'SET_query', query: { ...query, micActive: false, editingQuery: false } });
        Voice.destroy().then(Voice.removeAllListeners);
        console.log('Speech error', e);
    };

    const onSpeechResults = (e) => {
        console.log('Speech results', e);
        dispatch({ type: 'SET_query', query: { ...query, editedQuery: e.value[0] } });
    };

    return (
        <TouchableOpacity
            style={{
                ...styles.mic_container,
                backgroundColor: query.micActive ? 'red' : '#D3D3D3',
                display: micPermission ? 'flex' : 'none',
            }}
            onPress={() => {
                query.micActive ? handleMicStop() : handleMicStart();
            }}
            disabled={query.queryRunning}
        >
            <View
                style={{
                    height: 100,
                    width: 100,
                    alignContent: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {query.micActive ? (
                    <Image source={require('../icons/active-mic.png')} style={styles.mic_icon} />
                ) : (
                    <Image source={require('../icons/mic.png')} style={styles.mic_icon} />
                )}
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    mic_container: {
        backgroundColor: '#D3D3D3',
        width: 100,
        height: 100,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        margin: 20,
    },
    mic_icon: {
        height: 50,
        width: 50,
    },
});

export default Mic;
