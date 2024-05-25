import { PermissionsAndroid, Platform } from 'react-native';

export async function requestReminderPermission() {
    try {
        if (Platform.OS === 'android') {
            if (await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_CALENDAR) === PermissionsAndroid.RESULTS.GRANTED && await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_CALENDAR) === PermissionsAndroid.RESULTS.GRANTED){
                return true;
            }
            const status = await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.WRITE_CALENDAR,
                PermissionsAndroid.PERMISSIONS.READ_CALENDAR
            ]);
            if (status[PermissionsAndroid.PERMISSIONS.WRITE_CALENDAR] === PermissionsAndroid.RESULTS.GRANTED && status[PermissionsAndroid.PERMISSIONS.READ_CALENDAR] === PermissionsAndroid.RESULTS.GRANTED){
                return true;
            }
            return false;
        }
        return true;
    } catch (err) {
        console.warn(err);
        return false;
    }
}

// export async function requestSetReminderPermission() {
//     try {
//         if (Platform.OS === 'android') {
//             // const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_CALENDAR);
//             const status = await RNCalendarEvents.checkPermissions((readOnly = false));
//             if (status === 'authorized') {
//                 return true;
//             }
//             else {
//                 const granted = await RNCalendarEvents.requestPermissions((readOnly = false));
//                 return granted === 'authorized';
//             }
//             // return granted === PermissionsAndroid.RESULTS.GRANTED;
//         }
//         return true;
//     } catch (err) {
//         console.warn(err);
//         return false;
//     }
// }

export async function requestGetRemindersPermission() {
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