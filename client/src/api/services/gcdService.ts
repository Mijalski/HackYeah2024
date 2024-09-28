import axios from "axios"

const BASE_URL = "https://us-central1-hackyeah-2024.cloudfunctions.net"

export const gcdService = {
    getHelloWorld: async () => {
        return await axios.get(`${BASE_URL}/hello_world`)
    }
}