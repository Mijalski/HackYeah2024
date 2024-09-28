import axios from "axios"

const BASE_URL = "https://europe-central2-hackyeah-2024.cloudfunctions.net"
const audioCache = new Map();

export const gcdService = {
    
    getHelloWorld: async () => {
        return await axios.get(`${BASE_URL}/hello_world`)
    },
    getPrompt: async (level: string, from: string, to: string) => {
        return await axios.get(`${BASE_URL}/get_prompt?level=${level}&from=${from}&to=${to}`)
    },
    evaluateResponse: async (response: string) => {
        return await axios.post(`${BASE_URL}/post_evaluation`, { response })
    },
    readPrompt: async (prompt: string) => {
        if (audioCache.has(prompt)) {
            const cachedAudio = audioCache.get(prompt);
            console.log("Cache hit!");
            return cachedAudio;
        }
        const response = await axios.post(`${BASE_URL}/post_read_prompt`, { prompt }, {
            responseType: 'blob',
        });

        audioCache.set(prompt, response.data);
        return response.data;
    }
}