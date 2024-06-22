# Personal Assistant App

This is a repository which contains the code for a audio-textual personal assistant android app built using React Native.

It is a wrapper on [Gemini](https://ai.google.dev/) (you can change it with other LLMs as well) which uses function calling to search contacts, make calls, check missed calls, check messages, send messages, set reminders, check for future reminders, etc.

Please make sure you add your details in the Settings page of the app before you query it. The app requires a lot of permissions to function properly.

## Available Features
### Calling
- #### makeCall
   - **Description:** Make a phone call to the given contact name.
   - **Args:**
      - to_contact_name (str)

- #### getMissedCalls
   - **Description:** Get the list of missed calls from past 6 hours.

### Contacts / Phonebook
- #### searchContact
   - **Description:** Search for a contact by name.
   - **Args:**
      - contact_name (str)

### Text Messaging
- #### sendMessage
   - **Description:** Send a message with text as body to the given phone number.
   - **Args:**
      - to_contact_name (str)
      - body (str)

- #### readUnreadMessages
   - **Description:** Read all unread messages.

- #### readUnreadMessagesFrom
   - **Description:** Read the unread messages from the given from_contact_name.
   - **Args:**
      - from_contact_name (str)

- #### readLatestMessageFrom
   - **Description:** Read the latest message from the given contact_name.
   - **Args:**
      from_contact_name (str)

### Reminding
- #### setReminder
   - **Description:** Set a reminder or meeting or alarm with a name at a given time.
   - **Args:**
      - reminder_name (str)
      - reminder_type (enum) [alarm, reminder, meeting]
      - reminder_time (str) [HH:MM-dd:mm:yyyy]

- #### getRemindersForToday
   - **Description:** Get the reminders that are set for today(next 24 hours).

- #### getReminders
   - **Description:** Get all the reminders that are set in the next 2 days.

## Upcoming Features

### Emailing
- #### sendEmailByName
   - **Description:** Send an email with a subject, body, to the given email address.
   - **Args:**
      - contact_name (str)
      - subject (str)
      - body (str)

- #### sendEmailByAddress
   - **Description:** Send an email with a subject, body, to the given email address.
   - **Args:**
      - to_email (email, str)
      - subject (str)
      - body (str)

- #### readUnreadEmails
   - **Description:** Read all unread emails.

- #### readUnreadEmailsFrom
   - **Description:** Read the unread emails from the given email address.
   - **Args:**
      - from_email (email, str)

- #### readLatestEmailFrom
   - **Description:** Read the latest email from the given email address.
   - **Args:**
      - from_email (email, str)

## Contributions
Please feel free to contribute to this app, I am a beginner in React Native so please forgive me for my coding style :)

## Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.


### Step 2: Install required libraries
Install app the required libraries
```bash
npm i
```

### Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
npm start
```

### Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

```bash
npm run android
```