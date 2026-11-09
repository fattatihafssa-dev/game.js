// src/game.js

// Create the five cards for each camp
export function createHands(camp) {
    if (camp === "empereur") {
        return [
            "empereur",
            "citizen",
            "citizen",
            "citizen",
            "citizen"
        ];
    }

    return [
        "slave",
        "citizen",
        "citizen",
        "citizen",
        "citizen"
    ];
}


// Get a random card from the computer's hand
export function getComputerChoice(computerHand) {
    if (computerHand.length === 0) {
        return null;
    }

    const randomIndex = Math.floor(
        Math.random() * computerHand.length
    );

    return computerHand[randomIndex];
}


// Compare the two cards
export function duel(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return "égalité";
    }

    if (
        (playerChoice === "empereur" && computerChoice === "citizen") ||
        (playerChoice === "citizen" && computerChoice === "slave") ||
        (playerChoice === "slave" && computerChoice === "empereur")
    ) {
        return "victoire";
    }

    return "défaite";
}


// Remove one card from a hand
export function removeCard(hand, card) {
    const updatedHand = [...hand];
    const index = updatedHand.indexOf(card);

    if (index !== -1) {
        updatedHand.splice(index, 1);
    }

    return updatedHand;
}


// Points depend on the winning camp
export function getPoints(camp) {
    return camp === "empereur" ? 1 : 5;
}


// Get the opposite camp
export function getComputerCamp(playerCamp) {
    return playerCamp === "empereur" ? "slave" : "empereur";
}


// Start a new game
export function startGame(player) {
    if (!player || !player.id) {
        throw new Error("Un joueur doit être sélectionné.");
    }

    return {
        player,

        playerCamp: "empereur",

        firstPlayer: "empereur",

        currentRound: 1,

        playerHand: createHands("empereur"),

        computerHand: createHands("slave"),

        playerScore: 0,

        computerScore: 0,

        pendingComputerChoice: null,

        currentRoundDuels: [],

        rounds: [],

        finished: false
    };
}


// Alternate the first player after every duel
function changeFirstPlayer(game) {
    game.firstPlayer =
        game.firstPlayer === "empereur" ? "slave" : "empereur";
}


// Prepare the next round
function prepareNextRound(game, completedRound) {
    if ([3, 6, 9].includes(completedRound)) {
        game.playerCamp = getComputerCamp(game.playerCamp);
    }

    game.currentRound++;

    game.playerHand = createHands(game.playerCamp);

    game.computerHand = createHands(
        getComputerCamp(game.playerCamp)
    );

    game.pendingComputerChoice = null;

    game.currentRoundDuels = [];
}


// Computer chooses first when its camp has the first turn
export function computerPlaysFirst(game) {
    if (!game || game.finished) {
        return {
            success: false,
            message: "La partie est terminée."
        };
    }

    if (game.firstPlayer === game.playerCamp) {
        return {
            success: false,
            message: "C'est au joueur de commencer."
        };
    }

    if (game.pendingComputerChoice !== null) {
        return {
            success: false,
            message: "L'ordinateur a déjà choisi sa carte."
        };
    }

    const choice = getComputerChoice(game.computerHand);

    if (!choice) {
        return {
            success: false,
            message: "L'ordinateur n'a plus de cartes."
        };
    }

    game.computerHand = removeCard(game.computerHand, choice);

    game.pendingComputerChoice = choice;

    return {
        success: true,
        message: "L'ordinateur a choisi sa carte."
    };
}


// Play one duel
export function playRound(game, playerChoice) {
    if (!game || game.finished) {
        return {
            success: false,
            message: "La partie est terminée."
        };
    }

    if (!game.playerHand.includes(playerChoice)) {
        return {
            success: false,
            message: "Cette carte n'est plus disponible."
        };
    }

    const computerStarts = game.firstPlayer !== game.playerCamp;

    if (computerStarts && game.pendingComputerChoice === null) {
        return {
            success: false,
            message: "L'ordinateur doit choisir en premier."
        };
    }

    let computerChoice = game.pendingComputerChoice;

    if (computerChoice === null) {
        computerChoice = getComputerChoice(game.computerHand);

        if (!computerChoice) {
            return {
                success: false,
                message: "L'ordinateur n'a plus de cartes."
            };
        }

        game.computerHand = removeCard(
            game.computerHand,
            computerChoice
        );
    }

    game.playerHand = removeCard(game.playerHand, playerChoice);

    game.pendingComputerChoice = null;

    const result = duel(playerChoice, computerChoice);

    const duelData = {
        playerChoice,
        computerChoice,
        result
    };

    game.currentRoundDuels.push(duelData);

    changeFirstPlayer(game);

    // Equality: both cards stay removed.
    if (result === "égalité") {
        if (game.currentRoundDuels.length === 5) {
            return finishRound(game, null, duelData);
        }

        return {
            success: true,
            game,
            result,
            message: "Égalité ! Les deux cartes sont retirées. Rejouez.",
            roundFinished: false,
            duel: duelData
        };
    }

    // Determine which camp won
    const playerWon = result === "victoire";

    const winnerCamp = playerWon
        ? game.playerCamp
        : getComputerCamp(game.playerCamp);

    const points = getPoints(winnerCamp);

    if (playerWon) {
        game.playerScore += points;
    } else {
        game.computerScore += points;
    }

    return finishRound(game, winnerCamp, duelData, points);
}


// Finish a round and prepare the next one
function finishRound(game, winnerCamp, duelData, points = 0) {
    const completedRound = game.currentRound;

    const roundResult = {
        round: completedRound,
        winnerCamp: winnerCamp,
        points: points,
        duels: [...game.currentRoundDuels]
    };

    game.rounds.push(roundResult);

    game.currentRoundDuels = [];

    if (completedRound === 12) {
        game.finished = true;

        return {
            success: true,
            game,
            result: duelData.result,
            duel: duelData,
            roundFinished: true,
            message: "Les 12 manches sont terminées !",
            finalResult: getGameWinner(game)
        };
    }

    prepareNextRound(game, completedRound);

    return {
        success: true,
        game,
        result: duelData.result,
        duel: duelData,
        roundFinished: true,
        message: winnerCamp
            ? `Le camp ${winnerCamp} remporte la manche !`
            : "Manche terminée sur une égalité !"
    };
}


// Get the final winner
export function getGameWinner(game) {
    if (game.playerScore > game.computerScore) {
        return "victoire";
    }

    if (game.playerScore < game.computerScore) {
        return "défaite";
    }

    return "égalité";
}