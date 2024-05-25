export const sendMessageDeclaration = {
    name: "sendMessage",
    parameters: {
        type: "OBJECT",
        description: "Send a message with text as body to the given phone number.",
        properties: {
            to_contact_name: {
                type: "STRING",
                description: "The contact name to send the message to.",
            },
            body: {
                type: "STRING",
                description: "The body of the message",
            },
        },
        required: ["to_contact_name", "body"],
    },
};

export const readUnreadMessagesDeclaration = {
    name: "readUnreadMessages",
    parameters: {
        type: "OBJECT",
        description: "Read all unread messages.",
        properties: {},
        required: [],
    },
};

export const readUnreadMessagesFromDeclaration = {
    name: "readUnreadMessagesFrom",
    parameters: {
        type: "OBJECT",
        description: "Read the unread messages from the given from_contact_name.",
        properties: {
            from_contact_name: {
                type: "STRING",
                description: "The from_contact_name to read the unread messages from.",
            },
        },
        required: ["from_contact_name"],
    }
}

export const readLatestMessageFromDeclaration = {
    name: "readLatestMessageFrom",
    parameters: {
        type: "OBJECT",
        description: "Read the latest message from the given contact_name.",
        properties: {
            from_contact_name: {
                type: "STRING",
                description: "The contact_name to read the latest message from.",
            },
        },
        required: ["from_contact_name"],
    }
}