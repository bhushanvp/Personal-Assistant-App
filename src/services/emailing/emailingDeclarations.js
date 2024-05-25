export const sendEmailByNameDeclaration = {
    name: "sendEmailByContactName",
    parameters: {
        type: "OBJECT",
        description: "Send an email with a subject, body, to the given email address.",
        properties: {
            contact_name: {
                type: "STRING",
                description: "The contact name to send the email to.",
            },
            subject: {
                type: "STRING",
                description: "The subject of the email",
            },
            body: {
                type: "STRING",
                description: "The body of the email",
            },
        },
        required: ["contact_name", "subject", "body"],
    },
};

export const sendEmailByAddressDeclaration = {
    name: "sendEmailByAddress",
    parameters: {
        type: "OBJECT",
        description: "Send an email with a subject, body, to the given email address.",
        properties: {
            to_email: {
                type: "STRING",
                description: "The email address to send the email to.",
            },
            subject: {
                type: "STRING",
                description: "The subject of the email",
            },
            body: {
                type: "STRING",
                description: "The body of the email",
            },
        },
        required: ["to_email", "subject", "body"],
    },
};

export const readUnreadEmailsDeclaration = {
    name: "readUnreadEmails",
    parameters: {
        type: "OBJECT",
        description: "Read all unread emails.",
        properties: {},
        required: [],
    },
};

export const readUnreadEmailsFromDeclaration = {
    name: "readUnreadEmailsFrom",
    parameters: {
        type: "OBJECT",
        description: "Read the unread emails from the given email address.",
        properties: {
            from_email: {
                type: "STRING",
                description: "The email address to read the unread emails from.",
            },
        },
        required: ["from_email"],
    }
}

export const readLatestEmailFromDeclaration = {
    name: "readLatestEmailFrom",
    parameters: {
        type: "OBJECT",
        description: "Read the latest email from the given email address.",
        properties: {
            from_email: {
                type: "STRING",
                description: "The email address to read the latest email from.",
            },
        },
        required: ["from_email"],
    }
}