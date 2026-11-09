

import {
    getPlayers,
    getSelectedPlayer,
    saveSelectedPlayer
} from "./storage.js";

import {
    addPlayer,
    updatePlayer,
    deletePlayer
} from "./players.js";

import {
    startGame,
    playRound,
    computerPlaysFirst,
    getGameWinner
} from "./game.js";

import {
    addGameToHistory,
    filterHistory,
    getRanking
} from "./history.js";

import {
    renderGame,
    renderPlayers,
    renderHistory,
    renderRanking
} from "./ui.js";




let game = null;
let selectedPlayer = getSelectedPlayer();
let historySaved = false;

const playerHand = document.getElementById("player-hand");
const computerHand = document.getElementById("computer-hand");
const startButton = document.getElementById("start-game");

const message = document.getElementById("game-message");



const cards = [
    {
        name: "Empereur",
        value: "empereur",
        icon: "👑"
    },
    {
        name: "Citoyen",
        value: "citizen",
        icon: "🧑"
    },
    {
        name: "Esclave",
        value: "slave",
        icon: "🛡️"
    }
];




function displayPlayerHand() {
    if (!playerHand || !game) return;

    playerHand.innerHTML = cards.map(function(card) {
        const count = game.playerHand.filter(function(value) {
            return value === card.value;
        }).length;

        return `
            <div class="game-card rounded-xl border-2 border-yellow-500 bg-black p-4 text-center">

                <span class="mb-3 block text-5xl">
                    ${card.icon}
                </span>

                <h3 class="mb-3 text-xl font-bold text-yellow-400">
                    ${card.name}
                </h3>

                <p class="mb-3 text-white">
                    Disponible : ${count}
                </p>

                <button
                    type="button"
                    data-card="${card.value}"
                    ${count === 0 || game.finished ? "disabled" : ""}
                    class="rounded-lg bg-yellow-400 px-5 py-2 font-bold text-black disabled:opacity-40"
                >
                    Choisir
                </button>

            </div>
        `;
    }).join("");
}




function displayComputerHand() {
    if (!computerHand || !game) return;

    computerHand.innerHTML = game.computerHand.map(function() {
        return `
            <div class="game-card computer-card flex h-36 w-24 items-center justify-center rounded-xl border-2 border-blue-400 bg-slate-800">
                <span class="text-4xl">❓</span>
            </div>
        `;
    }).join("");
}




function displayGame() {
    if (!game) return;

    renderGame(game);

    displayPlayerHand();
    displayComputerHand();
}



function handleComputerTurn() {
    if (
        game &&
        !game.finished &&
        game.firstPlayer !== game.playerCamp &&
        game.pendingComputerChoice === null
    ) {
        const result = computerPlaysFirst(game);

        if (!result.success) {
            console.log(result.message);
        }
    }
}




function saveCompletedGame() {
    if (!game || !game.finished || historySaved) return;

    const finalResult = getGameWinner(game);

    let result = "draw";

    if (finalResult === "victoire") {
        result = "win";
    } else if (finalResult === "défaite") {
        result = "loss";
    }

    addGameToHistory({
        playerId: selectedPlayer.id,
        nickname: selectedPlayer.nickname,
        playerScore: game.playerScore,
        computerScore: game.computerScore,
        result: result,
        rounds: game.rounds
    });

    historySaved = true;

    alert("Partie terminée ! Votre résultat a été enregistré.");
}




if (startButton) {
    startButton.addEventListener("click", function() {
        selectedPlayer = getSelectedPlayer();

        if (!selectedPlayer) {
            alert("Veuillez sélectionner un joueur avant de commencer.");
            return;
        }

        game = startGame(selectedPlayer);

        historySaved = false;

        handleComputerTurn();

        displayGame();

        if (message) {
            message.textContent =
                "La partie commence ! Choisissez une carte.";
        }
    });
}




