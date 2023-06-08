import http from "./httpService";
import { SERVER_URL } from "../config.js";

export function getMyLeagues(userId) {
    return http.get(`${SERVER_URL}/api/leagues/myLeagues/${userId}`);
}

export default {
    getMyLeagues,
};
