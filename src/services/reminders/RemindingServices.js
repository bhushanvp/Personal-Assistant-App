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
            let start_time = new Date(time);
            const formattedTime = start_time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
            const formattedDate = start_time.toLocaleString('en-US', { month: 'long', day: 'numeric' });
            Tts.speak(`Reminder for ${reminder_name} at ${formattedTime} on ${formattedDate} has been set`);
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
