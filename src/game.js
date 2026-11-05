//Adds, edits, deletes and selects player profile

export function getComputerChoise(){
    const choice = ["empereur","citizen","slave"];
    const randomIndex = Math.floor(maath.random()*choice.length);
    return choices[randomIndex];
}

export function getWinner(playerChoice,computerChoice){
    (playerChoice==="empereur" && computerCoice === "citizen") ||
    (playerChoice==="citizen" && computerCoice === "slave") ||
    (playerChoice==="slave" && computerCoice === "empereur")
 {
    return "win";
}

    return "lose";

}

 export function starGame (){
    return {
        playerId : player.id,
        nickname: player.nickname,
        rounds:[],
        playerScore: 0 , 
        draws: 0 , 
        finished : false
      };
 }
  
  export function playRound(game , playerChoice ) {
    if ( game.finished || game.rounds.length>= 12 ) {
        return {
            success: false,
            message: "La partie est terminée ."
        };
        }

        const computerChoice = getComputerChoice(); 
        const result = gatWinner(playerChoice,computerChoice);

         if (result === "win") {
            game.playerScore++;

         }

         else if(result === "lose") {
            game.computerScore++;
         }
         else {
            game.draws++ ; 
         }

         game.rounds.push({
            round : game.rounds.length+1 
            playerChoic: playerChoice , 
            computerChoice : computerChoice,
            result : result 
         });
        return {
            success : true , 
            computerChoice : computerChoice,
            result : result , 
            round : game.rounds.length
        };
        }  

          if ( game.round.length === 12 ) {
            game.finished = true ;  
             let finalResult = "draw";

             if ( game.playerScore > game.computerScore){
                finalResult = "win";
                
             }

             esle if (game.playerScore < game.computerScore) {
                finalResult = "lose";
             }

             addGameToHistory({
                playerId: game.playerId,
           nickname: game.nickname,
        playerScore: game.playerScore,
        computerScore: game.computerScore,
        draws: game.draws,
        result: finalResult,
        rounds: game.rounds
    });
}






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

  export function createHands(playerCamp) {

    let playerHand = [];
    let computerHand = [];

    if (playerCamp === "empereur") {
        playerHand = ["empereur", "empereur", "empereur", "citizen", "citizen"];
        computerHand = ["citizen", "citizen", "citizen", "slave", "slave"];
    }

    else if (playerCamp === "citizen") {
        playerHand = ["citizen", "citizen", "citizen", "slave", "slave"];
        computerHand = ["slave", "slave", "slave", "empereur", "empereur"];
    }

    else if (playerCamp === "slave") {
        playerHand = ["slave", "slave", "slave", "empereur", "empereur"];
        computerHand = ["empereur", "empereur", "empereur", "citizen", "citizen"];
    }

    return {
        playerHand: [...playerHand],
        computerHand: [...computerHand]
    };
}
  
  
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

            const index = newGand.indexOf(card)

            if ( index !==  -1 )  {
                newHand.splice(index , 1 )

            }
               return newHand ; 
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


           