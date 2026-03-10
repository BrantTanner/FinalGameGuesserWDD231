
let characters = [];

async function fetchJSONData() {
    try {
        const response = await fetch('characters.JSON');
        const jsonData = await response.json();
        characters = jsonData.characterGuesser;

        startGame();
    } catch (error) {
        console.error('Error fetching JSON:', error);
    }
}

function startGame(){
    // pull a random character object from the json
    const randCharacterIndex = Math.floor(Math.random() * characters.length + 1);
    const characterImage = characters[randCharacterIndex].characterImage;
    const characterHint = characters[randCharacterIndex].characterHint;

    // Grab character image and hint from html
    const img = document.querySelector(".characterAndHint  img");
    const hint = document.querySelector(".characterAndHint p")

    img.src = characterImage;
    hint.textContent = characterHint

    
    // handle form input and guess
    const form = document.querySelector('form');
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const input = document.getElementById('playerGuess');
        const userGuess = input.value;
        console.log(userGuess);
    })
    
}


fetchJSONData();
