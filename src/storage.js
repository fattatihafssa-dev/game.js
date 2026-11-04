export function getPlayers() {
    return JSON.parse(localStorage.getItem("players")) || [];

}

export function savePlayers(players){
   localStorage.setItem("players", JSON.stringify(players));

}

export function getSelectedPlayer(){
    return JSON.parse(localStorage.getItem("selectedPlayer"))|| null;

}

export function saveSelectedPlayer(player) {
    localStorage.setItem("selectedPlayer", JSON.stringify(player));
}

export function getHistory(){
    return JSON.parse(localStorage.getItem("history"))|| [];
}
export function saveHistory(history){
    localStorage.setItem("history",JSON.stringify(history));
    
}