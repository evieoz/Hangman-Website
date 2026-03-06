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