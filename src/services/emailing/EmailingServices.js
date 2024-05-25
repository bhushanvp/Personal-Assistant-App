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
        const required_contact = await searchSimilarContact(contact_name)
        if (required_contact === null) {
            Tts.speak(`No contact with name ${contact_name} was found`);
            console.log(`No contact with name ${to_contact_name} was found`);
            return
        }
        const email = required_contact.emailAddresses[0].email
        console.log(`Sending email to ${email}...`)
        await Linking.openURL(`mailto:${email}?subject=${subject}&body=${body}`);
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