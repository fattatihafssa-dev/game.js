// src/history.js

import {
    getHistory,
    saveHistory,
    getPlayers
} from "./storage.js";


// Save a completed game
export function addGameToHistory(game) {
    const history = getHistory();

    const newGame = {
        id: `g_${Date.now()}`,
        date: new Date().toISOString(),
        ...game
    };

    history.push(newGame);

    saveHistory(history);

    return newGame;
}


// Get games belonging to one player
export function getPlayerHistory(playerId) {
    return getHistory().filter(function(game) {
        return game.playerId === playerId;
    });
}


// Filter history by player nickname, result and date
export function filterHistory(filters = {}) {
    // Support the older filterHistory(playerId) call too.
    if (typeof filters === "string") {
        return getPlayerHistory(filters);
    }

    const history = getHistory();

    const search = (filters.search || "").toLowerCase();
    const result = (filters.result || "all").toLowerCase();
    const date = (filters.date || "all").toLowerCase();

    const now = new Date();

    return history.filter(function(game) {
        const nickname = (game.nickname || "").toLowerCase();

        const matchesSearch = nickname.includes(search);

        const gameResult = (game.result || "").toLowerCase();

        const matchesResult =
            result === "all" ||
            (result === "win" && ["win", "victoire"].includes(gameResult)) ||
            (result === "loss" && ["loss", "défaite", "defaite"].includes(gameResult)) ||
            (result === "draw" && ["draw", "égalité", "egalite"].includes(gameResult));

        const gameDate = new Date(game.date);

        let matchesDate = true;

        if (date === "today") {
            matchesDate =
                gameDate.toDateString() === now.toDateString();
        }

        if (date === "week") {
            const oneWeekAgo = new Date();
            oneWeekAgo.setDate(now.getDate() - 7);

            matchesDate =
                gameDate >= oneWeekAgo && gameDate <= now;
        }

        return matchesSearch && matchesResult && matchesDate;
    });
}


// Calculate player ranking
export function getRanking() {
    const players = getPlayers();
    const history = getHistory();

    const ranking = players.map(function(player) {
        const playerGames = history.filter(function(game) {
            return game.playerId === player.id;
        });

        const wins = playerGames.filter(function(game) {
            return ["win", "victoire"].includes(
                (game.result || "").toLowerCase()
            );
        }).length;

        const losses = playerGames.filter(function(game) {
            return ["loss", "défaite", "defaite"].includes(
                (game.result || "").toLowerCase()
            );
        }).length;

        const draws = playerGames.filter(function(game) {
            return ["draw", "égalité", "egalite"].includes(
                (game.result || "").toLowerCase()
            );
        }).length;

        const points = playerGames.reduce(function(total, game) {
            return total + Number(game.playerScore || 0);
        }, 0);

        return {
            id: player.id,
            nickname: player.nickname,
            avatar: player.avatar,
            wins,
            losses,
            draws,
            points
        };
    });

    ranking.sort(function(a, b) {
        return b.points - a.points;
    });

    return ranking;
}