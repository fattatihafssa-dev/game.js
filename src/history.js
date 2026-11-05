import {getHistory , saveHistory } from"./storage.js";

export function addGameToHistory(game){
    const history = getHistory();
    const newGame = {
         id: `g_${Date.now()}`,
        date: new Date().toISOString(),
        ...game
     
    };
    history.push(newGame);
    saveHistory(history);
    retun newGame ;

    export function getPlayerHistory(playerId){
        const history = getHistory();
        return history.filter(game =>
                game.playerId === playerId
        );
    }
}