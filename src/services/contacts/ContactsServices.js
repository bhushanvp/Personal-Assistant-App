import { getContactsMatchingString } from "react-native-contacts";
import { requestReadContactsPermission } from "./contactsPermissions";
import Tts from "react-native-tts";


export const searchSimilarContact = async (contact_name) => {
    const hasPermission = await requestReadContactsPermission();
    if (hasPermission) {
        const contacts = await getContactsMatchingString(contact_name)
        
        let result = null;
        for (const contact of contacts) {
            if (contact.displayName.toLowerCase() === contact_name.toLowerCase()) {
                result = {
                    status: 'exact',
                    contact: contact
                }
                return result;
            }
        }
        
        result = {
            status: 'similar',
            contacts: contacts
        }
        
        return result;
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
    } else {
        console.log('Permission denied');
    }
}