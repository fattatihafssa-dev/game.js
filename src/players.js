

import {
    getPlayers,
    savePlayers,
    getSelectedPlayer,
    saveSelectedPlayer
} from "./storage.js";



export function validationNickname(nickname) {
    const regex = /^[A-Za-z0-9]{3,15}$/;

    return typeof nickname === "string" &&
        regex.test(nickname.trim());
}



export function nicknameExists(nickname, excludedId = null) {
    const players = getPlayers();

    return players.some(player =>
        player.id !== excludedId &&
        player.nickname.toLowerCase() === nickname.trim().toLowerCase()
    );
}



export function validationAvatar(avatar) {
    const allowedAvatars = [
        "dragon",
        "empereur",
        "citizen",
        "slave"
    ];

    return allowedAvatars.includes(avatar);
}




export function addPlayer(nickname, avatar) {
    if (typeof nickname !== "string") {
        return {
            success: false,
            message: "Pseudo invalide."
        };
    }

    nickname = nickname.trim();

    if (!validationNickname(nickname)) {
        return {
            success: false,
            message: "Pseudo invalide : 3 à 15 lettres ou chiffres."
        };
    }

    if (nicknameExists(nickname)) {
        return {
            success: false,
            message: "Ce pseudo existe déjà."
        };
    }

    if (!validationAvatar(avatar)) {
        return {
            success: false,
            message: "Avatar invalide."
        };
    }

    const newPlayer = {
        id: `p_${Date.now()}`,
        nickname: nickname,
        avatar: avatar,
        createdAt: new Date().toISOString().split("T")[0]
    };

    const players = getPlayers();

    players.push(newPlayer);

    savePlayers(players);

    return {
        success: true,
        message: "Joueur ajouté avec succès.",
        player: newPlayer
    };
}




export function editPlayer(id, newNickname, newAvatar) {
    if (typeof newNickname !== "string") {
        return {
            success: false,
            message: "Pseudo invalide."
        };
    }

    newNickname = newNickname.trim();

    const players = getPlayers();

    const player = players.find(player => player.id === id);

    if (!player) {
        return {
            success: false,
            message: "Joueur introuvable."
        };
    }

    if (!validationNickname(newNickname)) {
        return {
            success: false,
            message: "Pseudo invalide : 3 à 15 lettres ou chiffres."
        };
    }

    if (nicknameExists(newNickname, id)) {
        return {
            success: false,
            message: "Ce pseudo existe déjà."
        };
    }

    if (!validationAvatar(newAvatar)) {
        return {
            success: false,
            message: "Avatar invalide."
        };
    }

    player.nickname = newNickname;
    player.avatar = newAvatar;

    savePlayers(players);

    // Update the selected player if necessary
    const selectedPlayer = getSelectedPlayer();

    if (selectedPlayer && selectedPlayer.id === id) {
        saveSelectedPlayer(player);
    }

    return {
        success: true,
        message: "Joueur modifié avec succès.",
        player: player
    };
}




export function deletePlayer(id) {
    const players = getPlayers();

    const playerExists = players.some(player => player.id === id);

    if (!playerExists) {
        return {
            success: false,
            message: "Joueur introuvable."
        };
    }

    const updatedPlayers = players.filter(player =>
        player.id !== id
    );

    savePlayers(updatedPlayers);

    // Clear selection if this player was active
    const selectedPlayer = getSelectedPlayer();

    if (selectedPlayer && selectedPlayer.id === id) {
        saveSelectedPlayer(null);
    }

    return {
        success: true,
        message: "Joueur supprimé avec succès."
    };
}




export function getPlayerById(id) {
    const players = getPlayers();

    return players.find(player => player.id === id) || null;
}




export function selectPlayer(id) {
    const player = getPlayerById(id);

    if (!player) {
        return {
            success: false,
            message: "Joueur introuvable."
        };
    }

    saveSelectedPlayer(player);

    return {
        success: true,
        message: "Joueur sélectionné avec succès.",
        player: player
    };
}



export function getActivePlayer() {
    const selectedPlayer = getSelectedPlayer();

    if (!selectedPlayer) {
        return null;
    }

    return getPlayerById(selectedPlayer.id);
}



export function getAllPlayers() {
    return getPlayers();
}
