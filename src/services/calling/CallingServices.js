import SendIntentAndroid from "react-native-send-intent";
import { requestCallLogsPermission, requestCallPermission } from "./callingPermissions";
import CallLogs from 'react-native-call-log'
import Tts from "react-native-tts";
import { searchSimilarContact } from "../contacts/ContactsServices";


export async function makeCall(contact_name) {
    const hasPermission = await requestCallPermission();
    if (hasPermission) {
        const search_result = await searchSimilarContact(contact_name)
        if (search_result.status === 'exact') {
            const contact = search_result.contact;
            Tts.speak(`Calling ${contact.displayName}...`);
            SendIntentAndroid.sendPhoneCall(contact.phoneNumbers[0].number, true);
            return true;
        }
        else {
            const contacts = search_result.contacts;
            console.log(`There are ${contacts.length} contacts with name ${contact_name}`);
            Tts.speak(`There are ${contacts.length} contacts with name ${contact_name}`);

            contacts.forEach(contact => {
                console.log(`${contact.displayName}`);
                Tts.speak(`${contact.displayName}`);
            })

            console.log(`Whom shall I call?`);
            Tts.speak(`Whom shall I call?`);
            return false;
        }
    } else {
        console.log('Permission denied');
        Tts.speak('Permission denied');
        return false;
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
        const callLogs = await CallLogs.load(5, filter = {
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