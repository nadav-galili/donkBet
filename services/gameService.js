import http from "./httpService";
import { SERVER_URL } from "../config.js";

export function newGame(selectedPlayers, selectedLeague, leaguePlayers) {
    return http.post(`${SERVER_URL}/api/games/newGame`, { selectedPlayers, selectedLeague, leaguePlayers });
}

export function addBuyInToPlayer(playerId, gameId, buyInAmount, leagueId) {
    return http.post(`${SERVER_URL}/api/games/addBuyInToPlayer`, { playerId, gameId, buyInAmount, leagueId });
}

export default {
    newGame,
    addBuyInToPlayer,
};
