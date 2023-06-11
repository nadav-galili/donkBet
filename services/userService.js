import http from "./httpService";
import { SERVER_URL } from "../config.js";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

export async function login(nickName, password) {
    const tokenKey = "token";
    const { data } = await http.post(`${SERVER_URL}/api/auth`, { nickName, password });
    await AsyncStorage.setItem(tokenKey, data.token);
    return data;
}

export function getUserDetails() {
    return http.get(`${SERVER_URL}/api/users/me`);
}

export default {
    signUp,
    login,
    getUserDetails,
};
