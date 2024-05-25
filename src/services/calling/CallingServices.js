import SendIntentAndroid from "react-native-send-intent";
import { requestCallLogsPermission, requestCallPermission } from "./callingPermissions";
import CallLogs from 'react-native-call-log'
import Tts from "react-native-tts";
import { searchSimilarContact } from "../contacts/ContactsServices";


export async function makeCall(contact_name) {
    const hasPermission = await requestCallPermission();
    if (hasPermission) {
        const required_contact = await searchSimilarContact(contact_name)
        if (required_contact === null) {
            console.log(`No contact with name ${to_contact_name} was found`);
            Tts.speak(`No contact with name ${to_contact_name} was found`);
            return
        }
        SendIntentAndroid.sendPhoneCall(required_contact.phoneNumbers[0].number, true);
    } else {
        console.log('Permission denied');
    }
}

function getTime(dateTimeStr) {
    const dateTimeParts = dateTimeStr.split(' '); // Split date and time
    const timeParts = dateTimeParts[dateTimeParts.length - 1].split(':'); // Split time
    const hours = parseInt(timeParts[0]);
    const minutes = parseInt(timeParts[1]);
    const ampm = hours >= 12 ? 'pm' : 'am';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
}

export async function getMissedCalls() {
    const hasPermission = await requestCallLogsPermission();
    if (hasPermission) {
        const start = new Date(Date.now() - 6 * 60 * 60 * 1000);
        const end = new Date(Date.now());
        const callLogs = await CallLogs.load(5, filter={
            minTimestamp: start.getTime(),
            maxTimestamp: end.getTime(),
            type: 'MISSED'
        })
        
        const missedCalls = callLogs.filter(call => call.type === 'MISSED');
        
        console.log(`You have ${missedCalls.length} missed calls`);
        Tts.speak(`You have ${missedCalls.length} missed calls`);
        missedCalls.forEach(call => {
            console.log(`${call.name} tried calling you at ${getTime(call.dateTime)}`);
            Tts.speak(`${call.name} tried calling you at ${getTime(call.dateTime)}`);
        });
    } else {
        console.log('Permission denied');
        Tts.speak('Permission denied');
    }
}