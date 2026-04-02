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
            alert("You've guessed all characters! Go back to home to switch game modes!!!");
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
            alert("You've guessed all environments! Go back to home to switch game modes!!!");
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
        alert("You've guessed all songs! Go back to home to switch game modes!!!");
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

    // adding in the modal instead of alert
    const modal = document.getElementById('gameModal');
    const modalMsg = document.getElementById('modalMessage');
    const closeBtn = document.getElementById('closeModal');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const userGuess = input.value.trim().toLowerCase();
        let message = "";

        if (userGuess === currentAnswer.toLowerCase() || 
            acceptableAnswers.some(answer => answer.toLowerCase() === userGuess)) {
            message = "You guessed it right!!!";
        } else {
            message = "Wrong, The answer was " + currentAnswer;
        }

        modalMsg.textContent = message;
        modal.style.display = "block";
    });

    // click nect to exit modal
    closeBtn.onclick = function() {
        modal.style.display = "none";
        input.value = "";
        loadNextQuestion(mode);
    };

    // click outside model popup to exit modal
window.onclick = function(event) {
    if (modal.style.display === "block") {
        if (!modal.contains(event.target)) {
            modal.style.display = "none";
            input.value = "";
            loadNextQuestion(mode);
        }
    }
};

    // enter to exit modal 
    window.addEventListener('keydown', function(event) {

        // can't hold down enter (trust me this was needed)
        if (event.repeat) return;
        if (event.key === "Enter" && modal.style.display === "block") {

            event.preventDefault(); 

            modal.style.display = "none";
            input.value = "";
            loadNextQuestion(mode);
        }
    });


}

function loadNextQuestion(mode) {
    //Hide the hint again for the new question
    document.querySelector('.hint').classList.remove('show-hint');
    
    //Make the View Hint button visible again
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
