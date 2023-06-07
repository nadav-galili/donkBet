import http from "./httpService";
import { SERVER_URL } from "../config.js";

export function getMyLeagues() {
    return http.get(`${SERVER_URL}/api/leagues/myLeagues`);
}

export default {
    getMyLeagues,
};
