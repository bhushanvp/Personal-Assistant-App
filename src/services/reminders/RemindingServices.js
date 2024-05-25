import { requestReminderPermission } from "./remindingPermissions";
import RNCalendarEvents from "react-native-calendar-events";
import Tts from "react-native-tts";

const getRequiredCalender = async (email) => {
    const calendars = await RNCalendarEvents.findCalendars();
    const requiredCalendar = calendars.find(calendar => calendar.title === email && calendar.source === email);
    return requiredCalendar;
}

const convertToISO = async (customDateStr, type) => {
    const [time, dayMonthYear] = await customDateStr.split('-');
    const [hours, minutes] = await time.split(':');
    const [day, month, year] = await dayMonthYear.split(':');
    
    const localStartDate = new Date(year, month - 1, day, hours, minutes);

    if (type!=='alarm') {
        const adjustedStartDate = localStartDate.toISOString();
        return adjustedStartDate;
    }

    const adjustedStartDate = new Date(localStartDate.getTime() + 30 * 60 * 1000);

    return adjustedStartDate.toISOString();
};

export const setReminder = async (reminder_type, reminder_name, reminder_time, email) => {
    const hasPermission = await requestReminderPermission();
    if (hasPermission) {
        const calendar = await getRequiredCalender(email)
        const time = await convertToISO(reminder_time, reminder_type)
        const details = {
            calendarId: calendar.id,
            startDate: time,
            endDate: time,
            title: reminder_name,
            alarms: [
                {
                    date: time
                }
            ]
        };
        try {
            const event_id = await RNCalendarEvents.saveEvent(reminder_name, details);
            Tts.speak(`Reminder for ${reminder_name} at ${new Date(time[0]).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true, weekday: 'long', day: 'numeric', month: 'long' })} has been set`);
        } catch (error) {
            console.log("Error saving event:", error);
            Tts.speak("Error setting reminder");
        }
    }
    else {
        Tts.speak("Permission denied");
        console.log('Permission denied');
    }
}

export const getRemindersForToday = async (email) => {
    const hasPermission = await requestReminderPermission();
    if (hasPermission) {
        const calendar = await getRequiredCalender(email)
        try {
            const startDate = new Date().toISOString();
            const endDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString();
            const events = await RNCalendarEvents.fetchAllEvents(startDate, endDate, [calendar.id]);
            Tts.speak(`You have ${events.length} reminders today`);
            events.map(event => {
                Tts.speak(`${event.title} at ${new Date(event.startDate).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`);
            });
        } catch (error) {
            console.log("Error fetching events:", error);
            Tts.speak("Error fetching reminders");
        }
    }
    else {
        console.log('Permission denied');
        Tts.speak("Permission denied");
    }
}

export const getReminders = async (email) => {
    const hasPermission = await requestReminderPermission();
    if (hasPermission) {
        const calendar = await getRequiredCalender(email)
        try {
            const startDate = new Date().toISOString();
            const endDate = new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000).toISOString();
            const events = await RNCalendarEvents.fetchAllEvents(startDate, endDate, [calendar.id]);
            Tts.speak(`You have ${events.length} reminders in the next 2 days`);
            events.map(event => {
                Tts.speak(`${event.title} on ${new Date(event.startDate).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true, weekday: 'long', day: 'numeric', month: 'long' })}`);
            });
        } catch (error) {
            console.log("Error fetching events:", error);
            Tts.speak("Error fetching reminders");
        }
    }
    else {
        console.log('Permission denied');
        Tts.speak("Permission denied");
    }
}


// import PushNotification, { Importance } from 'react-native-push-notification';
// import { requestSetReminderPermission } from "./remindingPermissions";


// const channels = {
//     alarm: {
//         channelId: "PERSONAL_ASSISTANT_A", // (required)
//         channelName: "alarm", // (required)
//         channelDescription: "This channel is used for setting alarms", // (optional) default: undefined.
//         playSound: true, // (optional) default: true
//         soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
//         importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
//         vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
//     },
//     reminder: {
//         channelId: "PERSONAL_ASSISTANT_R", // (required)
//         channelName: "reminder", // (required)
//         channelDescription: "This channel is used for setting reminders", // (optional) default: undefined.
//         playSound: true, // (optional) default: true
//         soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
//         importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
//         vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
//     },
//     meeting: {
//         channelId: "PERSONAL_ASSISTANT_M", // (required)
//         channelName: "meeting", // (required)
//         channelDescription: "This channel is used for setting meetings", // (optional) default: undefined.
//         playSound: true, // (optional) default: true
//         soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
//         importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
//         vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
//     }
// };

// const channelExists = async (channel_id) => {
//     await PushNotification.channelExists(channel_id, (exists) => {
//         console.log(`Channel exists: ${Boolean(exists)}`);
//         return exists;
//     });
// }

// const getChannels = async (channel_ids) => {
//     await PushNotification.getChannels(channel_ids, (channels) => {
//         console.log("Channels:", channels);
//         return channels;
//     });
// }

// export const setReminder = async (reminder_type, reminder_name, reminder_time) => {
//     const hasPermission = await requestSetReminderPermission();
//     if (hasPermission) {;
//         const channel = channels[reminder_type];
//         const channel_exists = await channelExists(channel?.channelId);
//         if (channel_exists===false) {
//             console.log(`Setting reminder for ${reminder_name} at ${reminder_time}`);
//             await PushNotification.createChannel(channel, (created) => {
//                 console.log(`Channel created: ${created}`);
//             });
//         }
//         const [time, dayMonthYear] = reminder_time.split('-');
//         const [hours, minutes] = time.split(':');
//         const [day, month, year] = dayMonthYear.split(':');

//         // Create a Date object in local time
//         const localDate = new Date(year, month - 1, day, hours, minutes);

//         // Convert the local time to UTC time
//         const utcTime = new Date(localDate.getTime() + (localDate.getTimezoneOffset() * 60000));

//         // Adjust for IST (UTC+5:30)
//         const istOffset = 5 * 60 * 60 * 1000 + 30 * 60 * 1000;
//         const adjustedTime = utcTime.getTime() + istOffset;
        
//         try {
//             await PushNotification.cancelAllLocalNotifications();
//             await PushNotification.localNotificationSchedule({
//                 channelId: channel.channelId,
//                 title: reminder_name,
//                 message: `Reminder for ${reminder_name} at ${reminder_time}`,
//                 actions: ["Accept", "Reject"],
//                 date: new Date(adjustedTime),
//                 when: adjustedTime,
//                 allowWhileIdle: true,
//                 invokeApp: false,
//             });
    
//             await PushNotification.configure({
//                 onAction: function (notification) {
//                     if (notification.action === 'Accept') {
//                         console.log('Alarm Snoozed');
//                     }
//                     else if (notification.action === 'Reject') {
//                         console.log('Alarm Stoped');
//                         //PushNotification.cancelAllLocalNotifications();
//                     }
//                     else {
//                         console.log('Notification opened');
//                     }
//                 },
//                 actions: ["Accept", "Reject"],
//             });
//         } catch (error) {
//             console.log(error);
//         }
//     } else {
//         console.log('Permission denied');
//     }
// }

// const getReminders = async () => {
//     console.log("Getting all the reminders...");
// }
