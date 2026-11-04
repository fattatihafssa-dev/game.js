const playerHand = document.getElementById("player-hand");

const cards = [
    {
        name: "Empereur",
        value:"empereur",
        image:"."
        
    },
  
     {
        name: "Citoyen",
        value:"citizen",
        image:"."
     },

      {
        name: "Esclave",
        value:"slave",
        image:"."
      }

    ];

    playerHand.innerHTML = cards.map(function(card) {
        return `
        <div class = "rounded-xl border-2 border-yellow-500 bg-blackb p-4 text-centre">

          <img
                src="${card.image}"
                alt="${card.name}"
                class="mx-auto mb-4 h-40 w-full object-contain"
            >

            <h3 class ="mb-3 text-xl font-bold text-yellow-400">
             ${card.name}
            </h3>

            <button 
            type = "button"
            class = "rounded-lg bg-yellow-400 px-5 py-2 font-bold text-black hover:bg-yellow-400">
              data-card="${card.value}"
            >
                Choisir
            </button>

        </div>
    `;
}).join("");

    }
)





]