import http from "./httpService";
import { SERVER_URL } from "../config.js";
import axios from "axios";

export async function signUp(formData) {
    var config = {
        method: "post",
        url: `${SERVER_URL}/api/users/signup`,
        headers: { Accept: "application/json, text/plain, /", "Content-Type": "multipart/form-data" },
        data: formData,
    };
    const res = await axios(config);
    return res;
}

export default {
    signUp,
};
