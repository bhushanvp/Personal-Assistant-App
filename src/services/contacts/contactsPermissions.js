import { PermissionsAndroid, Platform } from "react-native";

export async function requestReadContactsPermission() {
    try {
        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
                {
                    title: "Contacts",
                    message: "This app would like to view your contacts.",
                    actions: ["Yes", "No"]
                }
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        }
        return true;
    } catch (err) {
        console.warn(err);
        return false;
    }
}
