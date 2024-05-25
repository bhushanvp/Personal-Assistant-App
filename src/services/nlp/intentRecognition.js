import { GeminiAPI } from "./geminiApi.js";


export class IntentRecognizer {
    constructor() {
        this.gemini = new GeminiAPI();
        console.log("Initialized a IntentRecognizerInstance");
    }

    async getIntentAndEntities(query) {
        // Get the intent and entities from the given text using the Gemini function calling API.

        console.log("Received:", query);
        
        const response = await this.gemini.query(query);
        let intent = ""
        let entities = ""

        if(response.text()){
            intent = "CONTINUATION"
            entities = response.text()
        }
        else {
            let func = response.functionCalls()[0]
            intent = func.name
            entities = func.args

            // console.log(entities);
        }

        const intent_entities = {"intent": intent, "entities": entities}

        return intent_entities
    }
}