if (playerHand) {
    playerHand.addEventListener("click", function(event) {
        const button = event.target.closest("[data-card]");

        if (!button || !game || game.finished) {
            return;
        }

        const playerChoice = button.dataset.card;

        const result = playRound(game, playerChoice);

        if (!result.success) {
            alert(result.message);
            return;
        }

        game = result.game;

        // Computer chooses if it has the next turn
        handleComputerTurn();

        displayGame();

        // Show the two cards and the duel result
        if (message && result.duel) {
            const playerCard = cards.find(function(card) {
                return card.value === result.duel.playerChoice;
            });

            const computerCard = cards.find(function(card) {
                return card.value === result.duel.computerChoice;
            });

            const playerName = playerCard
                ? playerCard.name
                : result.duel.playerChoice;

            const computerName = computerCard
                ? computerCard.name
                : result.duel.computerChoice;

            message.textContent =
                `Vous : ${playerName} | Ordinateur : ${computerName} | ${result.message}`;
        }

        if (game.finished) {
            saveCompletedGame();
        }
    });
}


// ==========================================
// 10. PLAYER PROFILES
// ==========================================

const playerForm =
    document.getElementById("players-form") ||
    document.getElementById("player-form");

const playerMessage = document.getElementById("player-message");


function displayPlayers() {
    renderPlayers(getPlayers(), getSelectedPlayer());
}


if (playerForm) {
    playerForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const nicknameInput = playerForm.elements.namedItem("nickname");
        const avatarInput = playerForm.elements.namedItem("avatar");

        const nickname = nicknameInput.value.trim();
        const avatar = avatarInput.value.trim();

        const editId = playerForm.dataset.editId;

        let result;

        if (editId) {
            result = updatePlayer(editId, {
                nickname: nickname,
                avatar: avatar
            });

            delete playerForm.dataset.editId;
        } else {
            result = addPlayer({
                nickname: nickname,
                avatar: avatar
            });
        }

        if (playerMessage) {
            playerMessage.textContent = result.message;
            playerMessage.className = result.success
                ? "mt-3 text-green-400"
                : "mt-3 text-red-400";
        }

        if (result.success) {
            playerForm.reset();
            displayPlayers();
            displayRanking();
        }
    });
}




const playersList = document.getElementById("players-list");

if (playersList) {
    playersList.addEventListener("click", function(event) {
        const button = event.target.closest("[data-action]");

        if (!button) return;

        const action = button.dataset.action;
        const playerId = button.dataset.id;

        const player = getPlayers().find(function(item) {
            return item.id === playerId;
        });

        if (!player) return;


        // SELECT PLAYER
        if (action === "select") {
            saveSelectedPlayer(player);

            displayPlayers();

            if (playerMessage) {
                playerMessage.textContent =
                    `${player.nickname} est sélectionné.`;
                playerMessage.className = "mt-3 text-green-400";
            }
        }


        // EDIT PLAYER
        if (action === "edit") {
            if (!playerForm) {
                alert("Le formulaire de modification est introuvable.");
                return;
            }

            playerForm.elements.namedItem("nickname").value =
                player.nickname;

            playerForm.elements.namedItem("avatar").value =
                player.avatar;

            playerForm.dataset.editId = player.id;

            playerForm.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        }


        // DELETE PLAYER
        if (action === "delete") {
            const confirmed = confirm(
                `Voulez-vous supprimer ${player.nickname} ?`
            );

            if (!confirmed) return;

            const deleted = deletePlayer(playerId);

            if (deleted) {
                displayPlayers();
                displayRanking();

                if (playerMessage) {
                    playerMessage.textContent =
                        "Joueur supprimé avec succès.";
                    playerMessage.className = "mt-3 text-green-400";
                }
            }
        }
    });
}




const historySearch = document.getElementById("history-search");
const resultFilter = document.getElementById("result-filter");
const dateFilter = document.getElementById("date-filter");


function displayHistory() {
    const history = filterHistory({
        search: historySearch ? historySearch.value : "",
        result: resultFilter ? resultFilter.value : "all",
        date: dateFilter ? dateFilter.value : "all"
    });

    renderHistory(history);
}


if (historySearch) {
    historySearch.addEventListener("input", displayHistory);
}

if (resultFilter) {
    resultFilter.addEventListener("change", displayHistory);
}

if (dateFilter) {
    dateFilter.addEventListener("change", displayHistory);
}




function displayRanking() {
    renderRanking(getRanking());
}




displayPlayers();
displayHistory();
displayRanking();