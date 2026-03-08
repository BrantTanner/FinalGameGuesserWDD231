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
    const randCharacterIndex = Math.floor(Math.random() * characters.length + 1);
    const characterImage = characters[randCharacterIndex].characterImage;
    const characterHint = characters[randCharacterIndex].characterHint;

    
    const img = document.querySelector(".characterAndHint  img");
    const hint = document.querySelector(".characterAndHint p")

    img.src = characterImage;
    hint.textContent = characterHint

}


fetchJSONData();