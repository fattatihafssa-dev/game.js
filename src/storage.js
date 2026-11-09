// src/storage.js

export function getPlayers() {
    try {
        return JSON.parse(localStorage.getItem("players")) || [];
    } catch {
        return [];
    }
}

export function savePlayers(players) {
    localStorage.setItem("players", JSON.stringify(players));
}

export function getSelectedPlayer() {
    try {
        return JSON.parse(localStorage.getItem("selectedPlayer")) || null;
    } catch {
        return null;
    }
}

export function saveSelectedPlayer(player) {
    if (player) {
        localStorage.setItem("selectedPlayer", JSON.stringify(player));
    } else {
        localStorage.removeItem("selectedPlayer");
    }
}

export function getHistory() {
    try {
        return JSON.parse(localStorage.getItem("history")) || [];
    } catch {
        return [];
    }
}

export function saveHistory(history) {
    localStorage.setItem("history", JSON.stringify(history));
}