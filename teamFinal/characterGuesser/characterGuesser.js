let characters = [];
let gameEnv = [];
let gameMusic = [];
let currentAnswer = "";
let acceptableAnswers = [];
    //creating pool for already used files
let characterPool = [];
let envPool = [];
let musicPool = [];


async function fetchJSONData() {
    try {
        const response = await fetch('../characters.JSON');
        const jsonData = await response.json();
        characters = jsonData.characterGuesser;
        gameEnv = jsonData.gameGuesserEnv;
        gameMusic = jsonData.gameGuesserMusic;

        //Creating pools for data
        characterPool = [...characters];
        envPool = [...gameEnv];
        musicPool = [...gameMusic];

        startGame();
    } catch (error) {
        console.error('Error fetching JSON:', error);
    }
}

function fetchCharacterGuessData(){
    if (characterPool.length === 0) {
            alert("You've guessed all characters! Refresh the page to play again.");
            return;
        }

        const randIndex = Math.floor(Math.random() * characterPool.length);
        const chosen = characterPool[randIndex];
        
        // Remove the chosen character from the pool
        characterPool.splice(randIndex, 1);

        currentAnswer = chosen.name;
        acceptableAnswers = chosen.acceptableAnswers || [];

        document.querySelector(".characterAndHint p").textContent = "Hint: " + chosen.characterHint;
        document.querySelector(".characterAndHint img").src = chosen.characterImage;
}

function fetchEnvGuessData(){
    if (envPool.length === 0) {
            alert("You've guessed all environments! Refresh the page to play again.");
            return;
        }

        const randIndex = Math.floor(Math.random() * envPool.length);
        const chosen = envPool[randIndex];
        
        envPool.splice(randIndex, 1);

        currentAnswer = chosen.game;
        acceptableAnswers = chosen.acceptableAnswers || [];

        document.querySelector('.characterAndHint p').textContent = "Hint: " + chosen.gameHint;
        document.querySelector(".characterAndHint img").src = chosen.environmentImage;
    }
    
function fetchMusicGuessData(){
if (musicPool.length === 0) {
        alert("You've guessed all songs! Refresh the page to play again.");
        return;
    }

    const randIndex = Math.floor(Math.random() * musicPool.length);
    const chosen = musicPool[randIndex];
    
    musicPool.splice(randIndex, 1);

    currentAnswer = chosen.game;
    acceptableAnswers = chosen.acceptableAnswers || [];

    document.querySelector('.characterAndHint p').textContent = "Hint: " + chosen.hint;

    const mediaContainer = document.querySelector(".characterAndHint");
    const oldMedia = mediaContainer.querySelector("img, audio");

    const audio = document.createElement('audio');
    audio.src = chosen.musicSnippet;
    audio.controls = true;
   
    
    if (oldMedia) {
        oldMedia.replaceWith(audio);
    }
}

function startGame(){
const params = new URLSearchParams(window.location.search);
    const mode = params.get('mode');

    // Initial Load
    loadNextQuestion(mode);

    const form = document.querySelector('form');
    const input = document.getElementById('playerGuess');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const userGuess = input.value.trim().toLowerCase();

        if (userGuess === currentAnswer.toLowerCase() || 
            acceptableAnswers.some(answer => answer.toLowerCase() === userGuess)) {
            alert("You guessed right!");
        } else {
            alert("Wrong! The answer was " + currentAnswer);
        }

        // Clear the input and load the next item WITHOUT reloading the page
        input.value = "";
        loadNextQuestion(mode);
    });


    
}

function loadNextQuestion(mode) {
    //Hide the hint again for the new question
    document.querySelector('.hint').classList.remove('show-hint');
    
    //Make the "View Hint" button visible again
    const hintBtn = document.getElementById('hintBtn');
    if (hintBtn) hintBtn.style.display = 'block';

    if (mode === "characterGuesser") {
        fetchCharacterGuessData();
    } else if (mode === "envGuesser") {
        fetchEnvGuessData();
    } else {
        fetchMusicGuessData();
    }
}

window.myFunction = function () {
    const x = document.getElementById("myLinks");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
};

//Showing hint on click
window.showHint = function () {
    // Selects the element with your existing class
    const hintElement = document.querySelector('.hint');
    const btn = document.getElementById('hintBtn');

    // Reveals the hint using the CSS class we created above
    hintElement.classList.add('show-hint');

    // Optional: Hide the button once the hint is revealed
    btn.style.display = 'none';
};

fetchJSONData();
