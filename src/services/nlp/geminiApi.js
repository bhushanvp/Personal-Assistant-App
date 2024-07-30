import { GoogleGenerativeAI } from "@google/generative-ai";
import { functions } from "../index.js";

// Add your Gemini API Key here
// const GEMINI_API_KEY = <Your Gemini API Key>


export class GeminiAPI {
    constructor (){
        this.genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
        this.generationConfigs = {
            temperature: 0.5,
        };
        
        this.model = this.genAI.getGenerativeModel({
            model: "gemini-1.0-pro",
            tools: {
                functionDeclarations: functions
            },
            generationConfigs: this.generationConfigs
        });
        this.chat = this.model.startChat();
    }

    async query(message) {
        const now = new Date();
        const istOffset = 5.5 * 60 * 60 * 1000; // IST offset in milliseconds
        const istTime = new Date(now.getTime() + istOffset);

        const response = await this.chat.sendMessage(`You are a good chatbot used for function calling, please """${message}""". Current time for your reference ${istTime}`);

        return response.response;
    }
}