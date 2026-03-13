// Word List 
// list of possible words in the game 
const wordList = [
  "cherry",
  "tree",
  "blossom",
  "garden",
  "nature",
  "flower",
  "spring",
  "bloom",
  "petal",
  "sunshine",
];

// Variables 
// the word the game randomly chooses to be guessed
let selectedWord = "";
// shows what letters have been guessed and underscores for letters not yet guessed
let displayedWord = "";
// counts how many wrong guesses the player has made
let wrongGuesses = 0;
// keeps track of letters player has guessed so far
let guessedLetters = [];
// maximum wrong guesses allowed based on difficulty level
let maxMistakes = 6;
// current difficulty level, default is easy
let level = "easy"; 
// whether game is currently running true is if game is running and false if over or not begun
let gameActive = false;

// Start Game
// pick difficulty level
function startGame(selectedLevel) {
  level = selectedLevel;
  wrongGuesses = 0;
  guessedLetters = [];
  gameActive = true;

  // Max mistakes based on difficulty
  if (level === "easy") maxMistakes = 8;
  else if (level === "medium") maxMistakes = 6;
  else if (level === "hard") maxMistakes = 4;
// chooses random word from word list and sets displayed word with underscores
  selectedWord = getRandomWord();
  displayedWord = "_".repeat(selectedWord.length);

  updateDifficultyDisplay(level);
  updateUI();
  updateTreeImage();

  document.getElementById("gameArea").classList.remove("d-none");
  document.getElementById("difficultySelection").classList.add("d-none");
  document.getElementById("difficultyBox").classList.remove("d-none");
  document.getElementById("message").textContent = "";

  document.getElementById("letterInput").focus();
}

// Get Random Word
// picks a random word from the word list array so the game is different each time 
function getRandomWord() {
  return wordList[Math.floor(Math.random() * wordList.length)];
}

// Difficulty display]
// makes the difficulty box show the current difficulty level and changes color based on the level, easy is green, medium is yellow, and hard is red, this gives players a visual of the difficulty they have selected.
function updateDifficultyDisplay(level) {
  const difficultyBox = document.getElementById("difficultyBox");
  difficultyBox.classList.remove("easy", "medium", "hard");
  if (level === "easy") {
    difficultyBox.textContent = "Difficulty: Easy";
    difficultyBox.classList.add("easy");
  } else if (level === "medium") {
    difficultyBox.textContent = "Difficulty: Medium";
    difficultyBox.classList.add("medium");
  } else if (level === "hard") {
    difficultyBox.textContent = "Difficulty: Hard";
    difficultyBox.classList.add("hard");
  }
}

// Update UI (used google to look up how to split and join strings with spaces)
// any time a player guesses this will update what is displayed on the screen
function updateUI() {
  document.getElementById("wordDisplay").textContent = displayedWord
    .split("")
    .join(" ");
  document.getElementById("guessedLetters").textContent =
    "Guessed Letters: " + guessedLetters.join(", ");
  document.getElementById("mistakes").textContent =
    `Mistakes: ${wrongGuesses} / ${maxMistakes}`;
}

// Update tree image based on wrong guesses (used google to look up math functions to calculate and the image changes)
// wrong guesses affect the cherries on the tree, as wrong guesses increase the cherries disappear until the tree is bare at 6 wrong guesses, the image updates accordingly to show the state of the tree.
function updateTreeImage() {
  const tree = document.getElementById("tree");
  let imgNumber = Math.min(6, Math.max(0, wrongGuesses));
  imgNumber = Math.round((wrongGuesses / maxMistakes) * 6);
  tree.src = `tree${6 - imgNumber}.png`;
}


// Guess letter (used google for the a-z logic)
// Checks if game is active
function guessLetter() {
  if (!gameActive) return;
// gets letter player typed in and converts to lowercase and clears input field for next guess
  const input = document.getElementById("letterInput");
  const letter = input.value.toLowerCase();
  input.value = "";
// checking if input is valid for letter in alphabet and only one character, used regex for this validation
  message.textContent = "";
  if (letter.length !== 1 || !/[a-z]/.test(letter)) {
    message.textContent = "Please enter a valid letter (a-z).";
    return;
  }

// checking if the letter has been guessed before 
  if (guessedLetters.includes(letter)) {
    message.textContent = "You already guessed that letter!";
    return;
  }

  // (Used push from our code academy lessons and used google to incorporate it into the game logic)
  // adds letter to guessed letters array and checks if it is in the selected word, if it is it updates the displayed word, if not it increments wrong guesses
  guessedLetters.push(letter);

  if (selectedWord.includes(letter)) {
    let newDisplayedWord = "";
    for (let i = 0; i < selectedWord.length; i++) {
      if (selectedWord.charAt(i) === letter) {
        newDisplayedWord += letter;
      } else {
        newDisplayedWord += displayedWord.charAt(i);
      }
    }
    displayedWord = newDisplayedWord;
  } else {
    wrongGuesses++;
  }
  updateUI();
  updateTreeImage();
  checkWinLose();
}

// Check win or lose this ends the game and shows message based on the outcome, 
function checkWinLose() {
    const message = document.getElementById("message");
    if (!displayedWord.includes("_")) {
        message.textContent = "Congratulations! You Win!";
        gameActive = false;
    } else if (wrongGuesses >= maxMistakes) {
        message.textContent = `Game Over! The word was: ${selectedWord}`;
        gameActive = false;
    }
}

// Restart Game to difficulty screen so player can start new game
function restartGame() {
    gameActive = false;
    document.getElementById("gameArea").classList.add("d-none");
    document.getElementById("difficultySelection").classList.remove("d-none");
    document.getElementById("difficultyBox").classList.add("d-none");
    document.getElementById("message").textContent = "";
    displayedWord = "";
    guessedLetters = [];
    wrongGuesses = 0;
    document.getElementById("wordDisplay").textContent = "";
    document.getElementById("guessedLetters").textContent = "";
    document.getElementById("mistakes").textContent = "";
    const tree = document.getElementById("tree");
    tree.src = "tree6.png";

}

// Enter key to submit guess (used google to use e key for the enter key logic)
document.getElementById("letterInput").addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        guessLetter();
    }
});

