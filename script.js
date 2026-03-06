// Word List
const wordList = [
    'cherry',
    'tree',
    'blossom',
    'garden',
    'nature',
    'flower',
    'spring',
    'bloom',
    'petal',
    'sunshine'
];  

// Variables
let selectedWord = '';
let displayedWord = '';
let wrongGuesses = 0;
let guessedLetters = [];
const maxMistakes = 6;

// Start Game
function startGame() {
    wrongGuesses = 0;
    guessedLetters = [];

    if (level === 'easy') maxMistakes = 8;
    else if (level === 'medium') maxMistakes = 6;
    else if (level === 'hard') maxMistakes = 4;

    selectedWord = getRandomWord();

    displayedWord = '';
    for (let i = 0; i < selectedWord.length; i++) {
        displayedWord += '_';
    }

    updateDifficultyDisplay(level);
    updateUI();
    updateTreeImage();

    document.getElementById('gameArea').classList.remove('d-none');
    document.getElementById('difficultySelection').classList.add('d-none');
    document.getElementById('difficultyBox').classList.remove('d-none');

    document.getElementById('letterInput').focus();
}

function getRandomWord() {
    return wordList[Math.floor(Math.random() * wordList.length)];
}

// difficulty display
function updateDifficultyDisplay(level) {
    const difficultyBox = document.getElementById('difficultyBox');
    difficultyBox.classList.remove('easy', 'medium', 'hard');
    if (level === 'easy') {
        difficultyBox.textContent = 'Difficulty: Easy';
        difficultyBox.classList.add('easy');
    } else if (level === 'medium') {
        difficultyBox.textContent = 'Difficulty: Medium';
        difficultyBox.classList.add('medium');
    } else if (level === 'hard') {
        difficultyBox.textContent = 'Difficulty: Hard';
        difficultyBox.classList.add('hard');
    }
}

// Update UI
function updateUI() {
    document.getElementById('wordDisplay').textContent = displayedWord.split('').join(' ');
    document.getElementById('guessedLetters').textContent = 'Guessed Letters: ' + guessedLetters.join(', ');
    document.getElementById('mistakes').textContent = `Mistakes: ${wrongGuesses} / ${maxMistakes}`;
}

// guess letter
function guessLetter() {
    const input = document.getElementById('letterInput');
    const letter = input.value.toLowerCase();
    input.value = '';
    if (letter.length !== 1 || !/[a-z]/.test(letter)) {
        alert('Please enter a valid letter (a-z).');
        return;
    }
    if (guessedLetters.includes(letter)) {
        alert('You already guessed that letter!');
        return;
    }
    guessedLetters.push(letter);
    if (selectedWord.includes(letter)) {
        let newDisplayedWord = '';
        for (let i = 0; i < selectedWord.length; i++) {
            if (selectedWord[i] === letter) {
                newDisplayedWord += letter;
            }
            else {
                newDisplayedWord += displayedWord[i];
            }
        }
        displayedWord = newDisplayedWord;
    } else {
        wrongGuesses++;
    }
    updateUI();
    updateTreeImage();
}