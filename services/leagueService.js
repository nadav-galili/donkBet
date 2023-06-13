import http from "./httpService";
import { SERVER_URL } from "../config.js";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function getMyLeagues(userId) {
    return http.get(`${SERVER_URL}/api/leagues/myLeagues/${userId}`);
}

export async function createLeague(formData) {
    var config = {
        method: "post",
        url: `${SERVER_URL}/api/leagues/createLeague`,
        headers: {
            Accept: "application/json, text/plain, /",
            "Content-Type": "multipart/form-data",
            "x-auth-token": await AsyncStorage.getItem("token"),
        },
        data: formData,
    };

    const res = await axios(config);
    return res;
}

export async function joinLeague(leagueNumber, userId) {
    return http.put(`${SERVER_URL}/api/leagues/joinLeague/${leagueNumber}/${userId}`);
}

export default {
    getMyLeagues,
    createLeague,
    joinLeague,
};
