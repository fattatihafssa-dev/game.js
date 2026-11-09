

import {
    getPlayers,
    savePlayers,
    getSelectedPlayer,
    saveSelectedPlayer
} from "./storage.js";

export function addPlayer(playerData) {
    const players = getPlayers();

    const nickname = playerData.nickname.trim();
    const avatar = playerData.avatar.trim();

    if (nickname.length < 3 || nickname.length > 20) {
        return {
            success: false,
            message: "Le pseudo doit contenir entre 3 et 20 caractères."
        };
    }

    if (!avatar) {
        return {
            success: false,
            message: "Veuillez choisir un avatar."
        };
    }

    const exists = players.some(function(player) {
        return player.nickname.toLowerCase() === nickname.toLowerCase();
    });

    if (exists) {
        return {
            success: false,
            message: "Ce pseudo existe déjà."
        };
    }

    const newPlayer = {
        id: `p_${Date.now()}`,
        nickname: nickname,
        avatar: avatar,
        createdAt: new Date().toISOString()
    };

    players.push(newPlayer);
    savePlayers(players);

    return {
        success: true,
        message: "Joueur ajouté avec succès.",
        player: newPlayer
    };
}


export function updatePlayer(playerId, updatedData) {
    const players = getPlayers();

    const index = players.findIndex(function(player) {
        return player.id === playerId;
    });

    if (index === -1) {
        return {
            success: false,
            message: "Joueur introuvable."
        };
    }

    const nickname = updatedData.nickname.trim();
    const avatar = updatedData.avatar.trim();

    if (nickname.length < 3 || nickname.length > 20) {
        return {
            success: false,
            message: "Le pseudo doit contenir entre 3 et 20 caractères."
        };
    }

    const duplicate = players.some(function(player) {
        return player.id !== playerId &&
            player.nickname.toLowerCase() === nickname.toLowerCase();
    });

    if (duplicate) {
        return {
            success: false,
            message: "Ce pseudo est déjà utilisé."
        };
    }

    players[index] = {
        ...players[index],
        nickname: nickname,
        avatar: avatar || players[index].avatar
    };

    savePlayers(players);

    const selectedPlayer = getSelectedPlayer();

    if (selectedPlayer && selectedPlayer.id === playerId) {
        saveSelectedPlayer(players[index]);
    }

    return {
        success: true,
        message: "Profil modifié avec succès.",
        player: players[index]
    };
}


export function deletePlayer(playerId) {
    const players = getPlayers();

    const updatedPlayers = players.filter(function(player) {
        return player.id !== playerId;
    });

    if (updatedPlayers.length === players.length) {
        return false;
    }

    savePlayers(updatedPlayers);

    const selectedPlayer = getSelectedPlayer();

    if (selectedPlayer && selectedPlayer.id === playerId) {
        saveSelectedPlayer(null);
    }

    return true;
}