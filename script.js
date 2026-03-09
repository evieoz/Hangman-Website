// Word List
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
let selectedWord = "";
let displayedWord = "";
let wrongGuesses = 0;
let guessedLetters = [];
let maxMistakes = 6;
let level = "easy"; // default difficulty
let gameActive = false;

// Start Game
function startGame(selectedLevel) {
  level = selectedLevel;
  wrongGuesses = 0;
  guessedLetters = [];
  gameActive = true;

  // Max mistakes based on difficulty
  if (level === "easy") maxMistakes = 8;
  else if (level === "medium") maxMistakes = 6;
  else if (level === "hard") maxMistakes = 4;

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
function getRandomWord() {
  return wordList[Math.floor(Math.random() * wordList.length)];
}

// Difficulty display
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
function updateUI() {
  document.getElementById("wordDisplay").textContent = displayedWord
    .split("")
    .join(" ");
  document.getElementById("guessedLetters").textContent =
    "Guessed Letters: " + guessedLetters.join(", ");
  document.getElementById("mistakes").textContent =
    `Mistakes: ${wrongGuesses} / ${maxMistakes}`;
}

// Update tree image based on wrong guesses (used google to look up how to change image source)
function updateTreeImage() {
  const tree = document.getElementById("tree");
  let imgNumber = Math.min(6, Math.max(0, wrongGuesses));
  imgNumber = Math.round((wrongGuesses / maxMistakes) * 6);
  tree.src = `img/tree${6 - imgNumber}.png`; 
}


// Guess letter (used google for the a-z logic)
function guessLetter() {
  if (!gameActive) return;

  const input = document.getElementById("letterInput");
  const letter = input.value.toLowerCase();
  input.value = "";

  if (letter.length !== 1 || !/[a-z]/.test(letter)) {
    alert("Please enter a valid letter (a-z).");
    return;
  }

  if (guessedLetters.includes(letter)) {
    alert("You already guessed that letter!");
    return;
  }
  // (Used push from our code academy lessons and used google to incorporate it into the game logic)
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

// Check win or lose
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

// Restart Game
function restartGame() {
    gameActive = false;
    startGame(level);
}

// Enter key to submit guess (used google to use e key for the enter key logic)
document.getElementById("letterInput").addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        guessLetter();
    }
});

