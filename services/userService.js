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

// export async function storeToken(token) {
//     try {
//         await AsyncStorage.setItem("token", token);
//     } catch (error) {
//         console.log("🚀 ~ file: userService.js ~ line 64 ~ storeToken ~ error", error);
//     }
// }

export async function login(nickName, password) {
    const tokenKey = "token";
    console.log("🚀 ~ file: userService.js:27 ~ login ~ nickName:", nickName);

    const { data } = await http.post(`${SERVER_URL}/api/auth`, { nickName, password });

    console.log("🚀 ~ file: userService.js:31 ~ login ~ data:", data);
    await AsyncStorage.setItem(tokenKey, data.token);
}

async function getToken() {
    try {
        const token = await AsyncStorage.getItem("token");
        console.log("🚀 ~ file: userService.js:28 ~ getToken ~ token:", token);
        if (token !== null) {
            return token;
        } else {
            console.log("no token");
            return null;
        }
    } catch (e) {
        // error reading value
        console.log(e);
    }
}

async function getUser() {
    const token = await getToken();
    console.log("🚀 ~ file: userService.js:28 ~ getToken ~ token:", token);
    if (token !== null) {
        return token;
        // http.setJwt(token);
        // const res = await http.get(`${SERVER_URL}/api/users/me`);
        // return res;
    } else {
        console.log("no token");
        return null;
    }
}

export default {
    signUp,
    // storeToken,

    login,
};
