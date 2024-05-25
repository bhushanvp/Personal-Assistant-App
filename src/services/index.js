import { makeCallDeclaration, getMissedCallsDeclaration } from "./calling/callingDeclarations.js";
import { searchContactDeclaration } from "./contacts/contactsDeclarations.js";
import { readLatestEmailFromDeclaration, readUnreadEmailsDeclaration, readUnreadEmailsFromDeclaration, sendEmailByAddressDeclaration, sendEmailByNameDeclaration } from "./emailing/emailingDeclarations.js";
import { readLatestMessageFromDeclaration, readUnreadMessagesDeclaration, readUnreadMessagesFromDeclaration, sendMessageDeclaration } from "./messaging/messagingDeclarations.js";
import { getRemindersDeclaration, setReminderDeclaration, getRemindersForTodayDeclaration } from "./reminders/remindingDeclarations.js";

export const functions = [
    makeCallDeclaration, getMissedCallsDeclaration, readLatestEmailFromDeclaration, readUnreadEmailsDeclaration, readUnreadEmailsFromDeclaration, sendEmailByAddressDeclaration, sendEmailByNameDeclaration, readLatestMessageFromDeclaration, readUnreadMessagesDeclaration, readUnreadMessagesFromDeclaration, sendMessageDeclaration, getRemindersDeclaration, setReminderDeclaration, getRemindersForTodayDeclaration, searchContactDeclaration
];