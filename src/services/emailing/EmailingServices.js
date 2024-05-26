import { Linking } from "react-native";
import { requestSendEmailPermission } from "./emailingPermissions";
import { searchSimilarContact } from "../contacts/ContactsServices";
import Tts from "react-native-tts";

export const sendEmailByAddress = async (to_email, subject, body, user) => {
    const hasPermission = await requestSendEmailPermission(user);
    if (hasPermission) {
        await Linking.openURL(`mailto:${to_email}?subject=${subject}&body=${body}`);
    } else {
        console.log('Permission denied');
    }
}

export const sendEmailByContactName = async (contact_name, subject, body, user) => {
    const hasPermission = await requestSendEmailPermission(user);
    if (hasPermission) {
        const search_result = await searchSimilarContact(contact_name)
        if (search_result.status === 'exact') {
            if (subject!=="" && body!=="") {
                const required_contact = search_result.contact;
                const email = required_contact.emailAddresses[0].email
                console.log(`Sending email to ${email}...`)
                await Linking.openURL(`mailto:${email}?subject=${subject}&body=${body}`);
                return true;
            }
            else {
                console.log("Please provide a subject and body for the email");
                Tts.speak("Please provide a subject and body for the email");
                return false;
            }
        }
        else {
            const contacts = search_result.contacts;
            console.log(`There are ${contacts.length} contacts with name ${contact_name}`);
            Tts.speak(`There are ${contacts.length} contacts with name ${contact_name}`);

            contacts.forEach(contact => {
                console.log(`${contact.displayName}`);
                Tts.speak(`${contact.displayName}`);
            })

            console.log(`Whom shall I send the email to?`);
            Tts.speak(`Whom shall I send the email to?`);
            return false;
        }
    } else {
        console.log('Permission denied');
    }
}

export const readUnreadEmails = async () => {
    console.log("Reading all unread emails...");
}

export const readUnreadEmailsFrom = async (from_email) => {
    console.log(`Reading all unread emails from ${from_email}...`);
}

export const readLatestEmailFrom = async (from_email) => {
    console.log(`Reading the latest email from ${from_email}...`);
}