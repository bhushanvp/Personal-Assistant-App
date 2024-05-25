import { getContactsMatchingString } from "react-native-contacts";
import { requestReadContactsPermission } from "./contactsPermissions";
import Tts from "react-native-tts";


export const searchSimilarContact = async (contact_name) => {
    const hasPermission = await requestReadContactsPermission();
    if (hasPermission) {
        const contacts = await getContactsMatchingString(contact_name)
    
        for (const contact of contacts) {
            if (contact.displayName.toLowerCase() === contact_name.toLowerCase()) {
                return contact;
            }
        }
        
    } else {
        console.log('Permission denied');
    }
    return null
}

export async function searchContact(contact_name) {
    const hasPermission = await requestReadContactsPermission();
    if (hasPermission) {
        console.log(`Search ${contact_name}`)
        const contacts = await getContactsMatchingString(contact_name)
        console.log("You have ", contacts.length, " contacts matching ", contact_name);
        Tts.speak(`You have ${contacts.length} contacts matching ${contact_name}`);
        contacts.map(contact => {
            Tts.speak(`${contact.displayName}, `);
        });

        return contacts[0];
    } else {
        console.log('Permission denied');
    }
}