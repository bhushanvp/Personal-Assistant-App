export const makeCallDeclaration = {
    name: "makeCall",
    parameters: {
        type: "OBJECT",
        description: "Make a phone call to the given contact name.",
        properties: {
            to_contact_name: {
                type: "STRING",
                description: "The contact name to call to.",
            },
        },
        required: ["to_contact_name"],
    },
};

export const getMissedCallsDeclaration = {
    name: "getMissedCalls",
    parameters: {
        type: "OBJECT",
        description: "Get the list of missed calls.",
        properties: {},
        required: [],
    },
};