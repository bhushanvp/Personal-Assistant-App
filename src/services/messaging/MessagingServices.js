import SendIntentAndroid from "react-native-send-intent";
import SmsAndroid from 'react-native-get-sms-android';
import { requestReadMessagePermission, requestSendMessagePermission } from "./messagingPermissions";
import { searchSimilarContact } from "../contacts/ContactsServices";
import Tts from "react-native-tts";
import { getContactsByPhoneNumber } from "react-native-contacts";

export const sendMessage = async (to_contact_name, body) => {
    const hasPermission = await requestSendMessagePermission();
    if (hasPermission) {
        const search_result = await searchSimilarContact(to_contact_name)
        if (search_result.status === 'exact') {
            const contact = search_result.contact;
            const number = contact.phoneNumbers[0].number
            console.log(`Sending message to ${to_contact_name}...`)
            SendIntentAndroid.sendSms(number, body);
            return true;
        }
        else {
            const contacts = search_result.contacts;
            
            if(contacts.length() === 1) {
                const contact = contacts[0]
                Tts.speak(`Calling ${contact.displayName}...`);
                SendIntentAndroid.sendPhoneCall(contact.phoneNumbers[0].number, true);
                return true;
            }

            console.log(`There are ${contacts.length} contacts with name ${to_contact_name}`);
            Tts.speak(`There are ${contacts.length} contacts with name ${to_contact_name}`);

            contacts.forEach(contact => {
                console.log(`${contact.displayName}`);
                Tts.speak(`${contact.displayName}`);
            })

            console.log(`Whom shall I message?`);
            Tts.speak(`Whom shall I message?`);
            return false;
        }
    } else {
        Tts.speak('Permission denied');
        console.log('Permission denied');
        return false;
    }
}

export const readUnreadMessages = async () => {
    console.log("Reading all unread messages...");
    const hasPermission = await requestReadMessagePermission();
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000 + 5 * 60 * 60 * 1000 + 30 * 60 * 1000);
    const current = new Date(Date.now() + 5 * 60 * 60 * 1000 + 30 * 60 * 1000);
    const unread_filter_config = {
        box: 'inbox',
        minDate: oneWeekAgo.getTime(),
        maxDate: current.getTime(),
        read: 0,
    };
    if (hasPermission) {
        await SmsAndroid.list(
            JSON.stringify(unread_filter_config),
            (fail) => {
                Tts.speak("Failed to get messages");
                console.error("Failed to get messages", fail);
            },
            (count, smsList) => {
                smsList = JSON.parse(smsList);
                console.log(`Got ${count} messages`);
                smsList.forEach(async sms => {
                    if (!String(sms["address"]).includes("-") && String(sms["address"]).includes("+")) {
                        const searchedContact = await getContactsByPhoneNumber(sms["address"])
                        const name = searchedContact[0].displayName
                        console.log(`${name} sent ${sms["body"]}`);
                        Tts.speak(`${name} sent ${sms["body"]}`);
                    }
                });
            }
        )
        return true;
    } else {
        Tts.speak('Permission denied');
        console.log('Permission denied');
        return false;
    }
}

export const readUnreadMessagesFrom = async (from_contact_name) => {

    const search_result = await searchSimilarContact(from_contact_name)

    if (search_result.status !== 'exact') {
        const contacts = search_result.contacts;
        console.log(`There are ${contacts.length} contacts with name ${from_contact_name}`);
        Tts.speak(`There are ${contacts.length} contacts with name ${from_contact_name}`);

        contacts.forEach(contact => {
            console.log(`${contact.displayName}`);
            Tts.speak(`${contact.displayName}`);
        })

        console.log(`Whose messages should I read?`);
        Tts.speak(`Whose messages should I read?`);
        return false;
    }

    const required_contact = search_result.contact
    const from_phone_number = required_contact.phoneNumbers[0].number.replaceAll(" ", "")

    const hasPermission = await requestReadMessagePermission();
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000 + 5 * 60 * 60 * 1000 + 30 * 60 * 1000);
    const current = new Date(Date.now() + 5 * 60 * 60 * 1000 + 30 * 60 * 1000);
    const unread_from_filter_config = {
        box: 'inbox',
        minDate: oneWeekAgo.getTime(),
        maxDate: current.getTime(),
        address: from_phone_number,
    };
    
    if (hasPermission) {
        await SmsAndroid.list(
            JSON.stringify(unread_from_filter_config),
            (fail) => {
                Tts.speak("Failed to get messages");
                console.error("Failed to get messages", fail);
            },
            async (count, smsList) => {
                smsList = JSON.parse(smsList);

                const messages = await smsList.filter(sms => !String(sms["address"]).includes("-") && String(sms["address"]).includes("+") && sms["read"] === 0)

                console.log(`Got ${messages.length} new messages from ${from_contact_name}`);
                Tts.speak(`Got ${messages.length} new messages from ${from_contact_name}`);
                
                messages.forEach(sms => {
                    let time = new Date(Number(sms["date_sent"]));
                    const formattedTime = time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
                    const formattedDate = time.toLocaleString('en-US', { month: 'long', day: 'numeric' });
                    Tts.speak(`Sent ${sms["body"]} at ${formattedTime} on ${formattedDate}`);
                });
            }
        )
        return true;
    } else {
        Tts.speak('Permission denied');
        console.log('Permission denied');
        return false;
    }
}

export const readLatestMessageFrom = async (from_contact_name) => {
    const hasPermission = await requestReadMessagePermission();
    const search_result = await searchSimilarContact(from_contact_name)
    if (search_result.status !== 'exact') {
        const contacts = search_result.contacts;
        console.log(`There are ${contacts.length} contacts with name ${from_contact_name}`);
        Tts.speak(`There are ${contacts.length} contacts with name ${from_contact_name}`);

        contacts.forEach(contact => {
            console.log(`${contact.displayName}`);
            Tts.speak(`${contact.displayName}`);
        })

        console.log(`Whose messages should I read?`);
        Tts.speak(`Whose messages should I read?`);
        return false;
    }
    const required_contact = search_result.contact
    const phone_number = required_contact.phoneNumbers[0].number
    const unread_from_filter_config = {
        box: 'inbox',
        address: phone_number,
    };
    if (hasPermission) {
        await SmsAndroid.list(
            JSON.stringify(unread_from_filter_config),
            (fail) => {
                Tts.speak("Failed to get messages");
                console.error("Failed to get messages", fail);
            },
            (count, smsList) => {
                smsList = JSON.parse(smsList);
                sms = smsList[0]
                console.log(smsList);
                let time = new Date(Number(sms["date_sent"]));
                const formattedTime = time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
                const formattedDate = time.toLocaleString('en-US', { month: 'long', day: 'numeric' });
                Tts.speak(`${from_contact_name} had sent ${sms["body"]} at ${formattedTime} on ${formattedDate}`);
            }
        )
        return true;
    } else {
        Tts.speak('Permission denied');
        console.log('Permission denied');
        return false;
    }
}
