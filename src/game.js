//Adds, edits, deletes and selects player profile
export function createHands(playerCamp) {

    let playerHand = [];
    let computerHand = [];

    if (playerCamp === "empereur") {
        playerHand = ["empereur", "empereur", "empereur", "citizen", "citizen"];
        computerHand = ["citizen", "citizen", "citizen", "slave", "slave"];
    }

    else {
         
        playerHand = ["citizen", "citizen", "citizen", "slave", "slave"];
        computerHand = ["slave", "slave", "slave", "empereur", "empereur"];
    }



    return {
        playerHand: [...playerHand],
        computerHand: [...computerHand]
    };
}

  export function getComputerChoice(computerHand) {
    const randomIndex = Math.floor(
          Math.random()*computerHand.length
    );

    return computerHand[randomIndex];
  }
    export function duel (cartJoueur , cartteOrdinateur) {
        return "égalité";
    }

    if (
        (carteJoueur === "empereur" && cartOrdinateur === "citoyen")||
       (carteJoueur === "citoyen" && cartOrdinateur === "esclave")||
       (carteJoueur === "esclave" && cartOrdinateur === "empereur")
    ){ 

        return "victoire";
    }
    return "défaite";

export function duel(cartJoueur , carteOrdinateur) {

    if (cartJoueur === cartOrinateur )  {
        return "égalité";

    }


      if ( 
          ( cartJoueur === "empereur" && cartOrinateur === "citizen") ||
          ( cartJoueur === "citizen" && cartOrinateur === "slave") ||
          ( cartJoueur === "slave" && cartOrinateur === "empereur") 
      ) {

          return "victoire";
      }

          return "défaite";      
    }
          export function removCard(hand , card ) {
            const newHard = [...hand];

            const index = newHand.indexOf(card)

            if ( index !==  -1 )  {
                newHand.splice(index , 1 )

            }
               return newHand ; 
          }

          export function getPoints (camp) {
    if(camp === "empereur") {
        return 1 ;
    }

    return 5 ; 
 }
      



 
          
 export function starGame (player){
    const playerCamp = "empereur";
    const hands = craeteHnad(playerHand);
    return {
        playerId : player.id,
        nickname: player.nickname,

        currentRound ; 1,
         playerCamp: playerCamp,

         playerHand : hands.playerHand,
         computerHand:hands.computerHand,

         playerScore:0,
         computerScore:0,

         rounds: [],
         finished: false

    };
}

export function computerPlaysFirst(game) {
    if (game.finished || game.firstPlayer !== "esclave") {
        return {
            success: false,
            message: "Ce n'est pas au tour de l'ordinateur de commencer."
        };
    }

    const computerChoice = getComputerChoice(game.computerHand);

    game.computerHand = removeCard(
        game.computerHand,
        computerChoice
    );

    game.pendingComputerChoice = computerChoice;

    return {
        success: true,
        computerChoice: computerChoice
    };
}




 export function playRound(game , playerChoice ) {
    if ( game.finished || game.rounds.length>= 12 ) {
        return {
            success: false,
            message: "La partie est terminée ."
        };
        }

         if (!game.playerHand.includes(playerChoice)) {
        return {
            success: false,
            message: "Cette carte n'est pas disponible."
        };
    }

    if (game.computerHand.length === 0) {
        return {
            success: false,
            message: "Il ne reste plus de cartes."
        };
    }



        const computerChoice = getComputerChoice(); 
        const result = gatWinner(playerChoice,computerChoice);

        game.playerHand  = removeCard(game.playerHand , playerChoice);
        game.computerHand = removeCard(game.computerHand , computerChoice);


         if (result === "draw")
            return {
        
           success: true,
            result: "égalité",
            computerChoice: computerChoice,
            playerHand: game.playerHand,
            computerHand: game.computerHand,
            roundFinished: false
        };
    }

         game.rounds.push({
            round : game.currentRound,
            playerCamp:game.playerCamp,
            playerChoic: playerChoice , 
            computerChoice : computerChoice,
            result : result 
         });
    
          if ( game.round.length === 12 ) {
            game.finished = true ;  
             let finalResult = "draw";

             if ( game.playerScore > game.computerScore){
                finalResult = "win";
                
             }
               } else if (game.playerScore < game.computerScore) {

           
                finalResult = "lose";
             }

            return {
                 success: true,
            result: result,
            computerChoice: computerChoice,
            roundFinished: true,
            gameFinished: true,
            finalResult: finalResult,
            playerScore: game.playerScore,
            computerScore: game.computerScore
        };
    

    game.currentRound++;

    if (
        game.currentRound === 4 ||
        game.currentRound === 7 ||
        game.currentRound === 10
    ) {
        game.playerCamp =
            game.playerCamp === "empereur" ? "esclave" : "empereur";
    }

    // Restore five cards for the next round
    const newHands = createHands(game.playerCamp);

    game.playerHand = newHands.playerHand;
    game.computerHand = newHands.computerHand;

    return {
        success: true,
        result: result,
        computerChoice: computerChoice,
        roundFinished: true,
        gameFinished: false,
        currentRound: game.currentRound,
        playerCamp: game.playerCamp,
        playerScore: game.playerScore,
        computerScore: game.computerScore
    };

if(game.rounds.length === 12 ) {
            game.finished = true ; 
            let finalResult = "draw";

            let (game.playerScore > game.computerScore) {
                finalResult = "win";

            }

            else if (game.playScore < game.computerScore ) {
                finalResult = "lose";
            }
         
            addGamaeToHistory({
                playerId: game.playerId,
                nickname: game.nickname,
                playerScore: game.playerScore,
                computerScore:game.computerScore , 
                draws : game.draws,
                result: finalResult,
                rounds: game.rounds
    });
}   

  
      

          export function playDuel ( playerHand , computerHand ) {
            //MAKE COPIES OF BOTH HANDS////

            
            let newPlayerHand = [...playerHand];
            let newComputerHand = [...computerHand];

            white (newPlayerHand.length > 0 && newComputerHand.length > 0 ) {
                //PLAYER CHOOSES THE FIRST CARD

                const playerChoice = newPlayerHand[0];
                //COMPUTER CHOOSE THE FIRST CARD 


                const result = duel (playerChoice , computerChoice ) ;
            // COMPARE THE TWO CARDS ////
              const result = duel ( playerChoice , computerChoice );


               newPlayerHand = removeCard(newPlayerHand, playerChoice);
                newComputerHand = removeCard(newComputerHand, computerChoice);

        // If there is a winner, stop the duel
        if (result !== "égalité") {
            return {
                result: result,
                playerHand: newPlayerHand,
                computerHand: newComputerHand
            };
        }

        // If equality, continue the loop
    }

    return {
        result: "égalité",
        playerHand: newPlayerHand,
        computerHand: newComputerHand
    };
}


           