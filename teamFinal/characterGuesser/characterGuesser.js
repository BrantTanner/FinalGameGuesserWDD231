let characters = [];
let currentAnswer = "";
let acceptableAnswers = [];

async function fetchJSONData() {
    try {
        const response = await fetch('../characters.JSON');
        const jsonData = await response.json();
        characters = jsonData.characterGuesser;
        gameScene = jsonData.gameGuesserEnv;
        gameMusic = jsonData.gameGuesserMusic;

        startGame();
    } catch (error) {
        console.error('Error fetching JSON:', error);
    }
}

function fetchCharacterGuessData(){
    // Random index for characters
    const randCharacterIndex = Math.floor(Math.random() * characters.length);

    // Game data
    const characterHint = characters[randCharacterIndex].characterHint;
    const characterImage = characters[randCharacterIndex].characterImage;
    currentAnswer = characters[randCharacterIndex].name;
    acceptableAnswers = [];

    // Place hint
    const hint = document.querySelector(".characterAndHint p");
    hint.textContent = "Hint: " + characterHint

    // Place image
    const img = document.querySelector(".characterAndHint img");
    img.src = characterImage;
}

function fetchEnvGuessData(){
    // Random index for environments
    const randEnvIndex = Math.floor(Math.random() * gameScene.length);
    
    // Game data
    currentAnswer = gameScene[randEnvIndex].game;
    acceptableAnswers = gameScene[randEnvIndex].acceptableAnswers || [];
    const envImage = gameScene[randEnvIndex].environmentImage;
    const envHint = gameScene[randEnvIndex].gameHint;

    // Place hint
    const hint = document.querySelector('.characterAndHint p');
    hint.textContent = "Hint: " + envHint

    // Place environment image
    const img = document.querySelector(".characterAndHint img");
    img.src = envImage;
}
function fetchMusicGuessData(){
    // Random index for Music
    const randMusicIndex = Math.floor(Math.random() * gameMusic.length);

    // Game data
    currentAnswer = gameMusic[randMusicIndex].game;
    acceptableAnswers = gameMusic[randMusicIndex].acceptableAnswers || [];
    const musicSrc = gameMusic[randMusicIndex].musicSnippet;
    const musicHint = gameMusic[randMusicIndex].hint;

    // Place hint
    const hint = document.querySelector('.characterAndHint p');
    hint.textContent = "Hint: " + musicHint

    // Media element (first load has img, subsequent calls may already have audio)
    const mediaEl = document.querySelector(".characterAndHint img, .characterAndHint audio");
    
    // New audio attributes
    const audio = document.createElement('audio');
    audio.src = musicSrc;
    audio.controls = true;
    audio.preload = "metadata";
    audio.textContent = "Your browser does not support audio."
    
    // Replace image with the audio player
    if (mediaEl) {
        mediaEl.replaceWith(audio)
    }

}

function startGame(){
    // Get mode from URL
    const params = new URLSearchParams(window.location.search);
    const mode = params.get('mode')

    // Fetch and display data depending on gamemode
    if (mode == "characterGuesser"){
        fetchCharacterGuessData();
    }
    else if (mode == "envGuesser"){
        fetchEnvGuessData();
    }
    else{
        fetchMusicGuessData();
    }
    
    // Handle form input and guess
    const form = document.querySelector('form');
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const input = document.getElementById('playerGuess');
        const userGuess = input.value;
        const normalizedGuess = userGuess.trim().toLowerCase();

        if(normalizedGuess == currentAnswer.toLowerCase() || acceptableAnswers.some(answer => answer.toLowerCase() == normalizedGuess)){
            alert("You guessed right!");
        }
        else{
            alert("Wrong! Try again, The answer was " + currentAnswer);
        }

        location.reload();
        
    })


    
}


fetchJSONData();
