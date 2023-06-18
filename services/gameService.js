import http from "./httpService";
import { SERVER_URL } from "../config.js";

export function newGame(selectedPlayers, selectedLeague, leaguePlayers) {
    return http.post(`${SERVER_URL}/api/games/newGame`, { selectedPlayers, selectedLeague, leaguePlayers });
}

export default {
    newGame,
};
