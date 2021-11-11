import axios from "axios";

export default class http {
    static async Get(url) {
        try {
            return await axios.get(url);
        } catch (err) {
            return "你没联网";
        }
    }

    static async Post(url) {
        try {
            return await axios.post(url);
        } catch (err) {
            return "你没联网";
        }
    }

    
}