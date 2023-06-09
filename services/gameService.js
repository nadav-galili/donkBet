import http from "./httpService";
import { SERVER_URL } from "../config.js";

export function newGame(selectedPlayers, selectedLeague, leaguePlayers) {
    return http.post(`${SERVER_URL}/api/games/newGame`, { selectedPlayers, selectedLeague, leaguePlayers });
}

export function addBuyInToPlayer(playerId, gameId, buyInAmount, leagueId) {
    return http.post(`${SERVER_URL}/api/games/addBuyInToPlayer`, { playerId, gameId, buyInAmount, leagueId });
}

export function getUserGamesByGameId(gameId) {
    return http.get(`${SERVER_URL}/api/games/getUserGamesByGameId/${gameId}`);
}

export function getGameDetails(gameId) {
    return http.get(`${SERVER_URL}/api/games/getGameDetails/${gameId}`);
}

export function cashOutPlayer(userId, gameId, cashOutAmount) {
    cashOutAmount = parseInt(cashOutAmount);
    return http.put(`${SERVER_URL}/api/games/cashOutPlayer`, { userId, gameId, cashOutAmount });
}

export function endGame(gameId) {
    console.log("🚀 ~ file: gameService.js:26 ~ endGame ~ gameId:", gameId);
    return http.put(`${SERVER_URL}/api/games/endGame`, { gameId });
}

export default {
    newGame,
    addBuyInToPlayer,
    getUserGamesByGameId,
    getGameDetails,
    cashOutPlayer,
    endGame,
};
