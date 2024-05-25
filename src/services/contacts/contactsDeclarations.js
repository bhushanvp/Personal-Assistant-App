
export const searchContactDeclaration = {
    name: "searchContact",
    parameters: {
        type: "OBJECT",
        description: "Search for a contact by name.",
        properties: {
            contact_name: {
                type: "STRING",
                description: "The contact name to search to.",
            },
        },
        required: ["contact_name"],
    },
};