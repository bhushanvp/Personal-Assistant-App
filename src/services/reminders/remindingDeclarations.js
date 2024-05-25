export const setReminderDeclaration = {
    name: "setReminder",
    parameters: {
        type: "OBJECT",
        description: "Set a reminder or meeting or alarm for 'reminder_type' with a name to it 'reminder_name' for a given time 'reminder_time', the 'reminder_time' must be in the format 'HH:MM-dd:mm:yyyy' only.",
        properties: {
            reminder_name: {
                type: "STRING",
                description: "The name of the reminder/alarm/meeting to set.",
            },
            reminder_type: {
                type: "STRING",
                enum: ["alarm", "reminder", "meeting"],
                description: "The type of the reminder/alarm/meeting to set.",
            },
            reminder_time: {
                type: "STRING",
                description: "The time of the reminder/alarm/meeting strictly only in the format 'HH:MM-dd:mm:yyyy'",
            },
        },
        required: ["reminder_type", "reminder_name", "reminder_time"],
    },
}

export const getRemindersForTodayDeclaration = {
    name: "getRemindersForToday",
    parameters: {
        type: "OBJECT",
        description: "Get the reminders that are set for today(next 24 hours).",
        properties: {},
        required: [],
    },
}

export const getRemindersDeclaration = {
    name: "getReminders",
    parameters: {
        type: "OBJECT",
        description: "Get all the reminders that are set in the future.",
        properties: {},
        required: [],
    },
}