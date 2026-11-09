// src/ui.js

function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, function(character) {
        const replacements = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        };

        return replacements[character];
    });
}


// Display game information
export function renderGame(game) {
    if (!game) return;

    const roundNumber = document.getElementById("round-number");
    const playerScore = document.getElementById("player-score");
    const computerScore = document.getElementById("computer-score");
    const playerCamp = document.getElementById("player-camp");
    const computerCamp = document.getElementById("computer-camp");
    const firstPlayer = document.getElementById("first-player");
    const campIndicator = document.getElementById("camp-indicator");
    const winnerCount = document.getElementById("winner-count");

    const computerCampValue =
        game.playerCamp === "empereur" ? "slave" : "empereur";

    if (roundNumber) {
        roundNumber.textContent = game.currentRound;
    }

    if (playerScore) {
        playerScore.textContent = game.playerScore;
    }

    if (computerScore) {
        computerScore.textContent = game.computerScore;
    }

    if (playerCamp) {
        playerCamp.textContent = "Camp : " + game.playerCamp;
    }

    if (computerCamp) {
        computerCamp.textContent = "Camp : " + computerCampValue;
    }

    if (firstPlayer) {
        firstPlayer.textContent =
            "Premier joueur : " + game.firstPlayer;
    }

    if (campIndicator) {
        campIndicator.textContent = game.playerCamp;
    }

    if (winnerCount) {
        winnerCount.textContent = game.playerScore;
    }
}


// Display all players
export function renderPlayers(players, selectedPlayer = null) {
    const playersList = document.getElementById("players-list");

    if (!playersList) return;

    if (players.length === 0) {
        playersList.innerHTML = `
            <p class="text-center text-slate-400">
                Aucun joueur pour le moment.
            </p>
        `;
        return;
    }

    playersList.innerHTML = players.map(function(player) {
        const selected = selectedPlayer &&
            selectedPlayer.id === player.id;

        return `
            <article class="mb-4 rounded-xl border border-yellow-500 bg-slate-900 p-5">

                <h3 class="text-xl font-bold text-yellow-300">
                    ${escapeHTML(player.nickname)}
                </h3>

                <p class="my-2 text-white">
                    Avatar : ${escapeHTML(player.avatar)}
                </p>

                ${selected ? `
                    <p class="mb-3 font-bold text-green-400">
                        Joueur sélectionné
                    </p>
                ` : ""}

                <div class="mt-4 flex flex-wrap gap-2">

                    <button
                        type="button"
                        data-action="select"
                        data-id="${escapeHTML(player.id)}"
                        class="rounded-lg bg-blue-500 px-4 py-2 font-bold text-white"
                    >
                        Sélectionner
                    </button>

                    <button
                        type="button"
                        data-action="edit"
                        data-id="${escapeHTML(player.id)}"
                        class="rounded-lg bg-yellow-500 px-4 py-2 font-bold text-black"
                    >
                        Modifier
                    </button>

                    <button
                        type="button"
                        data-action="delete"
                        data-id="${escapeHTML(player.id)}"
                        class="rounded-lg bg-red-600 px-4 py-2 font-bold text-white"
                    >
                        Supprimer
                    </button>

                </div>
            </article>
        `;
    }).join("");
}


// Display history
export function renderHistory(history) {
    const historyList = document.getElementById("history-list");

    if (!historyList) return;

    if (history.length === 0) {
        historyList.innerHTML = `
            <p class="text-center text-slate-400">
                Aucun historique pour le moment.
            </p>
        `;
        return;
    }

    historyList.innerHTML = history.map(function(game) {
        const date = new Date(game.date).toLocaleString("fr-FR");

        let resultText = "Égalité";
        let resultColor = "text-yellow-400";

        if (["win", "victoire"].includes((game.result || "").toLowerCase())) {
            resultText = "Victoire";
            resultColor = "text-green-400";
        }

        if (["loss", "défaite", "defaite"].includes((game.result || "").toLowerCase())) {
            resultText = "Défaite";
            resultColor = "text-red-400";
        }

        return `
            <article class="rounded-xl border border-yellow-500 bg-black p-5">

                <div class="flex flex-wrap items-center justify-between gap-3">

                    <h3 class="text-xl font-bold text-yellow-300">
                        ${escapeHTML(game.nickname)}
                    </h3>

                    <span class="${resultColor} font-bold">
                        ${resultText}
                    </span>

                </div>

                <p class="mt-2 text-slate-300">
                    Score : ${Number(game.playerScore || 0)}
                    - ${Number(game.computerScore || 0)}
                </p>

                <p class="mt-2 text-sm text-slate-400">
                    ${date}
                </p>

            </article>
        `;
    }).join("");
}


// Display ranking
export function renderRanking(ranking) {
    const rankingList = document.getElementById("ranking-list");

    if (!rankingList) return;

    if (ranking.length === 0) {
        rankingList.innerHTML = `
            <tr>
                <td colspan="5" class="p-5 text-center text-slate-400">
                    Aucun joueur dans le classement.
                </td>
            </tr>
        `;
        return;
    }

    rankingList.innerHTML = ranking.map(function(player, index) {
        return `
            <tr class="border-b border-slate-700">

                <td class="p-3 font-bold text-yellow-400">
                    ${index + 1}
                </td>

                <td class="p-3 text-white">
                    ${escapeHTML(player.nickname)}
                </td>

                <td class="p-3 text-green-400">
                    ${player.wins}
                </td>

                <td class="p-3 text-red-400">
                    ${player.losses}
                </td>

                <td class="p-3 font-bold text-yellow-300">
                    ${player.points}
                </td>

            </tr>
        `;
    }).join("");
}