//Starts the application and listens for clicks and form submissions.////

import { 
    getPlayers,
    savePlayers,
    getSelectedPlayer,
    saveSelectedPlayer,
} from "./storage.js";

const players = [
    {
        id: "p_1730112000000",
        nickname:"AYA_08",
        avatar:"dragon",
        createdAt:"2026-08-28"
    },

     {
        id: "p_1730112067800",
        nickname:"SOFI_06",
        avatar:"empereur",
        createdAt:"2026-07-28"
    },

     {
        id: "p_1730112786000",
        nickname:"ANAS_076",
        avatar:"citizen",
        createdAt:"2026-10-29"
    },

     {
        id: "p_1730113456000",
        nickname:"AMINA_08",
        avatar:"slave",
        createdAt:"2026-05-28"
    },

     {
        id: "p_1730112987600",
        nickname:"ANIS_77",
        avatar:"dragon",
        createdAt:"2026-10-23"
    },


]
savePlayers(players);

export function validationNickname(nickname){
    const regex = /^[A-Za-z0-9]{3,15}$/;

    return regex.test(nickname);
}

export function nickNameExists(nichName){
    const players = gatPlayers();

    return players.some(player =>
        player.nickname.toLowerCase()=== nickname.toLowerCase()
    );
}

export function addPlayer(nickname,avatar){
    if (!validationNickname(nickname)){
        return {
            success: false,
            message: "Pseudo invalid 3 a 15 letters ou chiffres."
        };
    }

    if (nicknameExists(nickname)) {
        return {
            success: false,
            message: "Ce pseudo existe déjà."
        };
    }

    const allowedAvatars = ["empereur","citizen","slave"];
     if (!allowedAvatars.includes(avatar)){
        return {
            success: false,
            message:"Avatar invalid."

        };
    }
      const newPlayer = {
        id: `p_${Date.now()}`,
        nickname:nickname,
        avatar:avatar,
        creatAt : new Date().toIS

      }
    const players = getPlayers();
    players.push(newPlayer);
    savePlayers(players);
    return {
         success: true,
         message:"Joueur ajouté avac succés."
    };
}
    export function getSelectedPlayer(){
        return JSON.perse(localStorage.getItem("SelectedPlayer")) || null ; 
 
 
   }
    


    export function saveSelectedPlayer(palayer) {
        localStorage.setItem("selectedPlayer",JSON.stringify(player))


}export function getHistory(){
    return parse( localStoragetItem.("history"))|| null;
    
}

export function saveHistory(){
    return parse(localStorage.getItem)
}
