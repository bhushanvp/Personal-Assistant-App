import { PermissionsAndroid, Platform } from 'react-native';

export async function requestSendMessagePermission() {
    try {
        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.SEND_SMS
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        }
        return true;
    } catch (err) {
        console.warn(err);
        return false;
    }
}

export async function requestReadMessagePermission() {
    try {
        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_SMS,
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        }
        return true;
    } catch (err) {
        console.warn(err);
        return false;
    }
}