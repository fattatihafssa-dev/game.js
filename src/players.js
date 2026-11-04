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


];

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
        createdAt : new Date().toISOString().split("T")[0]
      };
       const players = getPlayers();
       players.push(newPlayer)
      savePlayers(players);
      return {

        success : true ,
        message: "Joueur ajouté avec succès."
      };
    }

     export function editPlayer(id,newNickname,newAvatar){
        const players = getPlayers();
        const player = players.find(player=> player.id===id);
        if(!player){
        return {
            success: false,
            message : "Joueur introvable."

        };
        }
          if (!validateNickname(newNickname)){
            return {
                success = false, 
                message = "Pseudo introuvale."

            };
          }
          const  nickNameAlreadyUsed = players.some(player =>
            player.id !== id &&
            player.nickname.toLowerCase() ===newNickname.toLowerCase()
            
          );
        
        const allowedAvatars = ["empereur","citoyens","slave"];
        return {
            success : false,
            message : "Avatar introuvable."
        };
    }  
     player.nickname = newNickname;
     player.avatar = newAvatar;
       
     savePlayers(players);
     return {
         success: true,
        message: "Joueur modifié avec succès."
    };

    export function deletPlayer(id){
        const players = getPlayers();
        const updatePlayers = players.filter(player =>
            player.id !== id 
        );
        if (updatePlayers.length === players.length){
            return {
                success: false,
                message:"Joueur introvable."
            };

            }

            savePlayers(updatePlayers);

            return {
                success:true ,
                message:"Joueur supprimé avec succés."
            };
        }
            export function getPlayerById(id){
                const players = getPlayers();
                return players.find(player => player.id)|| null ; 

            }

            const function selectPlayer(id){
                const player = getPlayerById(id);

                if(!player){
                    return {
                        success:false ,
                        message:"Joueur supprimé avec succés."

                    };

                }
                 saveSelectPlayer(player);
                 return {
                    success:true ,
                    message:"Joueur supprimé avec succés."
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

