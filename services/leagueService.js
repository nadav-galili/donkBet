import http from "./httpService";
import { SERVER_URL } from "../config.js";
import axios from "axios";

export function getMyLeagues() {
    return http.get(`${SERVER_URL}/api/leagues/myLeagues`);
}
